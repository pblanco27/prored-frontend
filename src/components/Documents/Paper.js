import React, { Component } from "react";
import SelectPaper from "../Selects/Paper";
import CreatePaper from "../Modal/CreatePaper";
import LoadingBar from "../Modal/LoadingBar";
import { handleSimpleInputChange } from "../../helpers/Handles";
import File from "../File/File";
import Input from "../Input/Input";
import SelectCountry from "../Selects/Country";
import { paper_type } from "../../helpers/Enums";
import axios from "axios";
import { API } from "../../services/env";
import * as Formatter from "../LinkedStudent/formatInfo";
import swal from "sweetalert";
import $ from "jquery";

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

    //ref
    this.selectPaper = React.createRef();
  }
  handleCountryChange(value) {
    this.handleChange({
      target: {
        name: "country",
        value: value ? value.value : "",
      },
    });
  }
  updateSelectPapers() {
    this.selectPaper.current.getPapers();
    this.setState({
      show: false,
    });
  }
  handlePaperChange(paper) {
    this.setState({ show: false, empty: true });
    if (paper) {
      this.getPaper(paper.value);
    }
  }
  async getPaper(id_paper) {
    const res = await axios.get(`${API}/paper/${id_paper}`);
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
  async handleSubmit() {
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
        await axios.put(`${API}/paper/${this.state.id_paper}`, paperData);
        swal(
          "¡Listo!",
          "Se edito la información de la Ponencia exitosamente.",
          "success"
        ).then(() => {
          this.updateSelectPapers();
        });
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }
  renderFileData() {
    if (this.state.empty) {
      return <h4>No hay archivo asociado</h4>;
    } else {
      return (
        <div className="file-data">
          <div className="file-data">
            <p>Nombre del archivo: {this.state.filename}</p>
          </div>
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
  handleDeletePaperFile() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado se va a borrar el archivo de la Ponencia actual.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        await axios.delete(`${API}/paper/file/${this.state.id_paper}`);
        swal("¡Listo!", "Se eliminó el archivo exitosamente.", "success").then(
          () => {
            this.getPaper(this.state.id_paper);
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
  async updatePaperFile(id_paper, file) {
    const data = new FormData();
    data.append("tabla", "paper");
    data.append("file", file);
    this.setState({ uploading: true });
    if (!this.state.empty) {
      await axios.delete(`${API}/paper/file/${id_paper}`);
    }
    axios
      .post(`${API}/paper/file/${id_paper}`, data, this.state.options)
      .then(() => {
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
        await axios.delete(`${API}/paper/${this.state.id_paper}`);
        swal("Se eliminó la Ponencia exitosamente", {
          title: "¡Atención!",
          icon: "info",
        });
        this.updateSelectPapers();
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className="searchByName__content">
          <div className="searchByName__content-select">
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
          <div className="two-columns">
            <div className="column">
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
              />
              <Input
                label="Fecha"
                type="date"
                name="date"
                onChange={this.handleChange}
                value={this.state.date}
              />
              <Input
                label="Exponente"
                type="text"
                name="speaker"
                onChange={this.handleChange}
                value={this.state.speaker}
              />
              <Input
                label="Lugar"
                type="text"
                name="place"
                onChange={this.handleChange}
                value={this.state.place}
              />
              <div className="form-group">
                <SelectCountry
                  label="País"
                  handleChangeParent={this.handleCountryChange}
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
            <div className="column">
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
