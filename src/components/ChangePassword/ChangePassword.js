import React, { Component } from "react";
import Input from "../Input/Input";
import {
  handleSimpleInputChange,
  handleCheckInputChange,
} from "../../helpers/Handles";
import { validatePassword, changePassword } from "./functions";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el cambio de contraseña de los usuarios del sistema
 */
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
      password_confirm: "",
      view_password: false,
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleChecked = handleCheckInputChange.bind(this);
    this.validatePassword = validatePassword.bind(this);
    this.changePassword = changePassword.bind(this);
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
              <h4>Cambiar contraseña</h4>
            </header>
            <center>Los campos marcados con * son requeridos</center>
            <div className="d-lg-flex card-body px-4 d-md-block">
              <div className="w-100">
                <Input
                  label="Contraseña actual"
                  type={this.state.view_password ? "text" : "password"}
                  name="old_password"
                  value={this.state.old_password}
                  onChange={this.handleChange}
                  idError="userOldPasswordError"
                  required={true}
                />

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
            onClick={this.changePassword}
          >
            Cambiar
          </button>
        </div>
      </>
    );
  }
}
