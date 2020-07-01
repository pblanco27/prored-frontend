import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditAsso from "../Modal/EditAsso";
import CreateAsso from "../Modal/CreateAsso";
import { loading } from "./disable";

export default class SelectAssoCareer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      assoCareerList: [],
      assoCareerSelected: null,
      id_center: 0,
      config: {
        name: "selectAssoCareer",
        isLoading: false,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getAssoCareers = this.getAssoCareers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.AssoCareerNameError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted){
      this.AssoCareerNameError.current.style.display = "none";
    }    
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  saveIdCenter(id_center) {
    this.setState({ id_center: id_center });
  }

  /**
   * * Función para obtener las carreras asociadas
   * * Obtiene de la base las carreras asociadas a centros previamente registrados
   */
  async getAssoCareers() {
    this.loading();
    if (this.state.id_center === 0) {
      this.setState({ assoCareerList: [], assoCareerSelected: null });
      return;
    }
    const res = await get_request(
      `associated_career_from_center/${this.state.id_center}`
    );
    if (res.status && this._isMounted) {
      const assoData = res.data;
      const assoCareerList = assoData.map((assocareer) => ({
        label: assocareer.name,
        name: assocareer.name,
        value: assocareer.id_associated_career,
      }));
      this.setState({ assoCareerList, assoCareerSelected: null });
      this.loading(false);
    }
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
        <div className="mr-2">
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
      <div className="my-2">
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
            <Select
              options={this.state.assoCareerList}
              value={this.state.assoCareerSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.AssoCareerNameError}
            ></div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger mr-2">Inactivar</button>
            {this.editButton()}

            <CreateAsso
              id_center={this.state.id_center}
              getAssoCareers={this.getAssoCareers}
              updateParent={this.props.updateParent}
            />
          </div>
        </div>
      </div>
    );
  }
}
