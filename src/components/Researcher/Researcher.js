import React, { Component } from "react";
import Input from "../Input/Input";
import { handleSimpleInputChange } from "../../helpers/Handles";
import SelectInvestigationUnit from "../Selects/InvestigationUnit";
import { createResearcherObject, validateResearcher } from "./functions";
import { createResearcher } from "./createFunctions";
import {
  editResearcher,
  toggleDisable,
  handleToggleStatus,
} from "./editFunction";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../../services/env";
export default class Researcher extends Component {
  _mount = true;
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      name: "",
      lastname1: "",
      lastname2: "",
      born_dates: "",
      email: "",
      phone_number: "",
      id_inv_unit: "",
      disable: this.props.match.params.dni ? true : false,
      disableDNI: this.props.match.params.dni ? true : false,
      show: false,
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInvesUnit = this.handleInvesUnit.bind(this);
    this.createResearcherObject = createResearcherObject.bind(this);
    this.createResearcher = createResearcher.bind(this);
    this.toggleDisable = toggleDisable.bind(this);
    this.handleToggleStatus = handleToggleStatus.bind(this);
  }

  componentDidMount() {
    this.loadPerson();

    //? listen route changes.
    this.unlisten = this.props.history.listen(() => {
      this.loadPerson();
    });
  }

  componentWillUnmount() {
    this._mount = false;
    this.unlisten();
  }

  toggleEdit() {
    this.setState({ disable: !this.state.disable });
  }

  loadPerson() {
    const dni = this.props.match.params.dni;

    this.setState({
      disable: dni ? true : false,
      show: false,
    });
    if (dni) {
      axios.get(`${API}/researcher_all/${dni}`).then((res) => {
        if (this._mount) {
          const researcher = res.data;
          if (researcher) {
            const invesUnitSelect = {
              label: researcher.name_inv_unit,
              value: researcher.id_inv_unit,
              description: researcher.description,
            };
            this.setState({
              ...researcher,
              btnStatusColor: researcher.status ? "btn-danger" : "btn-success",
              show: true,
              invesUnitSelect: invesUnitSelect,
            });
          }
        }
      });
    } else {
      this.setState({ show: true });
    }
  }

  handleInvesUnit(value) {
    this.handleChange({
      target: {
        name: "id_inv_unit",
        value: value ? value.value : "",
      },
    });
  }

  async preCreate() {
    const researcher = this.createResearcherObject();
    if (validateResearcher(researcher)) {
      await this.createResearcher(researcher);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  preEdit() {
    const researcher = this.createResearcherObject();
    if (validateResearcher(researcher)) {
      editResearcher(researcher);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  handleSubmit(event) {
    if (this.props.match.params.dni) {
      this.preEdit();
    } else {
      this.preCreate();
    }
  }

  render() {
    return (
      this.state.show && (
        <>
          <div className="my-container">
            <header>
              <h4>Investigador</h4>
            </header>
            <center>Los campos marcados con * son requeridos</center>
            <br></br>
            <div className="two-columns">
              <div className="column">
                <b>Información personal</b>
                <Input
                  label="Nombre"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  idError="researcherNameError"
                  required={true}
                  disable={this.state.disable}
                />

                <Input
                  label="Primer Apellido"
                  type="text"
                  name="lastname1"
                  value={this.state.lastname1}
                  onChange={this.handleChange}
                  idError="researcherLastName1Error"
                  required={true}
                  disable={this.state.disable}
                />

                <Input
                  label="Segundo Apellido"
                  type="text"
                  name="lastname2"
                  value={this.state.lastname2}
                  onChange={this.handleChange}
                  idError="researcherLastName2Error"
                  required={true}
                  disable={this.state.disable}
                />

                <Input
                  label="Cédula de identificación"
                  type="text"
                  name="dni"
                  value={this.state.dni}
                  onChange={this.handleChange}
                  idError="researcherDniError"
                  required={true}
                  disable={this.state.disableDNI}
                />

                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  name="born_dates"
                  value={this.state.born_dates}
                  onChange={this.handleChange}
                  idError="researcherDateError"
                  required={true}
                  disable={this.state.disable}
                />
              </div>
              <div className="column">
                <b>Información de contacto</b>
                <Input
                  label="Correo electrónico"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  idError="researcherEmailError"
                  required={true}
                  disable={this.state.disable}
                />

                <Input
                  label="Número de teléfono"
                  type="text"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={this.handleChange}
                  idError="researcherPhoneError"
                  disable={this.state.disable}
                  required={true}
                />
                <div className="select-section form-group">
                  <b>Información académica</b>
                  <SelectInvestigationUnit
                    label="Unidad de investigación"
                    required={true}
                    noEdit={true}
                    handleChangeParent={this.handleInvesUnit}
                    disable={this.state.disable}
                    value={this.state.invesUnitSelect}
                  />
                </div>
                {this.props.match.params.dni && (
                  <div className="status-btn">
                    <button
                      className={`btn ${this.state.btnStatusColor}`}
                      disabled={this.state.disable}
                      onClick={this.handleToggleStatus}
                    >
                      {this.state.status
                        ? "Inactivar investigador"
                        : "Activar investigador"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="vinculacion__submit">
            {!this.state.disable && (
              <button
                type="submit"
                className="btn btn-lg btn-success"
                onClick={this.handleSubmit}
              >
                {this.props.match.params.dni ? "Guardar Cambios" : "Crear"}
              </button>
            )}
          </div>
        </>
      )
    );
  }
}
