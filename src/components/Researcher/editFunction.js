import axios from "axios";
import swal from "sweetalert";
import { API } from "../../services/env";

export function editResearcher(researcher, history) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado cambiará la información del vinculado de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      await axios.put(`${API}/researcher/${researcher.dni}`, researcher);
      swal("¡Listo!", "Se editó el vinculado exitosamente.", "success").then(
        () => {
          window.location.reload()
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