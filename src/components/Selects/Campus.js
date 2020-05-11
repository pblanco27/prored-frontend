import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCampus from "../Modal/EditCampus";
import CreateCampus from "../Modal/CreateCampus";

export default class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campusList: [],
      campusSelected: null,
      hasEdit: true,
      config: {
        name: "selectCampus",
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCampuses = this.getCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.campusNameError = React.createRef();
  }

  componentDidMount() {
    this.getCampuses();
    this.campusNameError.current.style.display = "none";
  }

  disable(isDisabled = true) {
    this.setState({
      config: {
        ...this.state.config,
        isLoading: isDisabled,
        isDisabled: isDisabled,
      },
    });
  }

  /**
   * * Funcion para obtener los campus
   * * Obtiene de la base los campus previamente registrados
   */
  async getCampuses() {
    const res = await axios.get(`${API}/campus`);
    const campusesData = res.data;
    const campusList = campusesData.map((campus) => ({
      label: campus.campus_code + " - " + campus.name,
      value: campus.campus_code,
      name: campus.name
    }));
    this.setState({ campusList, campusSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar el campus seleccionado
   */
  handleChange(value) {
    this.setState({
      campusSelected: value,
    });
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>Campus universitarios</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.campusList}
              value={this.state.campusSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.campusNameError}
            ></div>
          </div>
          <div className="btn-editar">
            <EditCampus
              campus_code={
                this.state.campusSelected
                  ? this.state.campusSelected.value
                  : ""
              }
              campus_name={
                this.state.campusSelected
                  ? this.state.campusSelected.name
                  : ""
              }
              getCampuses={this.getCampuses}
            />
          </div>
          <div className="btn-crear">
            <CreateCampus getCampuses={this.getCampuses} />
          </div>
        </div>
      </div>
    );
  }
}
