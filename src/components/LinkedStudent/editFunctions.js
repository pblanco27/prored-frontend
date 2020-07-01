import { profile } from "../../helpers/Enums";
import * as Formatter from "./formatInfo";
import swal from "sweetalert";
import $ from "jquery";
import {
  get_request,
  put_request,
  delete_request,
} from "../../helpers/Request";
import { API } from "../../services/env";
import axios from "axios";

export async function toggleDisable() {
  if (this.state.status) {
    const res = await put_request(`student/${this.state.dni}/disable`);
    if (res.status) {
      this.setState({ status: false });
      swal("¡Listo!", "Se desabilitó vinculado exitosamente.", "success");
    }
  } else {
    const res = await put_request(`student/${this.state.dni}/enable`);
    if (res.status) {
      this.setState({ status: true });
      swal("¡Listo!", "Se habilitó vinculado exitosamente.", "success");
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
  if (this._isMounted) {
    this.setState({
      profiles: profiles,
    });
  }
}

export async function loadCV(dni) {
  const cv = await get_request(`studentcv/${dni}`);
  if (cv.status && this._isMounted) {
    this.setState({ cv: cv.data, original_cv: cv.data });
  }
}

export function loadCountry(nationality) {
  const formattedCountry = Formatter.formatCountry(nationality);
  if (this._isMounted) {
    this.setState({
      country_selected: formattedCountry,
    });
  }
}

export function loadCampus(campus_code, campus) {
  const formattedCampus = Formatter.formatCampus(campus_code, campus);
  if (this._isMounted) {
    this.setState({
      campus_selected: formattedCampus,
    });
  }
}

export function loadCareers(careers) {
  const formattedCareers = Formatter.formatCareers(careers);
  if (this._isMounted) {
    this.setState({
      careers_selected: formattedCareers.careers_selected,
      careers_default: formattedCareers.careers,
      careers: formattedCareers.careers,
    });
  }
}

export function loadNetworks(networks) {
  const formattedNetworks = Formatter.formatNetworks(networks);
  if (this._isMounted) {
    this.setState({
      networks_selected: formattedNetworks.networks_selected,
      networks_default: formattedNetworks.networks,
      networks: formattedNetworks.networks,
    });
  }
}

export function loadLanguages(languages) {
  const formattedLanguages = Formatter.formatLanguages(languages);
  if (this._isMounted) {
    this.setState({
      languages_selected: formattedLanguages.languages_selected,
      languages_default: formattedLanguages.languages,
      languages: formattedLanguages.languages,
    });
  }
}

export function loadAssoCareers(associated_careers) {
  const formattedAssoCareers = Formatter.formatAssociatedCareers(
    associated_careers
  );
  if (this._isMounted) {
    this.setState({
      associatedCareers_selected:
        formattedAssoCareers.associatedCareers_selected,
      associatedCareers_default: formattedAssoCareers.associated_careers,
      associated_careers: formattedAssoCareers.associated_careers,
    });
  }
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
    const res = await delete_request(`studentcv/${this.state.dni}`);
    if (res.status) {
      swal("¡Listo!", "Se editó el vinculado exitosamente.", "success").then(
        () => {
          window.location.reload();
        }
      );
    }
  } else if (!this.state.cv.dni) {
    const data = new FormData();
    data.append("tabla", "CV");
    data.append("dni", this.state.dni);
    data.append("file", this.state.cv);
    this.setState({ uploading: true });
    let res = await delete_request(`studentcv/${this.state.dni}`);
    if (res.status) {
      res = await axios.post(`${API}/studentcv`, data, this.state.options);
      if (res.status === 200) {
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            $("#loadingBar").modal("hide");
            this.setState({ uploadPercentage: 0, uploading: false });
            swal(
              "¡Listo!",
              "Se editó el vinculado exitosamente.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }, 1000);
        });
      }
    }
  } else {
    swal("¡Listo!", "Se editó el vinculado exitosamente.", "success").then(
      () => {
        window.location.reload();
      }
    );
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
      const res = await put_request(`student/${student.dni}`, student);
      if (res.status) {
        this.editAcademicInformation(student);
        this.updateCV();
      }
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
  await put_request(`student/${dni}/careers`, careers);
}

async function updateNetworksForStudent(networks, dni) {
  await put_request(`student/${dni}/networks`, networks);
}

async function updateLanguagesForStudent(languages, dni) {
  await put_request(`student/${dni}/languages`, languages);
}

async function updateAssoCareersForStudent(associated_careers, dni) {
  await put_request(`student/${dni}/associated_careers`, associated_careers);
}
