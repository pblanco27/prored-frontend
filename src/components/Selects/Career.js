import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCareer from "../Modal/EditCareer";
import CreateCareer from "../Modal/CreateCareer";
import { loading } from "./disable";

export default class SelectCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerList: [],
      careerSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectCareer",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCareers = this.getCareers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.careerNameError = React.createRef();
  }

  componentDidMount() {
    this.getCareers();
    this.careerNameError.current.style.display = "none";
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getCareers() {
    this.loading();
    const res = await axios.get(`${API}/career`);
    const careerData = res.data;
    const careerList = careerData.map((career) => ({
      label: `${career.degree} - ${career.name}`,
      value: career.career_code,
      name: career.name,
      degree: career.degree,
    }));
    this.setState({
      careerList,
      careerSelected: this.props.value ? this.state.careerSelected : null,
    });
    this.loading(false);
  }

  /**
   * * Función para asignar la carrera seleccionada
   */
  handleChange(value) {
    this.setState({
      careerSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditCareer
            career_code={
              this.state.careerSelected ? this.state.careerSelected.value : ""
            }
            career_name={
              this.state.careerSelected ? this.state.careerSelected.name : ""
            }
            career_degree={
              this.state.careerSelected ? this.state.careerSelected.degree : ""
            }
            getCareers={this.getCareers}
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
          <CreateCareer getCareers={this.getCareers} />
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
              options={this.state.careerList}
              value={this.state.careerSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.careerNameError}
              id="selectCareerError"
            ></div>
          </div>
          {this.editButton()}
          {this.createButton()}
        </div>
      </div>
    );
  }
}
