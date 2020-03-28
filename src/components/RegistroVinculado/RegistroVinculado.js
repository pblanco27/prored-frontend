import React, { Component } from 'react';
import Vinculacion from '../Vinculacion/Vinculacion'

//Componente para registrar los vinculados
/*
    Actualmente se utiliza para encerrar vinculacion pero 
    se deja la estructura para que en el futuro pueda utlizar para agregar más 
    componentes  
*/


export default class RegistroVinculado extends Component {
    render() {
        return (
            <div>
                <Vinculacion parent="registro"/>               
            </div>
        )
    }
}


