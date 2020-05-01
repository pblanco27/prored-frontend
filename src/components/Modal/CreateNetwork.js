import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Validator from "../../helpers/Validations";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva red
 */
export default class CreateNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
    };

    //bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //ref
    this.networkNameError = React.createRef();
    this.networkTypeError = React.createRef();
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ name: "" });
    this.networkNameError.current.style.display = "none";
    this.networkTypeError.current.style.display = "none";
    $("#modalRed").modal("toggle");
  }

  /**
   * * Función que valida que el select o combo box tenga
   * * una opción debidamente seleccionada
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

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la nueva red si no se
   * * presentan errores en el nombre y tipo seleccionado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.networkNameError.current,
      40,
      "textSpecial"
    );

    const typeError = Validator.validateSimpleSelect(
      this.state.type,
      this.networkTypeError.current
    );

    if (!nameError && !typeError) {
      const network = {
        name: this.state.name,
        type: this.state.type,
      };
      await axios.post(`/network`, network);
      this.props.getNetwork();
      $("#modalRed").modal("hide");
      swal("¡Listo!", "Se creó la nueva red exitosamente.", "success");
    }
  }

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
                  <label htmlFor="type">Tipo de red</label>
                  <select
                    className="form-control"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
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
                    style={{ fontSize: 12 }}
                    ref={this.networkTypeError}
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.networkNameError}
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
