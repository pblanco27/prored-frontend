import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Validator from "../../helpers/Validations";
import Input from "../Input/Input";
import { endorsement_type } from "../../helpers/Enums";
import LoadingBar from "./LoadingBar";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo aval
 */
export default class CreateEndorsement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Interno",
      endorsement_fileCreate: null,
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
    this.setState({ endorsement_fileCreate: null });
    $("#modalCreateEndorsement").modal("toggle");
  }

  async createEndorsement() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información del Aval de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.endorsement_fileCreate) {
          console.log('creando')
          const data = new FormData();
          data.append("tabla", "article");
          data.append("id_project", this.props.id_project);
          data.append("endorsement_type", this.state.type);
          data.append("file", this.state.endorsement_fileCreate);
          this.setState({ uploading: true });
          axios
            .post(`${API}/endorsement`, data, this.state.options)
            .then(() => {
              this.setState({ uploadPercentage: 100 }, () => {
                setTimeout(() => {
                  $("#loadingBar").modal("hide");
                  this.setState({ uploadPercentage: 0, uploading: false });
                  swal(
                    "¡Listo!",
                    "Se creó el Aval exitosamente.",
                    "success"
                  ).then(() => {
                    this.props.updateSelect();
                    $("#modalCreateEndorsement").modal("toggle");
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
    this.createEndorsement();
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreateEndorsement"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreateEndorsement" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo aval</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    label="Tipo de aval"
                    type="select"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    options={endorsement_type}
                    disable={this.props.disable}
                  />
                  <File
                    file={this.state.endorsement_fileCreate}
                    name={"endorsement_fileCreate"}
                    handleChange={this.handleChange}
                    idError={"endorsementFileError"}
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
