import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import authService from "../../services/AuthService";

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
        authService.deleteToken();
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
                <li className="nav-item">
                  <Link className="nav-link" to="/formularios">
                    Formularios de evaluación
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
                    Buscar actividad
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-actividad">
                    Crear actividad
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
            Partida
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-partida">
                    Crear partida
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
            Reportes
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="container">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/crear-reporte">
                    Crear reporte
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
                  <Link className="nav-link" to="/ver-usuarios">
                    Ver usuarios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ver-bitacoras">
                    Ver bitacoras
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
            Salir <i className="fas fa-sign-out-alt ml-1"></i>
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
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
