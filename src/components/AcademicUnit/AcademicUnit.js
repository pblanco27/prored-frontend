import React, { Component } from 'react'
import Modal from '../Modal/Modal'

export default class AcademicUnit extends Component {
    render() {
        return (
            <div id="container">
                <header><h4>Sección de Unidades de Vinculación</h4></header>
                <div id="part-1">
                    <br></br>
                    <div class="row">                                
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <label for="tipoUnidadAcademica">Seleccione la Unidad Académica:   </label><br></br>
                            <select>
                                <option value="1">Tipo Uno</option>
                                <option value="2">Tipo Dos</option>
                                <option value="3">Tipo Tres</option>
                            </select>
                        </div>
                       
                        <div class="col-md-5">
                            <label for="tipoUnidadInvestigacion">Seleccione la Unidad de Investigación :   </label><br></br>
                            <select>
                                <option value="1">Tipo Uno</option>
                                <option value="2">Tipo Dos</option>
                                <option value="3">Tipo Tres</option>
                            </select>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">                                
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <Modal/>
                        </div>
                       
                        <div class="col-md-5">
                            <Modal/>
                        </div>
                    </div>
                    <br></br>
                </div>
            </div>
            

        )
    }
}





