import React, { Component } from 'react'
import ModalRed from '../Modal/ModalRed';
import CustomizedHook from "../CustomizedHook/CustomizedHook";
import ModalInfoAdicional from '../Modal/ModalInfoAdicional';

const carreers = [
    { title: 'Turismo' },
    { title: 'Psicología' },
    { title: 'Medicina' }
];

const cursos = [
    { title: 'TEC - Ingeniería en Computación' },
    { title: 'TEC - Arquitectura y Urbanismo' },
    { title: 'UCR - Ciencias de la Computación e Informática' },
    { title: 'UCR - Ingeniería Química' },
    { title: 'ULACIT - Ingeniería Informática' }
];

const redes = [
    { title: 'ONU' },
    { title: 'Municipalidad de Heredia' },
    { title: 'Grupo de baile folclórico' }
];

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
                            <b>Información académica (UNED)</b>
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
                                <label for="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                                <CustomizedHook id="carreerUned" list={carreers} />
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
                                        <label for="red">Seleccione el (los) curso (s) que lleva</label>
                                        <CustomizedHook id="cursos" list={cursos} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalInfoAdicional />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <b>Información de Red asociada</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="red">Seleccione la (s) red (es) asociada (s)</label>
                                        <CustomizedHook id="red" list={redes} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalRed />
                                    </div>
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





