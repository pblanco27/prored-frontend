import React, { Component } from "react";
import SelectCampus from "../Selects/Campus";
import SelectCareer from "../Selects/Career";
import SelectInvestigationUnit from "../Selects/InvestigationUnit";
import SelectBudgetUnit from "../Selects/BudgetUnit";
import SelectBudgetSubUnit from "../Selects/BudgetSubUnit";
import AssoCareersByCenter from "./AssoCareersByCenter/AssoCareersByCenter";
import SelectNetwork from "../Selects/Network";
import SelectActivityType from "../Selects/ActivityType";

/**
 * * Componente para crear y editar la información  de los selects
 * * Está encargado de mostrar los selects de la información académica
 * * y perfil amplio, brinda la posibilidad de crear y editar este tipo
 * * de datos
 */
export default class ManageInfo extends Component {
  render() {
    return (
      <div className="container my-4">
        <div className="card ">
          <header className="card-header text-center container-title">
            <h4>Gestión de información</h4>
          </header>
          <center>
            A continuación se presentan las listas de opciones que puede cambiar
          </center>
          <div className="d-lg-flex card-body px-4 d-md-block">
            <div className="w-100">
              <b>Información académica (UNED)</b>
              <SelectCampus label="Campus universitario" />
              <hr className="w-75" />
              <SelectCareer label="Carreras disponibles" />
              <hr className="w-75" />
              <b>Información (UNED)</b>
              <SelectInvestigationUnit label="Unidad de Investigación" />
              <hr className="w-75" />
              <b>Información presupuestaria</b>
              <SelectBudgetUnit label="Partida" />
              <hr className="w-75" />
              <SelectBudgetSubUnit label="Sub partida" />
            </div>
            <div className="w-100">
              <AssoCareersByCenter />
              <b>Información de redes</b>
              <SelectNetwork label="Redes asociadas" />
              <hr className="w-75" />
              <b>Actividades</b>
              <SelectActivityType label="Tipo de actividad" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
