import React, { Component } from 'react'
import SelectAuto from '../SelectAuto/SelectAuto'

const persons = [
    { title: 'Paolo Blanco Núñez', dni: 117250365 },
    { title: 'Gabriel Solórzano Chanto', dni: 116920331 },
    { title: 'Carlos Gómez Segura', dni: 402430534 },
    { title: 'Luis Cordero Barona', dni: 0 }
];

export default class BusquedaNombre extends Component {
    render() {
        return (
            <div id="container">
                <header><h4>Buscar vinculado</h4></header>
                <center>A continuación puede buscar una persona por su nombre o número de cédula</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <SelectAuto list={persons} label="Vinculados"/>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}