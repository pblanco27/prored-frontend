import React, { Component } from "react";
import AssoCareersByCenter from "./AssoCareersByCenter/AssoCareersByCenter";
import SelectCampus from "../Selects/Campus";
import SelectCareer from "../Selects/Career";
import SelectNetwork from "../Selects/Network";
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
            <b>Información académica (UNED)</b>
            <SelectCampus label="Campus universitario" />
            <SelectCareer label="Carreras disponibles"/>
          </div>
          <div className="select-section">
            <AssoCareersByCenter />
            <b>Información de redes</b>
            <SelectNetwork label="Redes asociadas"/>
          </div>
        </div>
      </div>
    );
  }
}
