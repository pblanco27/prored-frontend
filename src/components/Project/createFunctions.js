import swal from "sweetalert";
import $ from "jquery";
import { post_request, post_request_file } from "../../helpers/Request";

export async function createProject(project) {
  swal({
    title: "¡Atención!",
    text:
      "Una vez ejecutado guardará la información del proyecto de forma permanente",
    icon: "info",
    buttons: ["Cancelar", "Aceptar"],
  }).then(async (willConfirm) => {
    if (willConfirm) {
      const res = await post_request(`project`, project);
      if (res.status) {
        const id = res.data.id_project;
        if (this.state.project_form !== null) {
          this.createProjectForm(id, this.state.project_form);
        } else {
          swal("¡Listo!", "Se creó el proyecto exitosamente.", "success").then(
            () => {
              this.props.history.push(`/ver-proyecto/${id}`);
            }
          );
        }
      }
    } else {
      swal("La información se mantendrá igual", {
        title: "¡Atención!",
        icon: "info",
      });
    }
  });
}

export async function createProjectForm(id_project, file) {
  const data = new FormData();
  data.append("tabla", "project_form");
  data.append("id_project", id_project);
  data.append("file", file);
  this.setState({ uploading: true });

  const res = await post_request_file(`project_form`, data);
  if (res.status) {
    this.setState({ uploadPercentage: 100 }, () => {
      setTimeout(() => {
        $("#loadingBar").modal("hide");
        this.setState({ uploadPercentage: 0, uploading: false });
        swal("¡Listo!", "Se creó el proyecto exitosamente.", "success").then(
          () => {
            this.props.history.push(`/ver-proyecto/${id_project}`);
          }
        );
      }, 1000);
    });
  }
}
