import React, { Component } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import AcademicInformation from "../AcademicInformation/AcademicInformation";
import swal from "sweetalert";
import { get_request } from "../../helpers/Request";
import { validateStudent } from "../../helpers/ValidateStudent";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { profile } from "../../helpers/Enums";
import { createStudentObject } from "./functions";
import { createStudent, createCV } from "./registerFunctions";
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
  loadCV,
  updateCV,
} from "./editFunctions";
import LoadingBar from "../Modal/LoadingBar";
import PDFEstudiante from "../PDFGenerators/PDFStudent"

/**
 * * Componente que contiene la información y muestra los componentes
 * * necesarios para la creación y visualización de un estudiante
 */
export default class LinkedStudent extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.match.params.dni ? true : false,
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
      uploadPercentage: 0,
      uploading: false,
      options: {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
      },
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
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
    this.loadCV = loadCV.bind(this);
    this.updateCV = updateCV.bind(this);
    this.createCV = createCV.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.loadPerson();

    //? listen route changes.
    this.unlisten = this.props.history.listen(() => {
      this.loadPerson();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unlisten();
  }

  async loadPerson() {
    const dni = this.props.match.params.dni;
    if (this._isMounted) {
      this.setState({
        disable: dni ? true : false,
        show: false,
      });
    }    
    if (dni) {
      const res = await get_request(`student_all/${dni}`);
      if (res.status && this._isMounted) {
        const data = res.data;
        if (data.student) {
          const studentData = { ...data };
          this.loadCV(studentData.student.dni);
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
    } else {
      if (this._isMounted){
        this.setState({ show: true });
      }
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
          <div className="btn-container">
          <button
            type="submit"
            className="btn btn-lg btn-info"
            onClick={this.handleDisable}
          >
            Editar
          </button>
          <br></br>
          <br></br>
          <PDFEstudiante info = {this.state}></PDFEstudiante>
          </div>
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

            <br></br>
            <br></br>


            <PDFEstudiante info = {this.state}>
            
            </PDFEstudiante>


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
    if (this.state.show) {
      return (
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
          <ProfileSection
            handleChange={this.handleProfileChange}
            profile={this.state.profile}
            disable={this.state.disable}
            profiles={this.state.profiles}
            edit={this.props.match.params.dni ? true : false}
            status={this.state.status}
            toggleDisable={this.toggleDisable}
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
          <div className="d-flex justify-content-center mt-1 mb-3">
            {this.renderBtns()}
          </div>

          {this.state.uploading && (
            <LoadingBar uploadPercentage={this.state.uploadPercentage} />
          )}
        </>
      );
    } else {
      return null;
    }
  }
}
