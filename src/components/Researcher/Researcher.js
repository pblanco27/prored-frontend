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
import swal from "sweetalert";
import { get_request } from "../../helpers/Request";

/**
 * * Componente que contiene la información y muestra los componentes
 * * necesarios para la creación y visualización de un investigador
 */
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
      edit: this.props.match.params.dni ? true : false,
      disableDNI: this.props.match.params.dni ? true : false,
      show: false,
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInvesUnit = this.handleInvesUnit.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
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

  async loadPerson() {
    const dni = this.props.match.params.dni;

    this.setState({
      disable: dni ? true : false,
      show: false,
    });

    if (dni) {
      const res = await get_request(`researcher_all/${dni}`);
      if (res.status && this._mount){        
        const researcher = res.data;
        if (researcher) {
          const invesUnitSelect = {
            label: (
              <span title={researcher.description}>
                {researcher.name_inv_unit}
              </span>
            ),
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

  handleDisable() {
    if (this.state.disable) {
      this.setState({ disable: false });
    } else {
      swal({
        title: "¡Atención!",
        text: "Una vez ejecutado se eliminarán los cambios hechos",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((willConfirm) => {
        if (willConfirm) {
          window.location.reload();
        } else {
          swal("Los cambios siguen intactos, continue la edición", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    }
  }

  renderBtns() {
    if (this.state.edit) {
      if (this.state.disable) {
        return (
          <button
            type="submit"
            className="btn btn-lg btn-info"
            onClick={this.handleDisable}
          >
            Editar
          </button>
        );
      } else {
        return (
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-lg btn-danger"
              onClick={this.handleDisable}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              Guardar Cambios
            </button>
          </div>
        );
      }
    } else {
      return (
        <button
          type="submit"
          className="btn btn-lg btn-success"
          onClick={this.handleSubmit}
        >
          Crear
        </button>
      );
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      this.state.show && (
        <>
          {this.state.edit && (
            <div className="container mt-3">
              <button
                onClick={() => {
                  this.goBack();
                }}
                className="btn btn-secondary"
              >
                <i className="fas fa-chevron-left"></i> Volver
              </button>
            </div>
          )}
          <div className="container my-4">
            <div className="card">
              <header className="card-header text-center container-title">
                <h4>Investigador</h4>
              </header>
              <center>Los campos marcados con * son requeridos</center>

              <div className="d-lg-flex card-body px-4 d-md-block">
                <div className="w-100">
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
                <div className="w-100">
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
                  <div className="form-group">
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
                    <div className="text-center">
                      <hr />
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
          </div>

          <div className="d-flex justify-content-center mt-1 mb-3">
            {this.renderBtns()}
          </div>
        </>
      )
    );
  }
}
