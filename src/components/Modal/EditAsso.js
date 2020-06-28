import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { put_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de una carrera asociada
 */
export default class EditAsso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    // bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // ref
    this.assoEditNameError = React.createRef();
  }

  /**
   * * Función que valida si el componente debe mostrarse, dependiendo
   * * de las propiedades que le entran por parámetro. En este caso el
   * * id de la carrera asociada debe estar definido.
   */
  validateShow() {
    if (this.props.id_asso !== 0) {
      this.setState({ name: this.props.asso_name });
      this.assoEditNameError.current.style.display = "none";
      $("#modalAssoEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una carrera asociada de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de editar la carrera asociada si no se presentan
   * * errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.assoEditNameError.current,
      40,
      "textSpecial"
    );
    if (!nameError) {
      const assocareer = { name: this.state.name };
      const res = await put_request(
        `associated_career/${this.props.id_asso}`,
        assocareer
      );
      if (res.status) {
        this.props.getAssoCareers(this.props.id_center);
        $("#modalAssoEdit").modal("hide");
        swal(
          "¡Listo!",
          "Se editó la carrera asociada exitosamente.",
          "success"
        );
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-info btn-md"
          data-target="#modalAssoEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalAssoEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar carrera asociada</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Escriba el nuevo nombre de la carrera</p>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id="nombreAsso"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.assoEditNameError}
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
