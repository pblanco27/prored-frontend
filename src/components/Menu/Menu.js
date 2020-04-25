import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

//Componente para el menú de la aplicación
/*
    Actualmente, se encuentra desactivado de la aplicación 
*/

export default class Menu extends Component {
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
                  Home
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
                        <Link className="nav-link" to="/verVinculado">
                          Ver vinculado
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/registroVinculado">
                          Registrar vinculado
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
                  <div className="container"></div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gestionInformacion">
                  Ajustes
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
