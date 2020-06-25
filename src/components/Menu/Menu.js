import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

/**
 * * Componente que contiene y muestra el menú de la aplicación
 */
export default class Menu extends Component {
  logout() {
    swal({
      title: "¡Atención!",
      text: "¿Seguro que desea cerrar sesión?",
      icon: "info",
      buttons: ["No", "Sí"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        localStorage.clear();
        window.location = "/";
      }
    });
  }

  renderPublicOptions() {
    if (this.props.logged) {
      return null;
    }
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/iniciar-sesion">
          Iniciar sesión
        </Link>
      </li>
    );
  }
  renderUserMenu() {
    if (!this.props.logged) {
      return null;
    }
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/buscar">
            Buscar
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Vinculado
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-estudiante">
                    Buscar Estudiante
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/registrar-estudiante">
                    Registrar Estudiante
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-investigador">
                    Buscar Investigador
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrar-investigador">
                    Registrar Investigador
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle "
            href="/#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Proyectos
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-proyecto">
                    Buscar proyecto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-proyecto">
                    Crear proyecto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gantt">
                    Buscar / crear gantt
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle "
            href="/#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Actividades
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-actividad">
                    Ver Actividades
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-actividad">
                    Crear Actividad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle "
            href="/#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Usuario
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/registrar-usuario">
                    Registrar usuario
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cambiar-contrasena">
                    Cambiar contraseña
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/gestion-informacion">
            Ajustes
          </Link>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link nav-link"
            onClick={() => {
              this.logout();
            }}
          >
            Salir<i className="fas fa-sign-out-alt ml-1"></i>
          </button>
        </li>
      </>
    );
  }
  render() {
    return (
      <div className="navbar-container">
        <nav className="navbar-prored navbar-dark navbar navbar-expand-lg">
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#nav-menu"
            aria-controls="nav-menu"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="nav-menu" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              {this.renderUserMenu()}
              {this.renderPublicOptions()}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/reestablecer-contrasena">
                  Reestablecer contraseña
                </Link>
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
