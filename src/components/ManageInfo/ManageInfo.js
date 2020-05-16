import React, { Component } from "react";
import Academic from "./Academic/Academic";
import Additional from "./Additional/Additional";
import Networks from "./Networks/Networks";
import "./ManageInfo.css";

/**
 * * Componente para crear y editar la información  de los selects
 * * Está encargado de mostrar los selects de la información académica
 * * y perfil amplio, brinda la posibilidad de crear y editar este tipo
 * * de datos
 */
export default class ManageInfo extends Component {
  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Gestión de información</h4>
        </header>
        <center>
          A continuación se presentan las listas de opciones que puede cambiar
        </center>
        <div className="academic-info">
          <div className="select-section">
            <Academic />
          </div>
          <div className="select-section">
            <Additional />
            <Networks />
          </div>
        </div>
      </div>
    );
  }
}
