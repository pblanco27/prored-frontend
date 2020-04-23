import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la creación de una nueva red
*/

export default class ModalRed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
    };
    this.show = this.show.bind(this);
  }

  /*
        Función que muestra el componente y limpia las variables
        del estado, así como los mensajes de error correspondientes 
    */
  show() {
    this.setState({ name: "" });
    $("#networkNameError").hide();
    $("#networkTypeError").hide();
    $("#modalRed").modal("toggle");
  }

  /*
        Función que valida el formato del nombre ingresado
        por medio de una expresión regular
    */
  async validateField(value, element_id) {
    var error = "";
    const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
    if (value === "") {
      error = "Este campo no puede ir vacío";
    } else if (value.length > 40) {
      error = "Este campo puede tener un máximo de 40 caracteres";
    } else if (!reg.test(value)) {
      error =
        "Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()";
    }
    $(element_id).text(error);
    if (error !== "") $(element_id).show();
    else $(element_id).hide();
    this.setState({ hasError: error !== "" });
  }

  /*
        Función que valida que el select o combo box tenga
        una opción debidamente seleccionada
    */
  async validateSelect(value, element_id) {
    var error = "";
    if (value === "") {
      error = "Debe seleccionar una opción de la lista";
    }
    $(element_id).text(error);
    if (error !== "") $(element_id).show();
    else $(element_id).hide();
    this.setState({ hasError: error !== "" });
  }

  /*
        Función que asigna el nombre ingresado en la 
        variable correspondiente del estado
    */
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  /*
        Función que asigna el tipo seleccionado en la 
        variable correspondiente del estado
    */
  handleChangeType = (event) => {
    this.setState({ type: event.target.value });
  };

  /*
        Función que maneja el envío del formulario.
        Se encarga de crear la nueva red si no se
        presentan errores en el nombre y tipo seleccionado.
    */
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.validateField(this.state.name, "#networkNameError");
    const nameError = this.state.hasError;
    await this.validateSelect(this.state.type, "#networkTypeError");
    const typeError = this.state.hasError;
    if (!nameError && !typeError) {
      const network = {
        name: this.state.name,
        type: this.state.type,
      };
      await axios.post(`/network`, network);
      this.setState({ name: "" });
      this.props.getNetwork();
      $("#modalRed").modal("hide");
      swal("¡Listo!", "Se creó la nueva red exitosamente.", "success");
    }
  };

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalRed"
          onClick={this.show}
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalRed" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            {" "}
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva red</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="tipoRed">Tipo de red</label>
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChangeType}
                  >
                    <option className="select-cs" value="" defaultValue>
                      Seleccione la red
                    </option>
                    <option value="Municipalidad">Municipalidad</option>
                    <option value="ONG">ONG</option>
                    <option value="Asociaciones">Asociaciones</option>
                    <option value="Grupo Artístico">Grupo Artístico</option>
                  </select>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="networkTypeError"
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="nombreRed">Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    id="nombreRed"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="networkNameError"
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Crear"
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
