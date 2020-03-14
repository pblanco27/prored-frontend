import React, { Component } from 'react'
import ModalDesactivacion from '../Modal/ModalDesactivacion'

export default class DesactivarVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <div id="container">
                        <header><h4>Desactivación / activación </h4></header>
                        <div id="part-1">
                            <br></br>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-9">
                                    <div class="form-group">
                                        <label for="tipoVinculado">Tipo de vinculado:</label><br></br>
                                        <select class="form-control" name="tipoVinculado" id="tipoVinculado">
                                            <option class="select-cs" value="" selected="selected">Seleccione el tipo</option>
                                            <option value="1">Estudiante</option>
                                            <option value="2">Profesor</option>
                                            <option value="3">Investigador</option>
                                            <option value="4">Asistente</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <br></br>  
                                    <center><button type="submit" class="btn btn-md btn-primary" href="#" role="button" onClick="">Buscar</button></center>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
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


