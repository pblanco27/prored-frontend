import React, { Component } from "react";
import LoadingBar from "./LoadingBar";
import Input from "../Input/Input";
import File from "../File/File";
import swal from "sweetalert";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request_file, post_request } from "../../helpers/Request";
import { paper_type } from "../../helpers/Enums";
import SelectCountry from "../Selects/Country";
import {
  createPaperObject,
  validatePaperCreate,
} from "../ProjectDocument/Paper/validatePaper";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo ponencia
 */
export default class CreatePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_project: parseInt(this.props.id_project),
      name: "",
      type: "Ponente",
      date: "",
      speaker: "",
      place: "",
      country: "",
      paper_fileCreate: null,
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
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.createPaperObject = createPaperObject.bind(this);
  }

  show() {
    this.setState({
      name: "",
      type: "Ponente",
      date: "",
      speaker: "",
      place: "",
      country: "",
      paper_fileCreate: null,
    });
    $("#modalCreatePaper").modal("toggle");
  }

  async createPaperWithFile() {
    const data = new FormData();
    data.append("tabla", "paper");
    data.append("id_project", this.state.id_project);
    data.append("paper_name", this.state.name);
    data.append("type", this.state.type);
    data.append("date_assisted", this.state.date);
    data.append("speaker", this.state.speaker);
    data.append("place", this.state.place);
    data.append("country", this.state.country);
    data.append("file", this.state.paper_fileCreate);
    this.setState({ uploading: true });

    const res = await post_request_file(`paper`, data);
    if (res.status) {
      this.setState({ uploadPercentage: 100 }, () => {
        setTimeout(() => {
          $("#loadingBar").modal("hide");
          this.setState({ uploadPercentage: 0, uploading: false });
          swal("¡Listo!", "Se creó la Ponencia exitosamente.", "success").then(
            () => {
              this.props.updateSelect();
              $("#modalCreatePaper").modal("toggle");
            }
          );
        }, 1000);
      });
    }
  }

  async createPaper() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información de la Ponencia de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.paper_fileCreate) {
          this.createPaperWithFile();
        } else {
          const paper = {
            paper_name: this.state.name,
            type: this.state.type,
            date_assisted: this.state.date,
            speaker: this.state.speaker,
            place: this.state.place,
            country: this.state.country,
            id_project: this.state.id_project,
          };

          const res = await post_request(`paper/nofile`, paper);
          if (res.status) {
            swal(
              "¡Listo!",
              "Se creó la Ponencia exitosamente.",
              "success"
            ).then(() => {
              this.props.updateSelect();
              $("#modalCreatePaper").modal("toggle");
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

  handleCountryChange(value) {
    this.handleChange({
      target: {
        name: "country",
        value: value ? value.value : "",
      },
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (validatePaperCreate(this.createPaperObject())) {
      this.createPaper();
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreatePaper"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreatePaper" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered my-modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nueva ponencia</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    label="Nombre"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    idError="paperNameCreateError"
                    required={true}
                  />
                  <Input
                    label="Tipo de ponencia"
                    type="select"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    options={paper_type}
                    disable={this.props.disable}
                    idError="paperTypeCreateError"
                  />
                  <Input
                    label="Fecha"
                    type="date"
                    name="date"
                    onChange={this.handleChange}
                    value={this.state.date}
                    idError="paperDateCreateError"
                    required={true}
                  />
                  <Input
                    label="Exponente"
                    type="text"
                    name="speaker"
                    onChange={this.handleChange}
                    value={this.state.speaker}
                    idError="paperSpeakerCreateError"
                  />
                  <Input
                    label="Lugar"
                    type="text"
                    name="place"
                    onChange={this.handleChange}
                    value={this.state.place}
                    idError="paperPlaceCreateError"
                  />
                  <div className="form-group">
                    <SelectCountry
                      label="País"
                      handleChangeParent={this.handleCountryChange}
                      value={this.state.country}
                      idError="paperCountryCreateError"
                      required={true}
                    />
                  </div>
                  <b>Adjuntar archivo</b>
                  <File
                    file={this.state.paper_fileCreate}
                    name={"paper_fileCreate"}
                    handleChange={this.handleChange}
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
