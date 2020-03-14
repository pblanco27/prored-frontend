import React, { Component } from 'react'
import SelectAuto from '../SelectAuto/SelectAuto'

const projects = [
    { title: 'Proyecto 1'},
    { title: 'Proyeco 2'}
];

export default class AgregarEvidenciaProyecto extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h4>Agregar evidencia</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="proyectoSelect">Proyecto</label> <br></br>
                                <SelectAuto list={projects}/>
                            </div>
                            <div class="form-group">
                                <label>Tipo de evidencia</label><br></br>
                                <select class="form-control" name="academicLevel" required>
                                    <option class="select-cs" value="" label="Seleccione el tipo de evidencia" selected="selected">Seleccione la evidencia</option>
                                    <option value="0">Talleres</option>
                                    <option value="1">Documentos </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}