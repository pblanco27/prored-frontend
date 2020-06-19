import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Input from "../Input/Input";
import LoadingBar from "./LoadingBar";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un nuevo documento de tipo foto
 */
export default class CreatePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      date_taken: "",
      photo_file: null,
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

  show() {
    this.setState({ photo_file: null });
    $("#modalCreatePhoto").modal("toggle");
  }

  async createPhoto() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado guardará la información de la Foto",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.photo_file) {
          const data = new FormData();
          data.append("tabla", "list_of_assistences");
          data.append("id_activity", this.props.id_activity);
          data.append("date_taken", this.state.date_taken);
          data.append("comment", this.state.comment);
          data.append("file", this.state.photo_file);
          this.setState({ uploading: true });
          axios.post(`${API}/photo/one`, data, this.state.options).then(() => {
            this.setState({ uploadPercentage: 100 }, () => {
              setTimeout(() => {
                $("#loadingBar").modal("hide");
                this.setState({ uploadPercentage: 0, uploading: false });
                swal(
                  "¡Listo!",
                  "Se creó la foto exitosamente.",
                  "success"
                ).then(() => {
                  this.props.updateSelect();
                  $("#modalCreatePhoto").modal("toggle");
                });
              }, 1000);
            });
          });
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
    if (this.state.photo_file && this.state.date_taken !== "") {
      this.createPhoto();
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un archivo y una fecha para crear la foto.",
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
          data-target="#modalCreatePhoto"
          onClick={this.show}
        >
          Crear foto <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreatePhoto" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nueva foto</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    label="Fecha"
                    type="date"
                    name="date_taken"
                    value={this.state.date_taken}
                    onChange={this.handleChange}
                    idError="photoDateError"
                    required={true}
                  />
                  <Input
                    label="Comentario"
                    type="textarea"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleChange}
                    idError="photoCommentError"
                  />
                  <File
                    file={this.state.photo_file}
                    name={"photo_file"}
                    handleChange={this.handleChange}
                    idError={"listFileError"}
                    image={true}
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
