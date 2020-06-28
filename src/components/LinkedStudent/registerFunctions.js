import swal from "sweetalert";
import $ from "jquery";
import {
  get_request,
  post_request,
} from "../../helpers/Request";
import { API } from "../../services/env";
import axios from "axios";

async function existStudent(student) {
  const res = await get_request(`person/exists/${student.dni}`);
  if (res.status) {
    return res.data.personexists;
  } else {
    return null;
  }
}

/**
 * * Función que pide confirmación al usuario para crear al estudiante,
 * * de ser así, lo registra, caso contrario no lo registra.
 */
export async function createStudent(student, cv) {
  const exist = await existStudent(student);
  if (exist !== null) {
    if (!exist) {
      swal({
        title: "¡Atención!",
        text:
          "Una vez ejecutado guardará la información del vinculado de forma permanente",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (willConfirm) => {
        if (willConfirm) {
          const res = await post_request(`student`, student);
          if (res.status) {
            if (cv !== null) {
              this.createCV(student.dni, cv);
            } else {
              swal(
                "¡Listo!",
                "Se creó el vinculado exitosamente.",
                "success"
              ).then(() => {
                this.props.history.push(`/ver-estudiante/${student.dni}`);
              });
            }
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
}

export async function createCV(dni, cv) {
  const data = new FormData();
  data.append("tabla", "CV");
  data.append("dni", dni);
  data.append("file", cv);
  this.setState({ uploading: true });

  const res = await axios.post(`${API}/studentcv`, data, this.state.options);
  if (res.status === 200){
    this.setState({ uploadPercentage: 100 }, () => {
      setTimeout(() => {
        $("#loadingBar").modal("hide");
        this.setState({ uploadPercentage: 0, uploading: false });
        swal("¡Listo!", "Se creó el vinculado exitosamente.", "success").then(
          () => {
            this.props.history.push(`/ver-estudiante/${dni}`);
          }
        );
      }, 1000);
    });
  }
}
