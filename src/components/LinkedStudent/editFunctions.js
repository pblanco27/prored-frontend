import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";
import * as Formatter from "./formatInfo";
import { profile } from "../../helpers/Enums";

export async function toggleDisable() {
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

export function loadProfiles(studentProfile) {
  const profileCurrent = profile.find((p) => {
    return studentProfile === p.value;
  });
  const profiles = profile.map((p) => {
    return {
      ...p,
      disable: profileCurrent.grade > p.grade ? true : false,
    };
  });
  this.setState({
    profiles: profiles,
  });
}

export async function loadCV(dni) {
  const cv = await axios.get(`${API}/studentcv/${dni}`);
  this.setState({ cv: cv.data, original_cv: cv.data });
}

export function loadCountry(nationality) {
  const formattedCountry = Formatter.formatCountry(nationality);
  this.setState({
    country_selected: formattedCountry,
  });
}

export function loadCampus(campus_code, campus) {
  const formattedCampus = Formatter.formatCampus(campus_code, campus);
  this.setState({
    campus_selected: formattedCampus,
  });
}

export function loadCareers(careers) {
  const formattedCareers = Formatter.formatCareers(careers);
  this.setState({
    careers_selected: formattedCareers.careers_selected,
    careers_default: formattedCareers.careers,
    careers: formattedCareers.careers,
  });
}

export function loadNetworks(networks) {
  const formattedNetworks = Formatter.formatNetworks(networks);
  this.setState({
    networks_selected: formattedNetworks.networks_selected,
    networks_default: formattedNetworks.networks,
    networks: formattedNetworks.networks,
  });
}

export function loadLanguages(languages) {
  const formattedLanguages = Formatter.formatLanguages(languages);
  this.setState({
    languages_selected: formattedLanguages.languages_selected,
    languages_default: formattedLanguages.languages,
    languages: formattedLanguages.languages,
  });
}

export function loadAssoCareers(associated_careers) {
  const formattedAssoCareers = Formatter.formatAssociatedCareers(
    associated_careers
  );
  this.setState({
    associatedCareers_selected: formattedAssoCareers.associatedCareers_selected,
    associatedCareers_default: formattedAssoCareers.associated_careers,
    associated_careers: formattedAssoCareers.associated_careers,
  });
}

/**
 * * Se encarga de filtrar que se borra y que se agrega en los campos
 * * de informacion academcia
 */
function filterToUpdate(originalData, newData) {
  const toDelete = originalData.filter((e) => {
    return !newData.find((i) => i === e);
  });
  const toCreate = newData.filter((e) => {
    return !originalData.find((i) => e === i);
  });
  return { toDelete, toCreate };
}

export async function updateCV() {
  if (this.state.cv === null || this.state.cv.msg) {
    await axios.delete(`${API}/studentcv/${this.state.dni}`);
  } else if (!this.state.cv.dni) {
    const data = new FormData();
    data.append("tabla", "CV");
    data.append("dni", this.state.dni);
    data.append("file", this.state.cv);
    await axios.delete(`${API}/studentcv/${this.state.dni}`);
    await axios.post(`${API}/studentcv`, data, {});
  }
}

export function editStudent(student) {
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

      this.updateCV();
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

export async function editAcademicInformation(student) {
  const careers = filterToUpdate(this.state.careers_default, student.careers);
  const networks = filterToUpdate(
    this.state.networks_default,
    student.networks
  );

  const languages = filterToUpdate(
    this.state.languages_default,
    student.languages
  );
  const associated_careers = filterToUpdate(
    this.state.associatedCareers_default,
    student.associated_careers
  );

  const dni = this.state.dni;

  await updateCareersForStudent(careers, dni);
  await updateNetworksForStudent(networks, dni);
  await updateLanguagesForStudent(languages, dni);
  await updateAssoCareersForStudent(associated_careers, dni);
}

async function updateCareersForStudent(careers, dni) {
  await axios.put(`${API}/student/${dni}/careers`, careers);
}

async function updateNetworksForStudent(networks, dni) {
  await axios.put(`${API}/student/${dni}/networks`, networks);
}

async function updateLanguagesForStudent(languages, dni) {
  await axios.put(`${API}/student/${dni}/languages`, languages);
}

async function updateAssoCareersForStudent(associated_careers, dni) {
  await axios.put(
    `${API}/student/${dni}/associated_careers`,
    associated_careers
  );
}
