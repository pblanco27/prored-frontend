import React, { Component } from 'react';
import PersonalData from '../PersonalData/PersonalData';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit'
import './RegistroVinculado.css'

export default class Registro extends Component {
    render() {
        return (
            <div class="registro">
                <form>
                    <center><h3>Registrar vinculado</h3></center>
                    <div id="container">
                        <header><h4>Sección de vinculación</h4></header>
                        <div id="part-1">
                            <br></br>
                            <div class="row">                                
                                <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <label for="tipoVinculado">Seleccione el tipo de vinculado:   </label><br></br>
                                    <select>
                                        <option value="1">Estudiante</option>
                                        <option value="2">Profesor</option>
                                        <option value="3">Investigador</option>
                                        <option value="4">Asistente</option>
                                    </select>
                                </div>
                                <div class="col-md-5">
                                    <label for="tipoVinculacion">Seleccione el tipo de vinculación:   </label><br></br>
                                    <select>
                                        <option value="1">Básico</option>
                                        <option value="2">Medio</option>
                                        <option value="3">Avanzado</option>
                                    </select>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                            <br></br>
                        </div>
                    </div>
                    <PersonalData />
                    <AcademicInfo />
                    <AcademicUnit/>
                    <center><a class="btn btn-lg btn-success" href="#" role="button" onClick= "">Registrar</a></center>
                    

                </form>
            </div>
        )
    }
}



