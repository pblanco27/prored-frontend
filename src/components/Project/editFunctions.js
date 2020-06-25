import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";
export function editProject(project) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado cambiará la información del proyecto de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const persons = project.persons.filter((p) => {
        return p.dni;
      });

      await axios.put(`${API}/project/${project.id_project}`, {
        ...project,
        persons,
      });
      swal("¡Listo!", "Se editó el proyecto exitosamente.", "success").then(
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
