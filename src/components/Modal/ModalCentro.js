import React, { Component } from 'react'

export default class ModalCentro extends Component {
    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCentro">Crear nuevo</button>

                <div class="modal fade" id="modalCentro" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                        <div class="modal-header">                                
                                <h4 class="modal-title">Crear nuevo centro educativo</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <p>Escriba el nombre del centro</p>
                                <div class = "form-group">
                                <input class="form-control" type= "text" name ="nombreCentro" id="nombreCentro" required></input>
                            </div>
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




