import React, { Component } from 'react'
import ModalCarrera from './ModalCarrera';
import ModalCentro from './ModalCentro';

export default class ModalInfoAdicional extends Component {
    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalInfoAdicional">Crear nueva</button>

                <div class="modal fade" id="modalInfoAdicional" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva carrea</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <label for="centroUniversitario">Centro Educativo</label> <br></br>
                                                <select class="form-control" name="centroUnversitario" required>
                                                    <option class="select-cs" value="" label="Seleccione centro educativo" selected="selected">  Seleccione centro universitario  </option>
                                                    <option value="1">Centro 1</option>
                                                    <option value="2">Centro 2</option>
                                                    <option value="3">Centro 3</option>
                                                </select>
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCentro />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <label for="carreerUned">Carrera</label>
                                                <select class="form-control" name="carreerUned">
                                                    <option class="select-cs" value="" label="Seleccione la carrera" selected="selected">Seleccione la carrera</option>
                                                    <option value="1">Carrera 1</option>
                                                    <option value="2">Carrera 2</option>
                                                    <option value="3">Carrera 3</option>
                                                </select>
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCarrera />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}