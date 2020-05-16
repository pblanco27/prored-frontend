import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditAsso from "../Modal/EditAsso";
import CreateAsso from "../Modal/CreateAsso";

export default class AssoCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assoCareerList: [],
      assoCareerSelected: null,
      id_center: 0,
      config: {
        name: "selectAssoCareer",
        isLoading: false,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getAssoCareers = this.getAssoCareers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.AssoCareerNameError = React.createRef();
  }

  componentDidMount() {
    this.AssoCareerNameError.current.style.display = "none";
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

  saveIdCenter(id_center) {
    this.setState({ id_center: id_center });
  }

  /**
   * * Función para obtener las carreras asociadas
   * * Obtiene de la base las carreras asociadas a centros previamente registradas
   */
  async getAssoCareers() {
    this.disable();
    if (this.state.id_center === 0) {
      this.setState({ assoCareerList: [], assoCareerSelected: null });
      return;
    }
    const res = await axios.get(
      `${API}/associated_career_from_center/${this.state.id_center}`
    );
    const assoData = res.data;
    const assoCareerList = assoData.map((assocareer) => ({
      label: assocareer.name,
      name: assocareer.name,
      value: assocareer.id_associated_career,
    }));
    this.setState({ assoCareerList, assoCareerSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar la carrera asociada
   */
  handleChange(value) {
    this.setState({ assoCareerSelected: value });
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditAsso
            id_asso={
              this.state.assoCareerSelected
                ? this.state.assoCareerSelected.value
                : 0
            }
            asso_name={
              this.state.assoCareerSelected
                ? this.state.assoCareerSelected.name
                : ""
            }
            id_center={this.state.id_center}
            getAssoCareers={this.getAssoCareers}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>
          Carreras asociadas al centro
        </label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.assoCareerList}
              value={this.state.assoCareerSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.AssoCareerNameError}
            ></div>
          </div>
          {this.editButton()}
          <div className="btn-crear">
            <CreateAsso
              id_center={this.state.id_center}
              getAssoCareers={this.getAssoCareers}
            />
          </div>
        </div>
      </div>
    );
  }
}
