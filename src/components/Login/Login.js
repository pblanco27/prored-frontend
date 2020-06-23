import React, { Component } from "react";
import Input from "../Input/Input";
import { handleSimpleInputChange } from "../../helpers/Handles";
import PasswordRecovery from '../Modal/PasswordRecovery';

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el inicio de sesión para ingresar al sistema
 */
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="card mx-auto w-100 login">
            <header className="card-header text-center container-title">
              <h4>Iniciar sesión</h4>
            </header>
            <center>Los campos marcados con * son requeridos</center>
            <div className="d-lg-flex card-body px-4 d-md-block">
              <div className="w-100">
                <Input
                  label="Correo electrónico"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  idError="userEmailError"
                  required={true}
                />

                <Input
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  idError="userPasswordError"
                  required={true}
                />
                
                <PasswordRecovery />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 mb-3">
          <button
            type="submit"
            className="btn btn-lg btn-success"
            onClick={this.handleSubmit}
          >
            Ingresar
          </button>
        </div>
      </>
    );
  }
}
