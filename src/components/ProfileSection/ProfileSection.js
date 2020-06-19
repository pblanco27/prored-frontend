import React, { Component } from "react";
import Input from "../Input/Input";
import swal from "sweetalert";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para el manejo del perfil de los estudiantes vinculados
 */
export default class ProfileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStatusColor: this.props.status ? "btn-danger" : "btn-success",
      btnStatusText: this.props.status
        ? "Inactivar Estudiante"
        : "Activar Estudiante",
    };
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
  }

  handleToggleStatus(event) {
    let confirmMsg =
      "Una vez ejecutado activará al vinculado en todo el sistema";
    if (this.props.status) {
      confirmMsg =
        "Una vez ejecutado desactivará al vinculado en todo el sistema";
    }

    swal({
      title: "¡Atención!",
      text: confirmMsg,
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then((willConfirm) => {
      if (willConfirm) {
        if (this.props.status) {
          this.setState({
            btnStatusColor: "btn-success",
            btnStatusText: "Activar Estudiante",
          });
        } else {
          this.setState({
            btnStatusColor: "btn-danger",
            btnStatusText: "Inactivar Estudiante",
          });
        }
        this.props.toggleDisable();
      } else {
        swal("El estado del vinculado se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Sección de vinculación</h4>
          </header>
          <center>Los campos marcados con * son requeridos</center>
          <div className="card-body w-100 mx-auto">
            <Input
              label="Perfil del estudiante: "
              type="select"
              name="profile"
              value={this.props.profile}
              onChange={this.props.handleChange}
              options={this.props.profiles}
              disable={this.props.disable}
            />

            {this.props.edit && (
              <div className="text-center">
                <button
                  className={`btn ${this.state.btnStatusColor}`}
                  onClick={this.handleToggleStatus}
                  disabled={this.props.disable}
                >
                  {this.state.btnStatusText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
