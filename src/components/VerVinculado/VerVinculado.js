import React, { Component } from 'react';
import BusquedaNombre from '../BusquedaNombre/BusquedaNombre'

//Componente para unir toda la información del vinculado
/*
    Actualmente se utiliza para encerrar Busqueda nombre pero 
    se deja la estructura para que en el futuro pueda utlizar para agregar más 
    componentes  
*/


export default class VerVinculado extends Component {
    render() {
        return (
            <div>
                <BusquedaNombre />                    
            </div>
        )
    }
}





