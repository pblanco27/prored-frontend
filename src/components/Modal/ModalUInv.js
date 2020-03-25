import React, { Component } from 'react'

export default class ModalUInv extends Component {
    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalUInv">Crear nueva</button>
                <div className="modal fade" id="modalUInv" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Crear nueva unidad de investigación</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Escriba el nombre de la unidad de investigación</p>
                            <div className="form-group">
                                <input className="form-control" type="text" name="unidadInvestigacion" id="unidadInvestigacion"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
