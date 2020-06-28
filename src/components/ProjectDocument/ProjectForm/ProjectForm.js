import React, { Component } from "react";
import { API } from "../../../services/env";
import swal from "sweetalert";
import $ from "jquery";
import LoadingBar from "../../Modal/LoadingBar";
import File from "../../File/File";
import { handleSimpleInputChange } from "../../../helpers/Handles";
import {
  get_request,
  delete_request,
} from "../../../helpers/Request";
import axios from "axios";

/**
 * * Componente que contiene y muestra la información del formulario
 * * de un determinado proyecto, tanto para creación como visualización
 */
export default class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_project_form: "",
      id_project: "",
      filename: "",
      file_path: "",
      date_created: "",
      empty: true,
      project_form: null,
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
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteProjectForm = this.handleDeleteProjectForm.bind(this);
  }

  componentDidMount() {
    this.getProjectForm();
  }

  async getProjectForm() {
    const res = await get_request(`project_form/${this.props.id_project}`);
    if (res.status) {
      const data = res.data;
      if (data.id_project_form) {
        this.setState({
          ...data,
          empty: false,
          project_form: null,
        });
      } else {
        this.setState({
          empty: true,
          project_form: null,
        });
      }
    }
  }

  renderProjectFormData() {
    if (this.state.empty) {
      return <h4>No hay archivo asociado</h4>;
    } else {
      return (
        <>
          <p>Nombre del archivo: {this.state.filename}</p>
          <p>Subido el: {this.state.date_created}</p>
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
              onClick={this.handleDeleteProjectForm}
            >
              Eliminar
            </button>
          </div>
        </>
      );
    }
  }

  async createProjectForm(id_project, file) {
    const data = new FormData();
    data.append("tabla", "project_form");
    data.append("id_project", id_project);
    data.append("file", file);
    this.setState({ uploading: true });
    if (!this.state.empty) {
      await this.deleteProjectForm(id_project);
    }

    const res = await axios.post(
      `${API}/project_form`,
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
            "Se creó el Formulario de Proyecto exitosamente.",
            "success"
          ).then(() => {
            this.getProjectForm();
          });
        }, 1000);
      });
    }
  }

  async deleteProjectForm(id_project) {
    await delete_request(`project_form/${id_project}`);
  }

  handleSubmit() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado se va a borrar el Formulario de Proyecto anterior (si existe).",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        this.createProjectForm(this.props.id_project, this.state.project_form);
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  async handleDeleteProjectForm(e) {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el Formulario de Proyecto.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(
          `project_form/${this.props.id_project}`
        );
        if (res.status) {
          swal(
            "¡Listo!",
            "Se eliminó el Formulario de Proyecto exitosamente.",
            "success"
          ).then(() => {
            this.getProjectForm();
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

  render() {
    return (
      <div className="w-75 mx-auto">
        <div className="w-100">
          {this.renderProjectFormData()}
          <hr />
          <b>Cargar nuevo documento</b>
          <File
            file={this.state.project_form}
            name={"project_form"}
            handleChange={this.handleChange}
          />
          {this.state.project_form && (
            <button
              className="btn btn-success mb-3"
              onClick={this.handleSubmit}
            >
              Cargar nuevo form
            </button>
          )}
          {this.state.uploading && (
            <LoadingBar uploadPercentage={this.state.uploadPercentage} />
          )}
        </div>
      </div>
    );
  }
}
