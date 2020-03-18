import React, { Component } from 'react'

export default class ModalDesactivacion extends Component {
    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalDesactivar">{this.props.estado}</button>
                <div class="modal fade" id="modalDesactivar" role="dialog">
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Confirmación</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <center><h5>¿Está seguro?</h5></center>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Sí</button>
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


