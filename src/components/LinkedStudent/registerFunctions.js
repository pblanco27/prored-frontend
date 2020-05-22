import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";

async function existStudent(student) {
  const res = await axios.post(`${API}/person_exists`, {
    id: student.dni,
  });
  return res.data.personexists;
}

/**
 * * Función que pide confirmación al usuario para crear al estudiante,
 * * de ser así, lo registra, caso contrario no lo registra.
 */
export async function createStudent(student) {
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
