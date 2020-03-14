import React, { Component } from 'react'

export default class ModalRed extends Component {
    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalRed">Crear nueva</button>

                <div class="modal fade" id="modalRed" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva red</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">                                
                                <form>
                                    <div class="form-group">
                                        <label for="tipoRed">Tipo de red</label>
                                        <select class="form-control" name="tipoRed">
                                            <option class="select-cs" value="" label="Seleccione la red" selected="selected">Seleccione la red</option>
                                            <option value="1">ONG</option>
                                            <option value="2">Municipalidades</option>
                                            <option value="3">Grupos artísticos</option>
                                            <option value="4">Asociaciones</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="nombreRed">Nombre</label>
                                        <input class="form-control" type="text" name="nombreRed" id="nombreRed" required></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




