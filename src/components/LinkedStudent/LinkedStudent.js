import React, { Component } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import AcademicInformation from "../AcademicInformation/AcademicInformation";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import { validateStudent } from "../../helpers/ValidateStudent";
import { handleSimpleInputChange } from "../../helpers/Handles";
import * as Formatter from "./formatInfo";

export default class LinkedStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profile: "Invitado",
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
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadPerson();

    //? listen route changes.
    this.unlisten = this.props.history.listen(() => {
      this.loadPerson();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  async loadPerson() {
    const dni = this.props.match.params.dni;
    if (dni) {
      const res = await axios.get(`${API}/student_all/${dni}`);
      const data = res.data;
      if (data.student) {
        const {
          student,
          careers,
          networks,
          languages,
          associated_careers,
          direction,
        } = data;
        const formattedCountry = Formatter.formatCountry(student.nationality);
        const formattedCampus = Formatter.formatCampus(
          student.campus_code,
          student.campus
        );
        const formattedCareers = Formatter.formatCareers(careers);
        const formattedNetworks = Formatter.formatNetworks(networks);
        const formattedLanguages = Formatter.formatLanguages(languages);
        const formattedAssoCareers = Formatter.formatAssociatedCareers(
          associated_careers
        );

        this.setState({
          ...student,
          resident: direction.id_district !== 0,
          country_selected: formattedCountry,
          campus_selected: formattedCampus,
          careers_selected: formattedCareers.careers_selected,
          careers: formattedCareers.careers,
          networks_selected: formattedNetworks.networks_selected,
          networks: formattedNetworks.networks,
          languages_selected: formattedLanguages.languages_selected,
          languages: formattedLanguages.languages,
          associatedCareers_selected:
            formattedAssoCareers.associatedCareers_selected,
          associated_careers: formattedAssoCareers.associated_careers,
          direction: direction,
        });
        this.setState({ show: true });
      }
    } else {
      this.setState({ show: true });
    }
  }

  /**
   * * Verifica que no exista el usario a crear
   */
  async existStudent(student) {
    const res = await axios.post(`${API}/person_exists`, {
      id: student.dni,
    });
    return res.data.personexists;
  }

  /**
   * * Función que pide confirmación al usuario para crear al estudiante,
   * * de ser así, lo registra, caso contrario no lo registra.
   */
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
              this.props.history.push(`/buscar-vinculado/${student.dni}`);
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

  createStudentObject() {
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
    return student;
  }

  async preCreateStudent() {
    const student = this.createStudentObject();
    if (validateStudent(student, this.state.resident)) {
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
      });
    }
    this.setState({
      profile: value,
    });
  }

  handleSubmit() {
    //aqui va la logica de si va crear o editar
    this.preCreateStudent();
  }

  render() {
    return (
      this.state.show && (
        <>
          <ProfileSection
            handleChange={this.handleProfileChange}
            profile={this.state.profile}
          />
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
              {this.props.match.params.dni ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </>
      )
    );
  }
}
