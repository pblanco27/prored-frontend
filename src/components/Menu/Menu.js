import React, { Component } from 'react'
import './Menu.css'

export default class Menu extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item first-item">
              <a class="nav-link" href="#">Inicio</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Vinculado
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="container">
                  <span class="text-uppercase text-white">Vinculado</span>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Registrar vinculado</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Editar vinculado</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Desactivar vinculado</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Proyecto
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div class="container">
                  <span class="text-uppercase text-white">Proyecto</span>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Registrar proyecto</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Editar proyecto</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Desactivar proyecto</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}





