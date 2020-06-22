import React, { Component } from "react";
import $ from "jquery";

/**
 * * Componente que muestra la ventana para
 * * la barra de progreso a la hora de subir un archivo
 */
export default class LoadingBar extends Component {
  componentDidMount() {
    $("#loadingBar").modal("toggle");
  }

  render() {
    return (
      <div
        className="modal fade"
        id="loadingBar"
        role="dialog"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Cargando Archivos adjuntos</h4>
            </div>
            <div className="modal-body">
              <center>Por favor espere.</center>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ flex: this.props.uploadPercentage / 100 }}
                >
                  {this.props.uploadPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
