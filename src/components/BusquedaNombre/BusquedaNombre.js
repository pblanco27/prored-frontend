import React, { Component } from 'react'
import SelectAuto from '../SelectAuto/SelectAuto'

export default class BusquedaNombre extends Component {
    render() {
        return (
            <div id="container">
                <header><h4>Buscar vinculado</h4></header>
                <center>A continuación puede buscar una persona por su nombre o número de cédula</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <SelectAuto />
                            </div>
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}