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
      console.log(result.data);

      swal("¡Listo!", "Se creó el projecto exitosamente.", "success").then(
        () => {
          //! cambiar esto por la data
          this.props.history.push(`/ver-actividad/3`);
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