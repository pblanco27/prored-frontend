import { API, axiosHeader } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";

export async function editActivity(activity) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado guardará la información de la actividad de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const persons = activity.persons.filter((p) => {
        return p.dni;
      });

      await axios.put(
        `${API}/activity/${this.state.id_activity}`,
        {
          ...activity,
          persons,
        },
        axiosHeader()
      );

      swal("¡Listo!", "Se editó la actividad exitosamente.", "success").then(
        () => {
          window.location.reload();
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
