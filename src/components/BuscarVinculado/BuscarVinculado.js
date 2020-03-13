import React, { Component } from 'react'

export default class Vinculacion extends Component {
    render() {
        return (
            <div id="container">
                <header><h4>Buscar vinculado</h4></header>
                <div id="part-1">
                    <br></br>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="tipoVinculado">Tipo de vinculado: </label>
                                <select class="form-control" >
                                    <option class="select-cs" value="" selected="selected">Seleccione el tipo de vinculado</option>
                                    <option value="1">Estudiante</option>
                                    <option value="2">Profesor</option>
                                    <option value="3">Investigador</option>
                                    <option value="4">Asistente</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="tipoVinculacion">Lista de vinculados:   </label><br></br>
                                <select class="form-control">
                                    <option class="select-cs" value="" selected="selected">Seleccione el vinculado</option>
                                    <option value="1">Paolo Blanco</option>
                                    <option value="2">Carlos Gómez</option>
                                    <option value="3">Gabriel Solórzano</option>
                                    <option value="3">Luis Cordero</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}