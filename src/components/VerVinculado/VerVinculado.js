import React, { Component } from "react";
import BusquedaNombre from "../BusquedaNombre/BusquedaNombre";
import Home from "../Home/Home";
import { Route, Switch, Link } from "react-router-dom";

//Componente para unir toda la información del vinculado
/*
    Actualmente se utiliza para encerrar Busqueda nombre pero 
    se deja la estructura para que en el futuro pueda utlizar para agregar más 
    componentes  
*/

export default class VerVinculado extends Component {
  foo() {
    return <Link to="/verVinculado/1/invitado">hola</Link>;
  }
  render() {
    return (
      <div>
        <BusquedaNombre />
      </div>
    );
  }
}
