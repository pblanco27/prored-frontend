import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un nuevo campus universitario
 */
export default class ModalCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      campus_code: "",
    };

    // Ref
    this.campusNameError = React.createRef();
    this.campusCodeError = React.createRef();

    // todo: darle uso a esta referecias
    this.modalCampus = React.createRef();

    // Bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.show = this.show.bind(this);
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ name: "", campus_code: "" });
    this.campusNameError.current.style.display = "none";
    this.campusCodeError.current.style.display = "none";
    $("#modalCampus").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear el nuevo campus universitario si
   * * no se presentan errores en el nombre y el código ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.campusNameError.current,
      40,
      "textSpecial"
    );

    const codeHasError = Validator.validateSimpleText(
      this.state.campus_code,
      this.campusCodeError.current,
      20,
      "textSpecial"
    );

    if (!nameHasError && !codeHasError) {
      const campus = {
        name: this.state.name,
        code: this.state.campus_code,
      };
      const idCenter = campus.code;
      // todo: cambiar /campus_existe en la backend por get
      const exist = await axios.post(`/campus_exists`, {
        id: idCenter,
      });
      if (!exist.data.campusexists) {
        await axios.post(`/campus`, campus);
        this.props.getCampus();
        $("#modalCampus").modal("hide");
        swal(
          "¡Listo!",
          "Se creó el nuevo campus universitario exitosamente.",
          "success"
        );
      } else {
        swal(
          "¡Atención!",
          "No se creó el nuevo campus debido a que su código ya se encuentra asociado",
          "warning"
        );
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalCampus"
          onClick={this.show}
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>

        <div
          className="modal fade"
          id="modalCampus"
          role="dialog"
          ref={this.modalCampus}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Crear nuevo campus universitario
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="campusCode">Código del campus</label>
                  <input
                    className="form-control"
                    type="text"
                    name="campus_code"
                    value={this.state.campus_code}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.campusCodeError}
                  >
                    hola
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="nombreCampus">Nombre</label>
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
                    ref={this.campusNameError}
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
