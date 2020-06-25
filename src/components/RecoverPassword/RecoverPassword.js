import React, { Component } from "react";
import Input from "../Input/Input";
import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";
import {
  handleSimpleInputChange,
  handleCheckInputChange,
} from "../../helpers/Handles";
import { validatePassword, resetPassword } from "./functions";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el reestablecimiento de contraseña de un usuario del sistema
 */
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_user: "",
      email: "",
      new_password: "",
      password_confirm: "",
      view_password: false,
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleChecked = handleCheckInputChange.bind(this);
    this.validatePassword = validatePassword.bind(this);
    this.resetPassword = resetPassword.bind(this);
  }

  async componentDidMount() {
    const token = this.props.match.params.token;
    const res = await axios.post(`${API}/validatePasswordToken`, {
      reset_password_token: token,
    });
    if (res.data) {
      const id_user = res.data.id_user;
      const email = res.data.email;
      this.setState({ id_user, email });
    } else {
      swal(
        "¡Atención!",
        "Esta dirección es inválida o ya expiró.",
        "info"
      ).then(() => {
        this.props.history.push(`/iniciar-sesion`);
      });
    }
  }

  passwordFormat() {
    return `La contraseña debe contener:
    • Al menos 1 mayúscula
    • Al menos 1 minúscula
    • Al menos 1 número
    • Mínimo 8 caracteres
    • Máximo 40 caracteres`;
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="card mx-auto w-100 login">
            <header className="card-header text-center container-title">
              <h4>Reestablecer contraseña</h4>
            </header>
            <center>Los campos marcados con * son requeridos</center>
            <div className="d-lg-flex card-body px-4 d-md-block">
              <div className="w-100">
                <Input
                  label={
                    <span title={this.passwordFormat()}>
                      Nueva contraseña{" "}
                      <i className="fas fa-question-circle"></i>
                    </span>
                  }
                  type={this.state.view_password ? "text" : "password"}
                  name="new_password"
                  value={this.state.new_password}
                  onChange={this.handleChange}
                  idError="userNewPasswordError"
                  required={true}
                />

                <Input
                  label="Confirmar contraseña"
                  type={this.state.view_password ? "text" : "password"}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  onChange={this.handleChange}
                  idError="userPasswordConfirmError"
                  required={true}
                />

                <Input
                  label="Mostrar contraseña"
                  type="checkbox"
                  name="view_password"
                  checked={this.state.view_password}
                  onChange={this.handleChecked}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 mb-3">
          <button
            type="submit"
            className="btn btn-lg btn-success"
            onClick={this.resetPassword}
          >
            Reestablecer
          </button>
        </div>
      </>
    );
  }
}
