import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCampus from "../Modal/EditCampus";
import CreateCampus from "../Modal/CreateCampus";
import { loading } from "./disable";

export default class SelectCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
      campusSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectCampus",
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCampuses = this.getCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.campusNameError = React.createRef();
  }

  componentDidMount() {
    this.getCampuses();
    this.campusNameError.current.style.display = "none";
  }

  /**
   * * Funcion para obtener los campus
   * * Obtiene de la base los campus previamente registrados
   */
  async getCampuses() {
    this.loading();
    const res = await axios.get(`${API}/campus`);
    const campusesData = res.data;
    const campusList = campusesData.map((campus) => ({
      label: campus.campus_code + " - " + campus.name,
      value: campus.campus_code,
      name: campus.name,
    }));
    this.setState({
      campusList,
      campusSelected: this.props.value ? this.state.campusSelected : null,
    });
    this.loading(false);
  }

  /**
   * * Función para asignar el campus seleccionado
   */
  handleChange(value) {
    this.setState({
      campusSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditCampus
            campus_code={
              this.state.campusSelected ? this.state.campusSelected.value : ""
            }
            campus_name={
              this.state.campusSelected ? this.state.campusSelected.name : ""
            }
            getCampuses={this.getCampuses}
          />
        </div>
      );
    }
    return null;
  }

  createButton() {
    if (!this.props.noCreate) {
      return (
        <div className="btn-crear">
          <CreateCampus getCampuses={this.getCampuses} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className={`item ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.campusList}
              value={this.state.campusSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.campusNameError}
              id="selectCampusError"
            ></div>
          </div>
          {this.editButton()}
          {this.createButton()}
        </div>
      </div>
    );
  }
}
