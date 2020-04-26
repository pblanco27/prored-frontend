import React, { Component } from "react";
import Vinculacion from "../Vinculacion/Vinculacion";

/**
 * * Componente para el registro de los vinculados
 * * Actualmente se utiliza para encerrar vinculacion pero
 * * se deja la estructura para que en el futuro se
 * * pueda utilizar para agregar más componentes
 */
export default class RegistroVinculado extends Component {
  render() {
    return (
      <div>
        <Vinculacion parent="registro" />
      </div>
    );
  }
}
