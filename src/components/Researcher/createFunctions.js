import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";

async function existResearcher(researcher) {
  const res = await axios.get(`${API}/person/exists/${researcher.dni}`);
  return res.data.personexists;
}

export async function createResearcher(researcher) {
  const exist = await existResearcher(researcher);
  if (!exist) {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información del vinculado de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        await axios.post(`${API}/researcher`, researcher);

        swal("¡Listo!", "Se creó el vinculado exitosamente.", "success").then(
          this.props.history.push(`/buscar-investigador/${researcher.dni}`)
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
