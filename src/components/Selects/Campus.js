import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditCampus from "../Modal/EditCampus";
import CreateCampus from "../Modal/CreateCampus";
import { loading } from "./disable";

export default class SelectCampus extends Component {
  _isMounted = false;

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
    this._isMounted = true;

    if (this._isMounted) {
      this.getCampuses();
      this.campusNameError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Funcion para obtener los campus
   * * Obtiene de la base los campus previamente registrados
   */
  async getCampuses() {
    this.loading();
    const res = await get_request(`campus`);
    if (res.status && this._isMounted) {
      const campusesData = res.data;
      const campusList = campusesData.map((campus) => ({
        label: `${!campus.status ? "(Inactivado) " : ""}${
          campus.campus_code
        } - ${campus.name}`,
        value: campus.campus_code,
        name: campus.name,
        status: campus.status,
      }));
      this.setState({
        campusList,
        campusSelected: this.props.value ? this.state.campusSelected : null,
      });
      this.loading(false);
    }
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
        <div className="mr-2">
          <EditCampus
            campus_code={
              this.state.campusSelected ? this.state.campusSelected.value : ""
            }
            campus_name={
              this.state.campusSelected ? this.state.campusSelected.name : ""
            }
            status={
              this.state.campusSelected ? this.state.campusSelected.status : ""
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
      return <CreateCampus getCampuses={this.getCampuses} />;
    }
  }

  render() {
    return (
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
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
          <div className="d-flex justify-content-center">
            {this.editButton()}
            {this.createButton()}
          </div>
        </div>
      </div>
    );
  }
}
