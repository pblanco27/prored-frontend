import React, { Component } from 'react';
import BuscarVinculado from '../BusquedaNombre/BusquedaNombre'
import Vinculacion from '../Vinculacion/Vinculacion'

export default class EditarVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <BuscarVinculado />
                    <Vinculacion />
                    <center><button type="submit" class="btn btn-lg btn-success" onClick="">Guardar</button></center>
                    <br></br>
                </form>
            </div>
        )
    }
}


