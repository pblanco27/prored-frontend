import React, { Component } from 'react';
import PersonalData from './PersonalData';
import './PersonalData.css';

export default class Registro extends Component {
    render() {
        return (
            <div class="registro">
                <center><h3>Registro de Vinculados</h3></center>

                <div id="container">
                    <header><h3>Sección de vinculación</h3></header>
                    <form>
                        <fieldset>
                            <div id="part-1">
                                <br></br>
                                <label for="tipoVinculado">Seleccione el tipo de vinculado:   </label><br></br>

                                <select>
                                    <option value="1">Estudiante</option>
                                    <option value="2">Profesor</option>
                                    <option value="3">Investigador</option>
                                    <option value="4">Asistente</option>
                                </select>
                                <br></br>
                                <br></br>

                                <label for="tipoVinculacion">Seleccione el tipo de vinculación:   </label><br></br>

                                <select>
                                    <option value="1">Básico</option>
                                    <option value="2">Medio</option>
                                    <option value="3">Avanzado</option>
                                </select>
                            </div>

                        </fieldset>
                    </form>
                </div>
                <PersonalData />


            </div>
        )
    }
}



