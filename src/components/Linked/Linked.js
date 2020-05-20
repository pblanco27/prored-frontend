import React, { Component } from "react";
import LinkedSection from "./LinkedSection/ProfileSection";
import { handleSimpleInputChange } from "../../helpers/Handles";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import AcademicInformation from "./AcademicInformation/AcademicInformation";
import Validator from "../../helpers/Validations";
import { API } from "../../services/env";
import axios from "axios";
import swal from "sweetalert";

export default class Linked extends Component {
  constructor() {
    super();
    this.state = {
      profile: "",
      resident: true,
      dni: "",
      name: "",
      lastname1: "",
      lastname2: "",
      born_dates: "",
      id_district: "",
      marital_status: "No",
      address: "",
      nationality: "",
      campus_code: "",
      careers: [],
      languages: [],
      networks: [],
      associated_careers: [],
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateStudent() {
    let error = false;
    error =
      !Validator.validateSimpleTextJquery(
        this.state.name,
        "studentNameError",
        40,
        "name"
      ) || error;
    error =
      !Validator.validateSimpleTextJquery(
        this.state.lastname1,
        "studentLastName1Error",
        40,
        "name"
      ) || error;
    error =
      !Validator.validateSimpleTextJquery(
        this.state.lastname2,
        "studentLastName2Error",
        40,
        "name"
      ) || error;
    error =
      !Validator.validateSimpleSelectJquery(
        this.state.born_dates,
        "studentDateError"
      ) || error;
    error =
      !Validator.validateSimpleTextJquery(
        this.state.dni,
        "studentDniError",
        40,
        "dni"
      ) || error;
    error =
      !Validator.validateSimpleSelectJquery(
        this.state.nationality,
        "countrySelectError"
      ) || error;
    if (this.state.resident) {
      error =
        !Validator.validateSimpleSelectJquery(
          this.state.id_district,
          "districtError"
        ) || error;
    }
    error =
      !Validator.validateSimpleSelectJquery(
        this.state.campus_code,
        "selectCampusError"
      ) || error;
    error =
      !Validator.validateSimpleSelectJquery(
        this.state.careers,
        "selectCareerError"
      ) || error;
    if (this.state.profile === "Avanzado" || this.state.profile === "Medio") {
      error =
        !Validator.validateSimpleSelectJquery(
          this.state.languages,
          "selectLanguageError"
        ) || error;
    }
    return !error;
  }

  async existStudent(student) {
    const res = await axios.post(`${API}/person_exists`, {
      id: student.dni,
    });
    return res.data.personexists;
  }

  async createStudent(student) {
    const exist = await this.existStudent(student);
    if (!exist) {
      swal({
        title: "¡Atención!",
        text:
          "Una vez ejecutado guardará la información del vinculado de forma permanente",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (willConfirm) => {
        if (willConfirm) {
          await axios.post(`${API}/student`, student);
          swal("¡Listo!", "Se creó el vinculado exitosamente.", "success").then(
            () => {
              window.location.reload();
            }
          );
        } else {
          swal("La información se mantendrá igual", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    } else {
      swal(
        "¡Atención!",
        "No se creó el vinculado debido a que su identificación ya se encuentra registrada",
        "warning"
      );
    }
  }

  async prepareStudent() {
    if (this.validateStudent()) {
      const invitedOrBasic =
        this.state.profile === "Invitado" || this.state.profile === "Básico";
      const student = {
        dni: this.state.dni,
        name: this.state.name,
        lastname1: this.state.lastname1,
        lastname2: this.state.lastname2,
        born_dates: this.state.born_dates,
        id_district: this.state.resident ? this.state.id_district : 0,
        marital_status: this.state.marital_status,
        campus_code: this.state.campus_code,
        profile: this.state.profile,
        address: this.state.address,
        nationality: this.state.nationality,
        careers: this.state.careers,
        languages: invitedOrBasic ? [] : this.state.languages,
        networks: invitedOrBasic ? [] : this.state.networks,
        associated_careers: invitedOrBasic ? [] : this.state.associated_careers,
      };
      console.log(student);
      await this.createStudent(student);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  handleProfileChange(event) {
    const { value } = event.target;
    const invitedOrBasic = value === "Invitado" || value === "Básico";
    if (invitedOrBasic) {
      this.setState({
        languages: [],
        networks: [],
        associated_careers: [],
        profile: value,
      });
    } else {
      this.setState({
        profile: value,
      });
    }
  }

  handleSubmit() {
    this.prepareStudent();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <LinkedSection
          handleChange={this.handleChange}
          handleProfileChange={this.handleProfileChange}
          history={this.props.history}
          match={this.props.match}
          location={this.props.location}
        />
        {this.state.profile !== "" && (
          <>
            <PersonalInformation
              handleChange={this.handleChange}
              {...this.state}
            />
            <AcademicInformation
              handleChange={this.handleChange}
              {...this.state}
            />
            <div className="vinculacion__submit">
              <button
                type="submit"
                className="btn btn-lg btn-success"
                onClick={this.handleSubmit}
              >
                Crear
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
