import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditCareer from "../Modal/EditCareer";
import CreateCareer from "../Modal/CreateCareer";
import { loading } from "./disable";

export default class SelectCareer extends Component {
  _isMounted = false;

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
    this._isMounted = true;

    if (this._isMounted) {
      this.getCareers();
      this.careerNameError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getCareers() {
    this.loading();
    const res = await get_request(`career`);
    if (res.status && this._isMounted) {
      const careerData = res.data;
      const careerList = careerData.map((career) => ({
        label: `${!career.status ? "(Inactivado)" : ""} ${career.degree} - ${
          career.name
        }`,
        value: career.career_code,
        name: career.name,
        degree: career.degree,
        status: career.status,
      }));
      this.setState({
        careerList,
        careerSelected: this.props.value ? this.state.careerSelected : null,
      });
      this.loading(false);
    }
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
        <div className="mr-2">
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
            status={
              this.state.careerSelected ? this.state.careerSelected.status : ""
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
      return <CreateCareer getCareers={this.getCareers} />;
    }
  }

  render() {
    return (
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
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
          <div className="d-flex justify-content-center">
            {/* <button className="btn btn-danger mr-2">Inactivar</button> */}
            {this.editButton()}
            {this.createButton()}
          </div>
        </div>
      </div>
    );
  }
}
