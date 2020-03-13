import React, { Component } from 'react'

export default class ModalDesactivacion extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalDesa">{this.props.estado}</button>
                <div class="modal fade" id="myModalDesa" role="dialog">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">                                
                                <h4 class="modal-title">Confirmación</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-1"></div>
                                <div class="col-xs-12">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                </div>
                                <div class="col-sm-2"></div>
                               
                                <div class="col-xs-12">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


