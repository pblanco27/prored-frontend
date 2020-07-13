import swal from "sweetalert";
import { post_request } from "../../helpers/Request";

export async function createBudget(budget) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado guardará la información de la partida de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const res = await post_request(`financial_item`, budget);
      if (res.status) {
        const id = res.data.id_financial_item;
        swal("¡Listo!", "Se creó la partida exitosamente.", "success").then(
          () => {
            this.props.history.push(`/ver-partida/${id}`);
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
