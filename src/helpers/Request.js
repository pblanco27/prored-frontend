import { API, axiosHeader } from "../services/env";
import axios from "axios";
import swal from "sweetalert";

function verifyStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return { status: true, data: response.data };
  } else {
    localStorage.clear();
    if (response.status === 401) {
      swal(
        "¡Atención!",
        `Su sesión es inválida o ya expiró.
         Por motivos de seguridad, se cerrará la sesión`,
        "warning"
      ).then(() => {
        window.location = "/";        
      });
    } else {
      swal(
        "¡Error!",
        `Ha ocurrido un problema en el servidor.
         Por motivos de seguridad, se cerrará su sesión`,
        "error"
      ).then(() => {
        window.location = "/";
      });
    }
    return { status: false };
  }
}

async function request(req) {
  try {
    const response = await req();
    return verifyStatus(response);
  } catch (error) {
    localStorage.clear();
    swal(
      "¡Error!",
      `Ha ocurrido un problema en el servidor.
       Por motivos de seguridad, se cerrará su sesión`,
      "error"
    ).then(() => {
      window.location = "/";      
    });
    return { status: false };
  }
}

export async function get_request(url) {
  const func = async () => {
    return await axios.get(`${API}/${url}`, axiosHeader());
  };
  return await request(func);
}

export async function post_request(url, body = {}) {
  const func = async () => {
    return await axios.post(`${API}/${url}`, body, axiosHeader());
  };
  return await request(func);
}

export async function put_request(url, body = {}) {
  const func = async () => {
    return await axios.put(`${API}/${url}`, body, axiosHeader());
  };
  return await request(func);
}

export async function delete_request(url) {
  const func = async () => {
    return await axios.delete(`${API}/${url}`, axiosHeader());
  };
  return await request(func);
}
