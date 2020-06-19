import React, { Component } from "react";
import uned from "../../assets/uned.jpg";

/**
 * * Componente que contiene y muestra la página inicial del sistema
 */
export default class Home extends Component {
  render() {
    return (
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>¡Bienvenido!</h4>
          </header>

          <div className="d-lg-flex card-body px-4 d-md-block align-items-center">
            <div className="w-100 text-justify px-3">
              <h5>
                <b>ProRed</b>
              </h5>
              <p className="card-text">
                El Programa de Investigación para la Promoción del Trabajo en
                Red (ProRed) es una unidad de la Vicerrectoría de Investigación
                de la Universidad Estatal a Distancia de Costa Rica (UNED). Su
                principal objetivo es generar espacios de trabajo colaborativo,
                a fin de incentivar las labores en red en materia de
                investigación y motivar a los estudiantes de la UNED a generar
                nuevos conocimientos.
              </p>
              <h5>
                <b>Acerca del sistema</b>
              </h5>
              <p>
                El presente sistema permite realizar acciones administrativas y
                de gestión acerca de la información de las personas y proyectos
                inscritos o vinculados al programa de ProRed.
              </p>
            </div>
            <div className="w-100">
              <img id="foto_uned" src={uned} alt="uned" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
