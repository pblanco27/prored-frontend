import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";

export async function createActivity(activity) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado guardará la información de la actividad de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const result = await axios.post(`${API}/activity`, activity);
      swal("¡Listo!", "Se creó la actividad exitosamente.", "success").then(
        () => {
          this.props.history.push(`/ver-actividad/${result.data.id_activity}`);
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
