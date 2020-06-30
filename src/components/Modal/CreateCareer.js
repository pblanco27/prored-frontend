import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva carrera
 */
export default class CreateCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      degree: "",
    };

    // bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // ref
    this.careerCodeError = React.createRef();
    this.careerDegreeError = React.createRef();
    this.careerNameError = React.createRef();
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ name: "" });

    this.careerDegreeError.current.style.display = "none";
    this.careerNameError.current.style.display = "none";
    $("#modalCareer").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la carrera universitaria si
   * * no se presentan errores en el nombre, código y grado seleccionado.
   */
  async handleSubmit(event) {
    event.preventDefault();

    const degreeError = Validator.validateSimpleSelect(
      this.state.degree,
      this.careerDegreeError.current
    );

    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.careerNameError.current,
      100,
      "textSpecial"
    );

    if (!nameError && !degreeError) {
      const career = {
        name: this.state.name,
        degree: this.state.degree,
      };
      const res = await post_request(`career`, career);
      if (res.status) {
        this.props.getCareers();
        $("#modalCareer").modal("hide");
        swal("¡Listo!", "Se creó la nueva carrera exitosamente.", "success");
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCareer"
          onClick={this.show}
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalCareer" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva carrera</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="degree">Grado académico</label>
                  <select
                    className="form-control"
                    id="degree"
                    name="degree"
                    onChange={this.handleChange}
                  >
                    <option className="select-cs" value="default" defaultValue>
                      Seleccione un grado
                    </option>
                    <option value="Diplomado">Diplomado</option>
                    <option value="Bachillerato">Bachillerato</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                  </select>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.careerDegreeError}
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
                    ref={this.careerNameError}
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
