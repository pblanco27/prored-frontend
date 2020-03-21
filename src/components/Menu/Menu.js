import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

export default class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item first-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Vinculado
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="container">
                  <span className="text-uppercase text-white">Vinculado</span>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link" to="/verVinculado">Ver vinculado</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/registroVinculado">Registrar vinculado</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gestionInformacion">Gestión de información</Link>
            </li>
            {/* <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Proyecto
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="container">
                  <span class="text-uppercase text-white">Proyecto</span>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <Link class="nav-link" to="/registroProyecto">Registrar proyecto</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/editarProyecto">Editar proyecto</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/agregarEvidenciaProyecto">Agregar evidencia</Link>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Desactivar proyecto</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    )
  }
}





