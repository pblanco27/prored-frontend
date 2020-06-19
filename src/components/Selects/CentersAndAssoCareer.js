import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import AditionalInfo from "../Modal/AditionalInfo";
import { loading } from "./disable";

export default class SelectCentersAndAssoCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerAssoCareerList: [],
      centerAssoCareerListSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectCenterAndAssoCareers",
        isMulti: true,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCenterAndAssociatedCareers = this.getCenterAndAssociatedCareers.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.centerAssociatedCareerError = React.createRef();
  }

  componentDidMount() {
    this.getCenterAndAssociatedCareers();
    this.centerAssociatedCareerError.current.style.display = "none";
  }

  /**
   * * Función para obtener las carreras asociadas y el nombre del centro respectivo
   * * Obtiene de la base las carreras asociadas previamente registradas
   */
  async getCenterAndAssociatedCareers() {
    this.loading();
    const res = await axios.get(`${API}/associated_career_center`);
    const associatedData = res.data;
    const centerAssoCareerList = associatedData.map((assocareer) => ({
      label: assocareer.center_name + " - " + assocareer.associated_career_name,
      value: assocareer.id_associated_career,
    }));
    this.setState({ centerAssoCareerList });
    this.loading(false);
  }

  /**
   * * Función para asignar la carrera asociada seleccionada
   */
  handleChange(value) {
    this.setState({
      centerAssoCareerListSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className="my-2">
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
        </div>
        <div className="d-flex px-3 align-items-center">
          <div className="w-100 mr-2">
            <Select
              options={this.state.centerAssoCareerList}
              value={this.state.centerAssoCareerListSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.centerAssociatedCareerError}
            ></div>
          </div>
          <AditionalInfo handleChange={this.getCenterAndAssociatedCareers} />
        </div>
      </div>
    );
  }
}
