import React, { Component } from 'react'
import ModalUInv from '../Modal/ModalUInv'
import ModalUAca from '../Modal/ModalUAca'

export default class AcademicUnit extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h4>Unidades de vinculación</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="form-group">
                                        <label for="unidadAcademica">Unidad académica:   </label><br></br>
                                        <select class="form-control" name="unidadAcademica" required>
                                            <option class="select-cs" value="" selected="selected">Seleccione la unidad</option>
                                            <option value="1">Tipo Uno</option>
                                            <option value="2">Tipo Dos</option>
                                            <option value="3">Tipo Tres</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <br></br>
                                    <ModalUAca />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="form-group">
                                        <label for="unidadInvestigacion">Unidad de investigación:   </label><br></br>
                                        <select class="form-control" name="unidadInvestigacion" required>
                                            <option class="select-cs" value="" selected="selected">Seleccione la unidad</option>
                                            <option value="1">Tipo Uno</option>
                                            <option value="2">Tipo Dos</option>
                                            <option value="3">Tipo Tres</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-1">
                                    <br></br>
                                    <ModalUInv />
                                </div>
                            </div>

                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





