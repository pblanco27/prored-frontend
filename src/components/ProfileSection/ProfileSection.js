import React, { Component } from "react";
import Input from "../Input/Input";
import "./ProfileSection.css";
import swal from "sweetalert";

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
      <div className="my-container">
        <header>
          <h4>Sección de vinculación</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <div className="profile-section">
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
            <div className="btn-status-container">
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
    );
  }
}
