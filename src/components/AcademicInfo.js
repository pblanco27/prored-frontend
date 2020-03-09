import React, { Component } from 'react'
import './PersonalData.css';

export default class AcademicInfo extends Component {
    render() {
        return (
            <div id="container">
                <header>
                    <h3>Información Académica </h3>
                </header>
                
                    <fieldset>
                        <legend><h5>Los campos marcados con * son requeridos</h5></legend>
                        <br></br>
                        <div id="part-1">
                        <div class="row">
                    <div class="col-md-6">
                            <h6>Información académica</h6>
                            <label for="centroUniversitario">Centro Universitario</label> <br></br>
                            <select name="centroUnversitario" required>
                                <option id="select-cs" value="" label="Seleccione centro universitario" selected="selected">  Seleccione centro universitario  </option>
                                <option value="1">Centro 1 </option>
                                <option value="2">Centro 2</option>
                                <option value="3">Centro 3</option>
                            </select>
                            <br></br><br></br>
                            <label for="carreerUned">Seleecione una carrera (as) universitaria y agréguela</label>
                            <select name="carreerUned">
                                <option id="select-cs" value="" label="Seleccione la carrera" selected="selected">  Seleccione la carrera </option>
                                <option value="1"> Carrera 1 </option>
                                <option value="2">Carrera 2</option>
                                <option value="3">Carrera 3</option>
                            </select>
                       

                            <br></br><br></br>
                            <label>Grado Académico</label><br></br>
                            <select name="academicLevel" required>
                                <option id="select-cs" value="" label="Seleccione el grado académico" selected="selected">   Seleccione el grado  </option>
                                <option value="0">Técnico</option>
                                <option value="1">Diplomado</option>
                                <option value="2">Bachiller</option>
                                <option value="3">Máster</option>
                                <option value="4">Doctor</option>
                            </select>
                            </div>
                            <div class="col-md-6">
                                <h6>Información adicional</h6>
                                <label for="centroUniversitario">Centro Educativo</label> <br></br>
                                <select name="centroUnversitario" required>
                                    <option id="select-cs" value="" label="Seleccione centro universitario" selected="selected">  Seleccione centro universitario  </option>
                                    <option value="1">Centro 1 </option>
                                    <option value="2">Centro 2</option>
                                    <option value="3">Centro 3</option>
                                </select>
                                <br></br><br></br>
                                <label for="carreerUned">Seleccione una carrera y agréguela</label>
                                <select name="carreerUned">
                                    <option id="select-cs" value="" label="Seleccione la carrera" selected="selected">  Seleccione la carrera </option>
                                    <option value="1"> Carrera 1 </option>
                                    <option value="2">Carrera 2</option>
                                    <option value="3">Carrera 3</option>
                                </select>
                                <br></br>
                                <h6>Información de Red asociada </h6>
                                <label for="tipoRed">Seleccione un tipo de red</label>
                                <select name="tipoRed">
                                    <option id="select-cs" value="" label="Seleccione la red" selected="selected">  Seleccione la red </option>
                                    <option value="1"> ONG </option>
                                    <option value="2">Municipalidades</option>
                                    <option value="3">Grupos artísticos</option>
                                    <option value="4">Asociaciones</option>
                                </select>
                                <br></br>
                                <label for="redAsociada">Nombre de red red Asociada</label>
                                <input type="text" name="first-name" id="redAsociada" required></input>
                                <br></br>

                            </div>
                            </div>

                        </div>
                     
                    </fieldset>
              
            </div>
            
        )
    }
}





