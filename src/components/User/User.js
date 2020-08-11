import React, { Component } from "react";
import { get_request, post_request } from "../../helpers/Request";
import swal from "sweetalert";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
    this.restorePassword = this.restorePassword.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    const res = await get_request(`user`);
    if (res.status) {
      console.log(res.data);
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

  render() {
    const userShow = this.state.usersList.map((u, i) => {
      return (
        <div key={u.id_user}>
          <hr></hr>
          <div>
            <h5>{`${u.name} ${u.lastname1} ${u.lastname2}`}</h5>
            <p>{u.email}</p>
            <button
              className="btn btn-info"
              value={u.id_user}
              onClick={this.restorePassword}
            >
              Restablecer Contraseña
            </button>
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
