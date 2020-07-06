import swal from "sweetalert";
import { put_request } from "../../helpers/Request";

export function editBudget(budget) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado cambiará la información de la partida de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const res = await put_request(
        `financial_item/${budget.id_financial_item}`,
        budget
      );
      if (res.status) {
        swal("¡Listo!", "Se editó la partida exitosamente.", "success").then(
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
