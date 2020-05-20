import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCareer from "../Modal/EditCareer";
import CreateCareer from "../Modal/CreateCareer";

export default class SelectCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerList: [],
      careerSelected: null,
      config: {
        name: "selectCareer",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCareers = this.getCareers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.careerNameError = React.createRef();
  }

  componentDidMount() {
    this.getCareers();
    this.careerNameError.current.style.display = "none";
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
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getCareers() {
    const res = await axios.get(`${API}/career`);
    const careerData = res.data;
    const careerList = careerData.map((career) => ({
      label: career.career_code + " - " + career.degree + " - " + career.name,
      value: career.career_code,
      name: career.name,
      degree: career.degree,
    }));
    this.setState({ careerList, careerSelected: null });
    this.disable(false);
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

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.careerList}
              value={this.state.careerSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.careerNameError}
              id="selectCareerError"
            ></div>
          </div>
          {this.editButton()}
          <div className="btn-crear">
            <CreateCareer getCareers={this.getCareers} />
          </div>
        </div>
      </div>
    );
  }
}
