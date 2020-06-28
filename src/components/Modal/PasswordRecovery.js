import React, { Component } from "react";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request } from "../../helpers/Request";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la solicitud de recuperación de contraseña
 */
export default class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    //bind
    this.show = this.show.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);

    //ref
    this.emailError = React.createRef();
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ email: "" });
    this.emailError.current.style.display = "none";
    $("#modalPassword").modal("toggle");
  }

  async handleSubmit(event) {
    event.preventDefault();
    const emailError = Validator.validateSimpleText(
      this.state.email,
      this.emailError.current,
      40,
      "email"
    );
    if (!emailError) {
      const res = await post_request(`forgotPassword`, this.state);
      if (res.status) {
        const email_sent = res.data.emailSent;
        if (email_sent) {
          $("#modalPassword").modal("hide");
          swal(
            "¡Listo!",
            "Se envió el correo exitosamente. Verifique su buzón.",
            "success"
          );
        } else {
          swal(
            "¡Atención!",
            "El correo ingresado no tiene una cuenta asociada.",
            "info"
          );
        }
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <div className="d-flex justify-content-center mt-1">
          <button
            type="button"
            className="btn btn-link"
            data-target="#modalPassword"
            onClick={this.show}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="modal fade" id="modalPassword" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Recuperar contraseña</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Escriba su correo electrónico a continuación.<br></br>
                  <br></br>
                  En caso de existir una cuenta de usuario asociada a dicho
                  correo, se le enviará un link a esta dirección, desde el cual
                  puede asignar una nueva contraseña.
                </p>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.emailError}
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
