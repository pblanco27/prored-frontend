import swal from "sweetalert";
import { get_request, post_request } from "../../helpers/Request";

async function existResearcher(researcher) {
  const res = await get_request(`person/exists/${researcher.dni}`);
  if (res.status) {
    return res.data.personexists;
  } else {
    return null;
  }
}

/**
 * * Función que pide confirmación al usuario para crear al investigador,
 * * de ser así, lo registra, caso contrario no lo registra.
 */
export async function createResearcher(researcher) {
  const exist = await existResearcher(researcher);
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
          const res = await post_request(`researcher`, researcher);
          if (res.status) {
            swal(
              "¡Listo!",
              "Se creó el vinculado exitosamente.",
              "success"
            ).then(
              this.props.history.push(`/ver-investigador/${researcher.dni}`)
            );
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
