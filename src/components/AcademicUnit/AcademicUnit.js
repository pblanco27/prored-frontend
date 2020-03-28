import React, { Component } from 'react'
import ModalUInv from '../Modal/ModalUInv'
import ModalUAca from '../Modal/ModalUAca'


//Componente de la Unidad académica de los encargados
/*
    Se pospone para el siguente sprint
*/

export default class AcademicUnit extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h4>Unidades de vinculación</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <label htmlFor="unidadAcademica">Unidad académica:   </label><br></br>
                                        <select className="form-control" name="unidadAcademica" required>
                                            <option className="select-cs" value="" defaultValue>Seleccione la unidad</option>
                                            <option value="1">Tipo Uno</option>
                                            <option value="2">Tipo Dos</option>
                                            <option value="3">Tipo Tres</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalUAca />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <label htmlFor="unidadInvestigacion">Unidad de investigación:   </label><br></br>
                                        <select className="form-control" name="unidadInvestigacion" required>
                                            <option className="select-cs" value="" defaultValue>Seleccione la unidad</option>
                                            <option value="1">Tipo Uno</option>
                                            <option value="2">Tipo Dos</option>
                                            <option value="3">Tipo Tres</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalUInv />
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





