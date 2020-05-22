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
  await removeLanguages(languages.toDelete, dni);
  await addLanguages(languages.toCreate, dni);
  await removeCareers(careers.toDelete, dni);
  await addCareers(careers.toCreate, dni);
  await removeNetworks(networks.toDelete, dni);
  await addNetworks(networks.toCreate, dni);
  await removeOtherCareers(associated_careers.toDelete, dni);
  await addOtherCareers(associated_careers.toCreate, dni);
}

/**
 * * Función que elimina todos los lenguajes de un vinculado de la BD
 */
async function removeLanguages(deleteLanguages, dni) {
  if (deleteLanguages) {
    await deleteLanguages.map(
      async (language) =>
        await axios.delete(`${API}/student/${dni}/language`, {
          data: { id_language: language },
        })
    );
  }
}

/**
 * * Función que elimina todas las redes de un vinculado de la BD
 */
async function removeNetworks(deleteNetworks, dni) {
  if (deleteNetworks) {
    await deleteNetworks.map(
      async (network) =>
        await axios.delete(`${API}/student/${dni}/network`, {
          data: { id_network: network },
        })
    );
  }
}

/**
 * * Función que elimina todas las carreras de un vinculado de la BD
 */
async function removeCareers(deleteCareers, dni) {
  if (deleteCareers) {
    await deleteCareers.map(
      async (career) =>
        await axios.delete(`${API}/student/${dni}/career`, {
          data: { career_code: career },
        })
    );
  }
}

/**
 * * Función que elimina todas las carreras asociadas de un vinculado de la BD
 */
async function removeOtherCareers(deleteOtherCareers, dni) {
  if (deleteOtherCareers) {
    await deleteOtherCareers.map(
      async (asso) =>
        await axios.delete(`${API}/student/${dni}/associated_career`, {
          data: { id_associated_career: asso },
        })
    );
  }
}

/**
 * * Función que agrega todos los lenguajes seleccionados para un vinculado a la BD
 */
async function addLanguages(newLanguages, dni) {
  await newLanguages.map(
    async (language) =>
      await axios.post(`${API}/student/${dni}/language`, {
        id_language: language,
      })
  );
}

/**
 * * Función que agrega todas las redes seleccionadas para un vinculado a la BD
 */
async function addNetworks(newNetworks, dni) {
  await newNetworks.map(
    async (network) =>
      await axios.post(`${API}/student/${dni}/network`, {
        id_network: network,
      })
  );
}

/**
 * * Función que agrega todas las carreras seleccionadas para un vinculado a la BD
 */
async function addCareers(newCareers, dni) {
  await newCareers.map(
    async (career) =>
      await axios.post(`${API}/student/${dni}/career`, {
        career_code: career,
      })
  );
}

/**
 * * Función que agrega todas las carreras asociadas seleccionadas para un vinculado a la BD
 */
async function addOtherCareers(newAssociated, dni) {
  await newAssociated.map(
    async (asso) =>
      await axios.post(`${API}/student/${dni}/associated_career`, {
        id_associated_career: asso,
      })
  );
}
