import React, { Component } from 'react';
import BuscarVinculado from '../BusquedaNombre/BusquedaNombre'
import Vinculacion from '../Vinculacion/Vinculacion'

export default class VerVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <BuscarVinculado />                    
                    <Vinculacion parent="ver"/>
                </form>
            </div>
        )
    }
}





