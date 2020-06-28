import swal from "sweetalert";
import { post_request } from "../../helpers/Request";

export async function createActivity(activity) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado guardará la información de la actividad de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const res = await post_request(`activity`, activity);
      if (res.status){
        swal("¡Listo!", "Se creó la actividad exitosamente.", "success").then(
          () => {
            this.props.history.push(`/ver-actividad/${res.data.id_activity}`);
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
