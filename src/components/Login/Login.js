import React, { Component } from "react";
import Input from "../Input/Input";
import PasswordRecovery from "../Modal/PasswordRecovery";
import { login } from "./functions";
import {
  handleSimpleInputChange,
  handleCheckInputChange,
} from "../../helpers/Handles";
import authService from "../../services/AuthService";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el inicio de sesión para ingresar al sistema
 */
export default class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      view_password: false,
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleChecked = handleCheckInputChange.bind(this);
    this.login = login.bind(this);
  }
  
  componentDidMount() {
    this._isMounted = true;
    
    this.props.updateLogged();
    if (authService.isLogged()) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
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
                  type={this.state.view_password ? "text" : "password"}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  idError="userPasswordError"
                  required={true}
                />

                <Input
                  label="Mostrar contraseña"
                  type="checkbox"
                  name="view_password"
                  checked={this.state.view_password}
                  onChange={this.handleChecked}
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
            onClick={this.login}
          >
            Ingresar
          </button>
        </div>
      </>
    );
  }
}
