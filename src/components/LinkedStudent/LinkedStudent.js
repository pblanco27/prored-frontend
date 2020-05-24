import React, { Component } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import AcademicInformation from "../AcademicInformation/AcademicInformation";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import { validateStudent } from "../../helpers/ValidateStudent";
import { handleSimpleInputChange } from "../../helpers/Handles";
import "./LinkedStudent.css";
import { profile } from "../../helpers/Enums";
import { createStudentObject } from "./functions";
import { createStudent } from "./registerFunctions";
import {
  toggleDisable,
  loadProfiles,
  loadCountry,
  loadCampus,
  loadCareers,
  loadNetworks,
  loadLanguages,
  loadAssoCareers,
  editStudent,
  editAcademicInformation,
} from "./editFunctions";
export default class LinkedStudent extends Component {
  _mount = true;
  constructor(props) {
    super(props);
    this.state = {
      disable: this.props.match.params.dni ? true : false,
      show: false,
      profile: "Invitado",
      resident: true,
      dni: "",
      name: "",
      lastname1: "",
      lastname2: "",
      born_dates: "",
      id_district: "",
      marital_status: "No especifica",
      phone_number: "",
      email: "",
      emergency_contact: "",
      address: "",
      nationality: "",
      campus_code: "",
      careers: [],
      languages: [],
      networks: [],
      associated_careers: [],
      profiles: profile,
      cv: null,
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStudentObject = createStudentObject.bind(this);
    this.createStudent = createStudent.bind(this);
    this.toggleDisable = toggleDisable.bind(this);
    this.loadProfiles = loadProfiles.bind(this);
    this.loadCountry = loadCountry.bind(this);
    this.loadCampus = loadCampus.bind(this);
    this.loadCareers = loadCareers.bind(this);
    this.loadNetworks = loadNetworks.bind(this);
    this.loadLanguages = loadLanguages.bind(this);
    this.loadAssoCareers = loadAssoCareers.bind(this);
    this.editStudent = editStudent.bind(this);
    this.editAcademicInformation = editAcademicInformation.bind(this);
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

  loadPerson() {
    const dni = this.props.match.params.dni;

    this.setState({
      disable: dni ? true : false,
      show: false,
    });
    if (dni) {
      axios.get(`${API}/student_all/${dni}`).then((res) => {
        if (this._mount) {
          const data = res.data;
          if (data.student) {
            const studentData = { ...data };

            this.loadProfiles(studentData.student.profile);
            this.loadCountry(studentData.student.nationality);
            this.loadCampus(
              studentData.student.campus_code,
              studentData.student.campus
            );
            this.loadCareers(studentData.careers);
            this.loadNetworks(studentData.networks);
            this.loadLanguages(studentData.languages);
            this.loadAssoCareers(studentData.associated_careers);
            this.setState({
              ...studentData.student,
              resident: studentData.direction.id_district !== 0,
              direction: studentData.direction,
              show: true,
            });
          }
        }
      });
    } else {
      this.setState({ show: true });
    }
  }

  toggleEdit() {
    this.setState({ disable: !this.state.disable });
  }

  preEditStudent() {
    const student = this.createStudentObject();
    if (validateStudent(student, this.state.resident)) {
      this.editStudent(student);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  async preCreateStudent() {
    const student = this.createStudentObject();
    if (validateStudent(student, this.state.resident)) {
      await this.createStudent(student, this.state.cv);
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
    if (this.props.match.params.dni) {
      this.preEditStudent();
    } else {
      this.preCreateStudent();
    }
  }

  render() {
    return (
      this.state.show && (
        <>
          <ProfileSection
            handleChange={this.handleProfileChange}
            profile={this.state.profile}
            disable={this.state.disable}
            profiles={this.state.profiles}
          />
          <PersonalInformation
            handleChange={this.handleChange}
            {...this.state}
            disable={this.state.disable}
          />
          <AcademicInformation
            handleChange={this.handleChange}
            handleFileInputChange={this.handleFileInputChange}
            {...this.state}
            disable={this.state.disable}
          />
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
