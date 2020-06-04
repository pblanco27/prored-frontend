import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";

async function existStudent(student) {
  const res = await axios.get(`${API}/person/exists/${student.dni}`);
  return res.data.personexists;
}

/**
 * * Función que pide confirmación al usuario para crear al estudiante,
 * * de ser así, lo registra, caso contrario no lo registra.
 */
export async function createStudent(student, cv) {
  const exist = await existStudent(student);
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
        if (cv !== null) {
          this.createCV(student.dni, cv);
        }
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

export function createCV(dni, cv) {
  const data = new FormData();
  data.append("tabla", "CV");
  data.append("dni", dni);
  data.append("file", cv);
  this.setState({ uploading: true });
  axios.post(`${API}/studentcv`, data, this.state.options).then(() => {
    this.setState({ uploadPercentage: 100 }, () => {
      setTimeout(() => {
        $("#loadingBar").modal("hide");
        this.setState({ uploadPercentage: 0, uploading: false });
        swal("¡Listo!", "Se creó el vinculado exitosamente.", "success").then(
          () => {
            this.props.history.push(`/buscar-estudiante/${dni}`);
          }
        );
      }, 1000);
    });
  });
}