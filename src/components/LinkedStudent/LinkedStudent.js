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
    this._mount = false;
    this.unlisten();
  }

  toggleEdit() {
    this.setState({ disable: !this.state.disable });
  }

  async toggleDisable() {
    if (this.state.status) {
      const res = await axios.put(`${API}/student/${this.state.dni}/disable`);
      if (res.status === 200) {
        this.setState({ status: false });
        swal("¡Listo!", "Se desabilitó vinculado exitosamente.", "success");
      } else {
        swal("¡Error!", "No se pudo desabilitar el vinculado", "error");
      }
    } else {
      const res = await axios.put(`${API}/student/${this.state.dni}/enable`);
      if (res.status === 200) {
        this.setState({ status: true });
        swal("¡Listo!", "Se habilitó vinculado exitosamente.", "success");
      } else {
        swal("¡Error!", "No se pudo habilitar el vinculado", "error");
      }
    }
  }

  loadPerson() {
    this.setState({ show: false });
    const dni = this.props.match.params.dni;
    this.setState({
      disable: dni ? true : false,
    });
    if (dni) {
      axios.get(`${API}/student_all/${dni}`).then((res) => {
        if (this._mount) {
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
            const formattedCountry = Formatter.formatCountry(
              student.nationality
            );
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
              careers_default: formattedCareers.careers,
              careers: formattedCareers.careers,
              networks_selected: formattedNetworks.networks_selected,
              networks_default: formattedNetworks.networks,
              networks: formattedNetworks.networks,
              languages_selected: formattedLanguages.languages_selected,
              languages_default: formattedLanguages.languages,
              languages: formattedLanguages.languages,
              associatedCareers_selected:
                formattedAssoCareers.associatedCareers_selected,
              associatedCareers_default:
                formattedAssoCareers.associated_careers,
              associated_careers: formattedAssoCareers.associated_careers,
              direction: direction,
            });
            this.setState({ show: true });
          }
        }
      });
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

  /**
   * * Se encarga de filtrar que se borra y que se agrega en los campos
   * * de informacion academcia
   */
  filterToUpdate(originalData, newData) {
    const toDelete = originalData.filter((e) => {
      return !newData.find((i) => i === e);
    });
    const toCreate = newData.filter((e) => {
      return !originalData.find((i) => e === i);
    });
    return { toDelete, toCreate };
  }

  async editAcademicInformation(student) {
    const careers = this.filterToUpdate(
      this.state.careers_default,
      student.careers
    );
    const networks = this.filterToUpdate(
      this.state.networks_default,
      student.networks
    );

    const languages = this.filterToUpdate(
      this.state.languages_default,
      student.languages
    );
    const associated_careers = this.filterToUpdate(
      this.state.associatedCareers_default,
      student.associated_careers
    );

    await this.removeLanguages(languages.toDelete);
    await this.addLanguages(languages.toCreate);
    await this.removeCareers(careers.toDelete);
    await this.addCareers(careers.toCreate);
    await this.removeNetworks(networks.toDelete);
    await this.addNetworks(networks.toCreate);
    await this.removeOtherCareers(associated_careers.toDelete);
    await this.addOtherCareers(associated_careers.toCreate);
  }

  /**
   * * Función que elimina todos los lenguajes de un vinculado de la BD
   */
  async removeLanguages(deleteLanguages) {
    if (deleteLanguages) {
      await deleteLanguages.map(
        async (language) =>
          await axios.delete(`${API}/student/${this.state.dni}/language`, {
            data: { id_language: language },
          })
      );
    }
  }

  /**
   * * Función que elimina todas las redes de un vinculado de la BD
   */
  async removeNetworks(deleteNetworks) {
    if (deleteNetworks) {
      await deleteNetworks.map(
        async (network) =>
          await axios.delete(`${API}/student/${this.state.dni}/network`, {
            data: { id_network: network },
          })
      );
    }
  }

  /**
   * * Función que elimina todas las carreras de un vinculado de la BD
   */
  async removeCareers(deleteCareers) {
    if (deleteCareers) {
      await deleteCareers.map(
        async (career) =>
          await axios.delete(`${API}/student/${this.state.dni}/career`, {
            data: { career_code: career },
          })
      );
    }
  }

  /**
   * * Función que elimina todas las carreras asociadas de un vinculado de la BD
   */
  async removeOtherCareers(deleteOtherCareers) {
    if (deleteOtherCareers) {
      await deleteOtherCareers.map(
        async (asso) =>
          await axios.delete(
            `${API}/student/${this.state.dni}/associated_career`,
            {
              data: { id_associated_career: asso },
            }
          )
      );
    }
  }

  /**
   * * Función que agrega todos los lenguajes seleccionados para un vinculado a la BD
   */
  async addLanguages(newLanguages) {
    await newLanguages.map(
      async (language) =>
        await axios.post(`${API}/student/${this.state.dni}/language`, {
          id_language: language,
        })
    );
  }

  /**
   * * Función que agrega todas las redes seleccionadas para un vinculado a la BD
   */
  async addNetworks(newNetworks) {
    await newNetworks.map(
      async (network) =>
        await axios.post(`${API}/student/${this.state.dni}/network`, {
          id_network: network,
        })
    );
  }

  /**
   * * Función que agrega todas las carreras seleccionadas para un vinculado a la BD
   */
  async addCareers(newCareers) {
    await newCareers.map(
      async (career) =>
        await axios.post(`${API}/student/${this.state.dni}/career`, {
          career_code: career,
        })
    );
  }

  /**
   * * Función que agrega todas las carreras asociadas seleccionadas para un vinculado a la BD
   */
  async addOtherCareers(newAssociated) {
    await newAssociated.map(
      async (asso) =>
        await axios.post(`${API}/student/${this.state.dni}/associated_career`, {
          id_associated_career: asso,
        })
    );
  }

  editStudent(student) {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado cambiará la información del vinculado de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        await axios.put(`${API}/student/${student.dni}`, student);
        this.editAcademicInformation(student);
        swal("¡Listo!", "Se editó el vinculado exitosamente.", "success").then(
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
          />
          <PersonalInformation
            handleChange={this.handleChange}
            {...this.state}
            disable={this.state.disable}
          />
          <AcademicInformation
            handleChange={this.handleChange}
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
