import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Input from "../Input/Input";
// import Validator from "../../helpers/Validations";
import LoadingBar from "./LoadingBar";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo artículo
 */
export default class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_project: parseInt(this.props.id_project),
      title: "",
      abstract: "",
      authors: "",
      key_words: "",
      magazine: "",
      url: "",
      article_fileCreate: null,
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
    this.setState({
      title: "",
      abstract: "",
      authors: "",
      key_words: "",
      magazine: "",
      url: "",
      article_fileCreate: null,
    });
    $("#modalCreateArticle").modal("toggle");
  }

  createArticleWithFile() {
    const data = new FormData();
    data.append("tabla", "article");
    data.append("id_project", this.state.id_project);
    data.append("title", this.state.title);
    data.append("abstract", this.state.abstract);
    data.append("authors", this.state.authors);
    data.append("key_words", this.state.key_words);
    data.append("magazine", this.state.magazine);
    data.append("url", this.state.url);
    data.append("file", this.state.article_fileCreate);
    this.setState({ uploading: true });
    axios.post(`${API}/article`, data, this.state.options).then(() => {
      this.setState({ uploadPercentage: 100 }, () => {
        setTimeout(() => {
          $("#loadingBar").modal("hide");
          this.setState({ uploadPercentage: 0, uploading: false });
          swal("¡Listo!", "Se creó el articulo exitosamente.", "success").then(
            () => {
              this.props.updateSelect();
              $("#modalCreateArticle").modal("toggle");
            }
          );
        }, 1000);
      });
    });
  }

  async createArticle() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información del articulo de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.article_fileCreate) {
          this.createArticleWithFile();
        } else {
          await axios.post(`${API}/article/nofile`, this.state);
          swal("¡Listo!", "Se creó el articulo exitosamente.", "success").then(
            () => {
              this.props.updateSelect();
              $("#modalCreateArticle").modal("toggle");
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

  async handleSubmit(event) {
    event.preventDefault();
    this.createArticle();
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreateArticle"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreateArticle" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered my-modal-dialog ">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo artículo</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Input
                    label="Título"
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    idError="articleTitleError"
                    required={true}
                  />
                  <Input
                    label="Resumen / Abstract"
                    type="text"
                    name="abstract"
                    onChange={this.handleChange}
                    value={this.state.abstract}
                  />
                  <Input
                    label="Autor (es)"
                    type="text"
                    name="authors"
                    onChange={this.handleChange}
                    value={this.state.authors}
                  />
                  <Input
                    label="Palabras clave"
                    type="text"
                    name="key_words"
                    onChange={this.handleChange}
                    value={this.state.key_words}
                  />
                  <Input
                    label="Revista / periódico"
                    type="text"
                    name="magazine"
                    onChange={this.handleChange}
                    value={this.state.magazine}
                  />
                  <Input
                    label="Dirección web / URL"
                    type="text"
                    name="url"
                    onChange={this.handleChange}
                    value={this.state.url}
                  />
                  <b> Adjuntar archivo</b>
                  <File
                    file={this.state.article_fileCreate}
                    name={"article_fileCreate"}
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
