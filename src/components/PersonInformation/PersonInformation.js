import React, { Component } from 'react'
import ModalDesactivacion from '../Modal/ModalDesactivacion'

export default class PersonInformation extends Component {
    render() {
        return (
            <div>
                <form>
                    <div id="container">
                        <header><h4>Información de la persona</h4></header>
                        <div id="part-1">
                            <br></br>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-sm-10">
                                    <table class="table table-bordered table-hover dt-responsive">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Primer apellido</th>
                                                <th>Segundo apellido</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Carlos</td>
                                                <td>Gómez</td>
                                                <td>Segura</td>
                                                <td><ModalDesactivacion estado="Desactivar" /></td>
                                            </tr>
                                            <tr>
                                                <td>Paolo </td>
                                                <td>Blanco</td>
                                                <td>Núñez</td>
                                                <td><ModalDesactivacion estado="Activar" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


