import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
// import axios from "axios";
// import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Validator from "../../helpers/Validations";
import Input from "../Input/Input";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo artículo
 */
export default class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      abstract: "",
      authors: "",
      key_words: "",
      magazine: "",
      url: "",
      article_file: null,
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
    this.setState({
      title: "",
      abstract: "",
      authors: "",
      key_words: "",
      magazine: "",
      url: "",
      article_file: null,
    });
    $("#modalCreateArticle").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear el nuevo aval si no se
   * * presentan errores en el título
   */
  async handleSubmit(event) {
    event.preventDefault();
    const titleError = Validator.validateSimpleTextJquery(
      this.state.title,
      "articleTitleError",
      60,
      "textSpecial"
    );

    if (titleError) {
      console.log(this.state);
      //await axios.post(`${API}/network`, network);
      //this.props.getNetworks();
      $("#modalCreateArticle").modal("hide");
      swal("¡Listo!", "Se creó el nuevo artículo exitosamente.", "success");
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
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
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo artículo</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <Input
                      label="Título"
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                      idError="articleTitleError"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Resumen / Abstract"
                      type="text"
                      name="abstract"
                      onChange={this.handleChange}
                      value={this.state.abstract}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Autor (es)"
                      type="text"
                      name="authors"
                      onChange={this.handleChange}
                      value={this.state.authors}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Palabras clave"
                      type="text"
                      name="key_words"
                      onChange={this.handleChange}
                      value={this.state.key_words}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Revista / periódico"
                      type="text"
                      name="magazine"
                      onChange={this.handleChange}
                      value={this.state.magazine}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Dirección web / URL"
                      type="text"
                      name="url"
                      onChange={this.handleChange}
                      value={this.state.url}
                    />
                  </div>
                  <div className="form-group">
                    Adjuntar archivo
                    <File
                      file={this.state.article_file}
                      name={"article_file"}
                      handleChange={this.handleChange}
                    />
                  </div>
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
      </>
    );
  }
}
