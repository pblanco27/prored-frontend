import swal from "sweetalert";
import { put_request } from "../../helpers/Request";

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
      const editProject = {
        ...project,
        persons,
      };
      const res = await put_request(
        `project/${project.id_project}`,
        editProject
      );
      if (res.status) {
        swal("¡Listo!", "Se editó el proyecto exitosamente.", "success").then(
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
