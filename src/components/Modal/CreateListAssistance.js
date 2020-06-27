import React, { Component } from "react";
import LoadingBar from "./LoadingBar";
import Input from "../Input/Input";
import File from "../File/File";
import swal from "sweetalert";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request_file } from "../../helpers/Request";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de listas de asistencia
 */
export default class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_passed: "",
      list_fileCreate: null,
      uploadPercentage: 0,
      uploading: false,
      options: {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
      },
    };

    //bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ list_fileCreate: null });
    $("#modalCreateList").modal("toggle");
  }

  async createList() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información de la lista de asistencia",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.list_fileCreate) {
          const data = new FormData();
          data.append("tabla", "list_of_assistences");
          data.append("id_activity", this.props.id_activity);
          data.append("date_passed", this.state.date_passed);
          data.append("file", this.state.list_fileCreate);
          this.setState({ uploading: true });

          const res = await post_request_file(`list`, data);
          if (res.status) {
            this.setState({ uploadPercentage: 100 }, () => {
              setTimeout(() => {
                $("#loadingBar").modal("hide");
                this.setState({ uploadPercentage: 0, uploading: false });
                swal(
                  "¡Listo!",
                  "Se creó la lista de asistencia exitosamente.",
                  "success"
                ).then(() => {
                  this.props.updateSelect();
                  $("#modalCreateList").modal("toggle");
                });
              }, 1000);
            });
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

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.list_fileCreate && this.state.date_passed !== "") {
      this.createList();
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un archivo y una fecha para crear un archivo.",
        "warning"
      );
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreateList"
          onClick={this.show}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreateList" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    Crear nueva lista de asistencia
                  </h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    label="Fecha"
                    type="date"
                    name="date_passed"
                    value={this.state.date_passed}
                    onChange={this.handleChange}
                    idError="listAssistanceDateError"
                    required={true}
                  />
                  <File
                    file={this.state.list_fileCreate}
                    name={"list_fileCreate"}
                    handleChange={this.handleChange}
                    idError={"listFileError"}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.uploading && (
          <LoadingBar uploadPercentage={this.state.uploadPercentage} />
        )}
      </>
    );
  }
}
