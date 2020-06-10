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

export async function toggleDisable() {
  if (this.state.status) {
    const res = await axios.put(`${API}/student/${this.state.dni}/disable`);
    if (res.status === 200) {
      this.setState({ status: false });
      swal("¡Listo!", "Se desabilitó vinculado exitosamente.", "success");
    } else {
      swal("¡Error!", "No se pudo desabilitar el vinculado", "error");
    }
  } else {
    const res = await axios.put(`${API}/student/${this.state.dni}/enable`);
    if (res.status === 200) {
      this.setState({ status: true });
      swal("¡Listo!", "Se habilitó vinculado exitosamente.", "success");
    } else {
      swal("¡Error!", "No se pudo habilitar el vinculado", "error");
    }
  }
}

export function handleToggleStatus(event) {
  let confirmMsg =
    "Una vez ejecutado activará al vinculado en todo el sistema";
  if (this.state.status) {
    confirmMsg =
      "Una vez ejecutado desactivará al vinculado en todo el sistema";
  }

  swal({
    title: "¡Atención!",
    text: confirmMsg,
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then((willConfirm) => {
    if (willConfirm) {
      if (this.state.status) {
        this.setState({
          btnStatusColor: "btn-success",
        });
      } else {
        this.setState({
          btnStatusColor: "btn-danger",
        });
      }
      this.toggleDisable();
    } else {
      swal("El estado del vinculado se mantendrá igual", {
        title: "¡Atención!",
        icon: "info",
      });
    }
  });
}