import { API, axiosHeader } from "../services/env";
import axios from "axios";
import swal from "sweetalert";

function verifyStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return { status: true, data: response.data };
  } else {
    if (response.status === 500) {
      swal(
        "¡Error!",
        `Ha ocurrido un problema en el servidor.
         Por motivos de seguridad, se cerrará su sesión`,
        "error"
      );
    } else if (response.status === 401) {
      swal(
        "¡Error!",
        `Su sesión es inválida o ya expiró.
         Por motivos de seguridad, se cerrará la sesión`,
        "error"
      );
    }
    window.location = "/iniciar-sesion";
    localStorage.clear();
    return { status: false };
  }
}

export async function get_request(url) {
  const response = await axios.get(`${API}/${url}`, axiosHeader());
  return verifyStatus(response);
}

export async function post_request(url, body = {}) {
  const response = await axios.post(`${API}/${url}`, body, axiosHeader());
  return verifyStatus(response);
}

export async function put_request(url, body = {}) {
  const response = await axios.put(`${API}/${url}`, body, axiosHeader());
  return verifyStatus(response);
}

export async function delete_request(url) {
  const response = await axios.delete(`${API}/${url}`, axiosHeader());
  return verifyStatus(response);
}
