import React, { Component } from "react";
import { API } from "../../../services/env";
import swal from "sweetalert";
import $ from "jquery";
import SelectPaper from "../../Selects/Paper";
import SelectCountry from "../../Selects/Country";
import CreatePaper from "../../Modal/CreatePaper";
import LoadingBar from "../../Modal/LoadingBar";
import File from "../../File/File";
import Input from "../../Input/Input";
import { paper_type } from "../../../helpers/Enums";
import { handleSimpleInputChange } from "../../../helpers/Handles";
import { createPaperObject, validatePaperEdit } from "./validatePaper";
import * as Formatter from "../../LinkedStudent/formatInfo";
import {
  delete_request,
  get_request,
  put_request,
} from "../../../helpers/Request";
import axios from "axios";

/**
 * * Componente que contiene y muestra la información de las ponencias
 * * de un determinado proyecto, tanto para creación como visualización
 */
export default class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_project: parseInt(this.props.id_project),
      name: "",
      type: "",
      date: "",
      speaker: "",
      place: "",
      country: "",
      paper_file: null,
      show: false,
      empty: true,
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
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.updateSelectPapers = this.updateSelectPapers.bind(this);
    this.handlePaperChange = this.handlePaperChange.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeletePaperFile = this.handleDeletePaperFile.bind(this);
    this.handleUpdatePaperFile = this.handleUpdatePaperFile.bind(this);
    this.handleDeletePaper = this.handleDeletePaper.bind(this);
    this.createPaperObject = createPaperObject.bind(this);

    //ref
    this.selectPaper = React.createRef();
  }

  updateSelectPapers() {
    this.selectPaper.current.getPapers();
    this.setState({
      show: false,
    });
  }

  async updatePaperFile(id_paper, file) {
    const data = new FormData();
    data.append("tabla", "paper");
    data.append("file", file);
    this.setState({ uploading: true });
    if (!this.state.empty) {
      await delete_request(`paper/file/${id_paper}`);
    }

    const res = await axios.post(
      `${API}/paper/file/${id_paper}`,
      data,
      this.state.options
    );
    if (res.status === 200) {
      this.setState({ uploadPercentage: 100 }, () => {
        setTimeout(() => {
          $("#loadingBar").modal("hide");
          this.setState({ uploadPercentage: 0, uploading: false });
          swal(
            "¡Listo!",
            "Se creó el archivo de la Ponencia exitosamente.",
            "success"
          ).then(() => {
            this.getPaper(id_paper);
          });
        }, 1000);
      });
    }
  }

  async getPaper(id_paper) {
    const res = await get_request(`paper/${id_paper}`);
    if (res.status) {
      const paper = res.data;
      this.setState({ empty: true });
      if (paper.filename) {
        this.setState({ empty: false });
      }

      const country_selected = Formatter.formatCountry(paper.country);

      this.setState({
        ...paper,
        name: paper.paper_name,
        date: paper.date_assisted,
        show: true,
        paper_file: null,
        country_selected,
      });
    }
  }

  renderFileData() {
    if (this.state.empty) {
      return <h4>No hay archivo asociado</h4>;
    } else {
      return (
        <div>
          <p>Nombre del archivo: {this.state.filename}</p>

          <div className="btn-container">
            <a
              className="btn btn-info"
              href={`${API}/${this.state.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Documento
            </a>
            <button
              className="btn btn-danger"
              onClick={this.handleDeletePaperFile}
            >
              Eliminar
            </button>
          </div>
        </div>
      );
    }
  }

  handlePaperChange(paper) {
    this.setState({ show: false, empty: true });
    if (paper) {
      this.getPaper(paper.value);
    }
  }

  handleCountryChange(value) {
    this.handleChange({
      target: {
        name: "country",
        value: value ? value.value : "",
      },
    });
  }

  handleDeletePaperFile() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado se va a borrar el archivo de la Ponencia actual.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`paper/file/${this.state.id_paper}`);
        if (res.status) {
          swal(
            "¡Listo!",
            "Se eliminó el archivo exitosamente.",
            "success"
          ).then(() => {
            this.getPaper(this.state.id_paper);
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

  handleUpdatePaperFile() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el archivo anterior (si existe).",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        this.updatePaperFile(this.state.id_paper, this.state.paper_file);
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  handleDeletePaper() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar la Ponencia del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`paper/${this.state.id_paper}`);
        if (res.status) {
          swal("Se eliminó la Ponencia exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.updateSelectPapers();
        }
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  async updatePaper() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información de la Ponencia de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const paperData = {
          paper_name: this.state.name,
          type: this.state.type,
          date_assisted: this.state.date,
          speaker: this.state.speaker,
          place: this.state.place,
          country: this.state.country,
        };
        const res = await put_request(
          `paper/${this.state.id_paper}`,
          paperData
        );
        if (res.status) {
          swal(
            "¡Listo!",
            "Se edito la información de la Ponencia exitosamente.",
            "success"
          ).then(() => {
            this.updateSelectPapers();
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

  handleSubmit() {
    if (validatePaperEdit(this.createPaperObject())) {
      this.updatePaper();
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
        <div className="d-flex card-body px-4 justify-content-center align-items-center w-75 mx-auto">
          <div className="w-100 mr-2">
            <SelectPaper
              id_project={this.props.id_project}
              ref={this.selectPaper}
              handleChangeParent={this.handlePaperChange}
            />
          </div>
          <CreatePaper
            id_project={this.props.id_project}
            updateSelect={this.updateSelectPapers}
          />
        </div>

        {this.state.show && (
          <div className="d-lg-flex card-body px-4 d-md-block">
            <div className="w-100">
              <Input
                label="Nombre"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                idError="paperNameError"
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
                idError="paperTypeError"
              />
              <Input
                label="Fecha"
                type="date"
                name="date"
                onChange={this.handleChange}
                value={this.state.date}
                idError="paperDateError"
                required={true}
              />
              <Input
                label="Exponente"
                type="text"
                name="speaker"
                onChange={this.handleChange}
                value={this.state.speaker}
                idError="paperSpeakerError"
              />
              <Input
                label="Lugar"
                type="text"
                name="place"
                onChange={this.handleChange}
                value={this.state.place}
                idError="paperPlaceError"
              />
              <div className="form-group">
                <SelectCountry
                  label="País"
                  handleChangeParent={this.handleCountryChange}
                  idError="paperCountryError"
                  required={true}
                  value={this.state.country_selected}
                />
              </div>
              <div className="center-btn">
                <button className="btn btn-info" onClick={this.handleSubmit}>
                  Actualizar información
                </button>
              </div>
            </div>
            <div className="w-100">
              {this.renderFileData()}
              <hr />
              <b>Cargar nuevo documento</b>
              <File
                file={this.state.paper_file}
                name={"paper_file"}
                handleChange={this.handleChange}
              />
              {this.state.paper_file && (
                <div className="center-btn">
                  <button
                    className="btn btn-success"
                    onClick={this.handleUpdatePaperFile}
                  >
                    Cargar nuevo archivo
                  </button>
                </div>
              )}
              <hr />
              <div className="center-btn">
                <button
                  className="btn btn-danger"
                  onClick={this.handleDeletePaper}
                >
                  Eliminar Ponencia
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.uploading && (
          <LoadingBar uploadPercentage={this.state.uploadPercentage} />
        )}
      </>
    );
  }
}
