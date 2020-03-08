

import React, { Component } from 'react';
import PersonalData from './PersonalData';
import 'bootstrap/dist/css/bootstrap.css'
import './PersonalData.css';

export default class Registro extends Component {
    render() {
        return (          
            <div class> 
                <center>  <h1>   Registro de Vinculados  </h1> </center>
                <div id = "container">
                <header> <h1> Sección de vinculación </h1> </header>
                
                <div id= "part-1">
                    <center>
                    <br></br>
                    <label for="tipoVinculado">Seleccione el tipo de vinculado:   </label><br></br>

                    <select id="tipoVinculado" class= "custom-select">
                        <option value="1">Estudiante</option>
                        <option value="2">Profesor</option>
                        <option value="3">Investigador</option>
                        <option value="4">Asistente</option>
                    </select>
                    <br></br>
                    <br></br>
                    
                    <label for="tipoVinculacion">Seleccione el tipo de vinculación:   </label><br></br>

                    <select id="tipoVinculacion"  class= "custom-select">
                        <option value="1">Básico</option>
                        <option value="2">Medio</option>
                        <option value="3">Avanzado</option>
                    </select>

                    </center>
                    <br></br>
                    </div>
                </div>
                <PersonalData/>
                

            </div>
        )
    }
}



