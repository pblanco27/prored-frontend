import React, { Component } from "react";
import { API } from "../../../services/env";
import swal from "sweetalert";
import $ from "jquery";
import SelectArticle from "../../Selects/Article";
import CreateArticle from "../../Modal/CreateArticle";
import LoadingBar from "../../Modal/LoadingBar";
import Input from "../../Input/Input";
import File from "../../File/File";
import { createArticleObject, validateArticleEdit } from "./ValidateArticle";
import { handleSimpleInputChange } from "../../../helpers/Handles";
import {
  get_request,
  delete_request,
  put_request,
} from "../../../helpers/Request";
import axios from "axios";

/**
 * * Componente que contiene y muestra la información de los artículos
 * * de un determinado proyecto, tanto para creación como visualización
 */
export default class Article extends Component {
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
      article_file: null,
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
    this.updateSelectArticles = this.updateSelectArticles.bind(this);
    this.handleArticleChange = this.handleArticleChange.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteArticleFile = this.handleDeleteArticleFile.bind(this);
    this.handleUpdateArticleFile = this.handleUpdateArticleFile.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.createArticleObject = createArticleObject.bind(this);

    //ref
    this.selectArticle = React.createRef();
  }

  updateSelectArticles() {
    this.selectArticle.current.getArticles();
    this.setState({
      show: false,
    });
  }

  async getArticle(id_article) {
    const res = await get_request(`article/${id_article}`);
    if (res.status) {
      const article = res.data;
      this.setState({ empty: true });
      if (article.filename) {
        this.setState({ empty: false });
      }

      this.setState({
        ...article,
        show: true,
        article_file: null,
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
              onClick={this.handleDeleteArticleFile}
            >
              Eliminar
            </button>
          </div>
        </div>
      );
    }
  }

  handleArticleChange(article) {
    this.setState({ show: false, empty: true });
    if (article) {
      this.getArticle(article.value);
    }
  }

  handleDeleteArticleFile() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el archivo del Artículo actual.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(
          `article/file/${this.state.id_article}`
        );
        if (res.status) {
          swal(
            "¡Listo!",
            "Se eliminó el archivo del Artículo exitosamente.",
            "success"
          ).then(() => {
            this.getArticle(this.state.id_article);
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

  handleUpdateArticleFile() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el archivo anterior (si existe).",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        this.updateArticleFile(this.state.id_article, this.state.article_file);
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  handleDeleteArticle() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el Artículo del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`article/${this.state.id_article}`);
        if (res.status) {
          swal("Se eliminó el Artículo exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.updateSelectArticles();
        }
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  async updateArticleFile(id_article, file) {
    const data = new FormData();
    data.append("tabla", "article");
    data.append("file", file);
    this.setState({ uploading: true });
    if (!this.state.empty) {
      await delete_request(`article/file/${this.state.id_article}`);
    }

    const res = await axios.post(
      `${API}/article/file/${id_article}`,
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
            "Se creó el archivo del Artículo exitosamente.",
            "success"
          ).then(() => {
            this.getArticle(id_article);
          });
        }, 1000);
      });
    }
  }

  async editArticle() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información del Artículo de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const articleData = this.createArticleObject();
        const res = await put_request(
          `article/${this.state.id_article}`,
          articleData
        );
        if (res.status) {
          swal(
            "¡Listo!",
            "Se edito la información del Artículo exitosamente.",
            "success"
          ).then(() => {
            this.updateSelectArticles();
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

  async handleSubmit() {
    if (validateArticleEdit(this.createArticleObject())) {
      this.editArticle();
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
            <SelectArticle
              id_project={this.props.id_project}
              ref={this.selectArticle}
              handleChangeParent={this.handleArticleChange}
            />
          </div>
          <CreateArticle
            id_project={this.props.id_project}
            updateSelect={this.updateSelectArticles}
          />
        </div>
        {this.state.show && (
          <div className="d-lg-flex card-body px-4 d-md-block">
            <div className="w-100">
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
                idError="articleAbstractError"
              />
              <Input
                label="Autor (es)"
                type="text"
                name="authors"
                onChange={this.handleChange}
                value={this.state.authors}
                idError="articleAuthorsError"
              />
              <Input
                label="Palabras clave"
                type="text"
                name="key_words"
                onChange={this.handleChange}
                value={this.state.key_words}
                idError="articleKeyWordsError"
              />
              <Input
                label="Revista / periódico"
                type="text"
                name="magazine"
                onChange={this.handleChange}
                value={this.state.magazine}
                idError="articleMagazineError"
              />
              <Input
                label="Dirección web / URL"
                type="text"
                name="url"
                onChange={this.handleChange}
                value={this.state.url}
                idError="articleUrlError"
              />
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
                file={this.state.article_file}
                name={"article_file"}
                handleChange={this.handleChange}
              />
              {this.state.article_file && (
                <div className="center-btn">
                  <button
                    className="btn btn-success"
                    onClick={this.handleUpdateArticleFile}
                  >
                    Cargar nuevo articulo
                  </button>
                </div>
              )}
              <hr />
              <div className="center-btn">
                <button
                  className="btn btn-danger"
                  onClick={this.handleDeleteArticle}
                >
                  Eliminar Articulo
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
