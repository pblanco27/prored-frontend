import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

//Componente para el menú de la aplicación
/*
    Actualmente, se encuentra desactivado de la aplicación 
*/

export default class Menu extends Component {
  render() {
    return (
      <div className="navbarContainer">
        <nav className="navbarProred navbar-dark navbar navbar-expand-lg">
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
                <NavLink
                  className="nav-link"
                  exact
                  activeClassName="active_link"
                  to="/"
                >
                  Home
                </NavLink>
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
                        <NavLink
                          className="nav-link"
                          to="/verVinculado"
                          activeClassName="active_link"
                        >
                          Ver vinculado
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/registroVinculado"
                          activeClassName="active_link"
                        >
                          Registrar vinculado
                        </NavLink>
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
                <NavLink
                  className="nav-link"
                  to="/gestionInformacion"
                  activeClassName="active_link"
                >
                  Ajustes
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
