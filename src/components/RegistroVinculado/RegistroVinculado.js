import React, { Component } from 'react';
import Vinculacion from '../Vinculacion/Vinculacion'

export default class RegistroVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <Vinculacion />
                    <center><button type="submit" class="btn btn-lg btn-success" onClick="">Registrar</button></center>
                    <br></br>
                </form>               
            </div>
        )
    }
}


