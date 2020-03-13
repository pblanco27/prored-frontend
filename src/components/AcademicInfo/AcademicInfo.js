import React, { Component } from 'react'
import ModalCarrera from '../Modal/ModalCarrera';
import ModalCentro from '../Modal/ModalCentro';
import MultipleSelect from './MultipleSelect';
import CustomizedHook from "../Proyecto/CustomizedHook";

export default class AcademicInfo extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h4>Información Académica</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <b>Información académica</b>
                            <div class="form-group">
                                <label for="centroUniversitario">Centro Universitario</label> <br></br>
                                <select class="form-control" name="centroUnversitario" required>
                                    <option class="select-cs" value="" label="Seleccione centro universitario" selected="selected">  Seleccione centro universitario  </option>
                                    <option value="1">Centro 1</option>
                                    <option value="2">Centro 2</option>
                                    <option value="3">Centro 3</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="carreerUned">Seleccione una carrera (as) universitaria y agréguela</label>
                                <CustomizedHook />
                            </div>
                            <div class="form-group">
                                <label>Grado Académico</label><br></br>
                                <select class="form-control" name="academicLevel" required>
                                    <option class="select-cs" value="" label="Seleccione el grado académico" selected="selected">Seleccione el grado</option>
                                    <option value="0">Técnico</option>
                                    <option value="1">Diplomado</option>
                                    <option value="2">Bachiller</option>
                                    <option value="3">Máster</option>
                                    <option value="4">Doctor</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <b>Información adicional</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="centroUniversitario">Centro Educativo</label> <br></br>
                                        <select class="form-control" name="centroUnversitario" required>
                                            <option class="select-cs" value="" label="Seleccione centro educativo" selected="selected">  Seleccione centro universitario  </option>
                                            <option value="1">Centro 1</option>
                                            <option value="2">Centro 2</option>
                                            <option value="3">Centro 3</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalCentro />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="carreerUned">Carrera</label>
                                        <select class="form-control" name="carreerUned">
                                            <option class="select-cs" value="" label="Seleccione la carrera" selected="selected">Seleccione la carrera</option>
                                            <option value="1">Carrera 1</option>
                                            <option value="2">Carrera 2</option>
                                            <option value="3">Carrera 3</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalCarrera />
                                    </div>
                                </div>
                            </div>
                            <b>Información de Red asociada</b>
                            <div class="form-group">
                                <label for="tipoRed">Tipo de red</label>
                                <select class="form-control" name="tipoRed">
                                    <option class="select-cs" value="" label="Seleccione la red" selected="selected">  Seleccione la red </option>
                                    <option value="1">ONG</option>
                                    <option value="2">Municipalidades</option>
                                    <option value="3">Grupos artísticos</option>
                                    <option value="4">Asociaciones</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="redAsociada">Nombre de red asociada</label>
                                <input class="form-control" type="text" name="first-name" id="redAsociada" required></input>
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





