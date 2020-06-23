import React, { Component } from "react";
import Input from "../Input/Input";
import {
  handleSimpleInputChange,
  handleCheckInputChange,
} from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el registro de los usuarios del sistema
 */
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname1: "",
      lastname2: "",
      email: "",
      password: "",
      password_confirm: "",
      view_password: false,
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleChecked = handleCheckInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="card">
            <header className="card-header text-center container-title">
              <h4>Registrar usuario</h4>
            </header>
            <center>Los campos marcados con * son requeridos</center>
            <div className="d-lg-flex card-body px-4 d-md-block">
              <div className="w-100">
                <b>Nombre completo</b>
                <Input
                  label="Nombre"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  idError="userNameError"
                  required={true}
                />

                <Input
                  label="Primer Apellido"
                  type="text"
                  name="lastname1"
                  value={this.state.lastname1}
                  onChange={this.handleChange}
                  idError="userLastName1Error"
                  required={true}
                />

                <Input
                  label="Segundo Apellido"
                  type="text"
                  name="lastname2"
                  value={this.state.lastname2}
                  onChange={this.handleChange}
                  idError="userLastName2Error"
                  required={true}
                />
              </div>
              <div className="w-100">
                <b>Información de usuario</b>
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
                  idError="studentPasswordError"
                  required={true}
                />

                <Input
                  label="Confirmar contraseña"
                  type={this.state.view_password ? "text" : "password"}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  onChange={this.handleChange}
                  idError="studentPasswordConfirmError"
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
            onClick={this.handleSubmit}
          >
            Registrar
          </button>
        </div>
      </>
    );
  }
}
