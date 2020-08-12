import React, { Component } from "react";
import { get_request, post_request, put_request } from "../../helpers/Request";
import swal from "sweetalert";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
    this.restorePassword = this.restorePassword.bind(this);
    this.activateUser = this.activateUser.bind(this);
    this.inactivateUser = this.inactivateUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    const res = await get_request(`user`);
    if (res.status) {
      this.setState({ usersList: res.data });
    }
  }

  async restorePassword(e) {
    const user = {
      id_user: e.target.value,
    };
    swal({
      title: "¡Atención!",
      text: `
          Una vez ejecutado se cambiará la contraseña de este usuario.

          ¿Desea continuar?`,
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await post_request(`restorePassword`, user);
        if (res.status) {
          swal(
            "¡Listo!",
            `La contraseña se restablecio exitosamente. Con la contraseña ${res.data.password}`,
            "success"
          );
        }
      }
    });
  }

  activateUser(e) {
    const id_user = e.target.value;
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se activara el usuario.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await put_request(`user/${id_user}/enable`);
        if (res.status) {
          swal("¡Listo!", "Se activo el usuario exitosamente.", "success").then(
            () => {
              window.location.reload();
            }
          );
        }
      } else {
        swal("El usuario se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  inactivateUser(e) {
    const id_user = e.target.value;
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se inactivara el usuario.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await put_request(`user/${id_user}/disable`);
        if (res.status) {
          swal(
            "¡Listo!",
            "Se inactivo el usuario exitosamente.",
            "success"
          ).then(() => {
            window.location.reload();
          });
        }
      } else {
        swal("El usuario se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  render() {
    const userShow = this.state.usersList.map((u, i) => {
      return (
        <div key={u.id_user}>
          <hr></hr>
          <div>
            <h5>{`${u.name} ${u.lastname1} ${u.lastname2}`}</h5>
            <p>{u.email}</p>
            <div className="btn-container">
              <button
                className="btn btn-info"
                value={u.id_user}
                onClick={this.restorePassword}
              >
                Restablecer Contraseña
              </button>
              <button
                className={`btn ${u.status ? "btn-danger" : "btn-success"}`}
                value={u.id_user}
                onClick={u.status ? this.inactivateUser : this.activateUser}
              >
                {u.status ? "Inactivar usuario" : "Activar usuario"}
              </button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Ver usuarios</h4>
          </header>
          <div className="d-flex card-body px-4 justify-content-center align-items-center">
            <div className="w-75">{userShow}</div>
          </div>
        </div>
      </div>
    );
  }
}
