import swal from "sweetalert";
import { put_request } from "../../helpers/Request";

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
      const editActi = { ...activity, persons };
      const res = await put_request(
        `activity/${this.state.id_activity}`,
        editActi
      );
      if (res.status) {
        swal("¡Listo!", "Se editó la actividad exitosamente.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } else {
      swal("La información se mantendrá igual", {
        title: "¡Atención!",
        icon: "info",
      });
    }
  });
}
