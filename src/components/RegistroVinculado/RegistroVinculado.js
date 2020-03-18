import React, { Component } from 'react';
import Vinculacion from '../Vinculacion/Vinculacion'

export default class RegistroVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <Vinculacion />
                    <center><button type="submit" className="btn btn-lg btn-success">Registrar</button></center>
                    <br></br>
                </form>               
            </div>
        )
    }
}


