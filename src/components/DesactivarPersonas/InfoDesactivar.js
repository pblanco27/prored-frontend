
import React, { Component } from 'react'
import './InfoDesactivacion.css'
import ModalDesactivacion from '../Modal/ModalDesactivacion'

export default class InfoDesactivar extends Component {
    render() {
        return (
            <div class="registro">
                <form>
                    <div id="container">
                        <header><h4>Sección de activación y desactivación </h4></header>
                        <div id="part-1">
                            <br></br>
                            <div class="form-group">
                                <label for="tipoVinculado">Seleccione el tipo de vinculado:   </label><br></br>
                                <select class="form-control" >
                                    <option value="1">Estudiante</option>
                                    <option value="2">Profesor</option>
                                    <option value="3">Investigador</option>
                                    <option value="4">Asistente</option>
                                </select>
                            </div>
                            <center><button type ="submit" class="btn btn-lg btn-primary" href="#" role="button" onClick= "">Buscar</button></center>
                            <br></br>

                            
                <div class="container">
                <header><h4>Lista de vinculados</h4></header>
                <div class="row">
                    <div class="col-sm-12">
                    <table class="table table-bordered table-hover dt-responsive">
                       
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Primer apellido</th>
                            <th>Segundo apellido</th>
                            <th>Acción</th>
                    
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Carlos</td>
                            <td>Gómez</td>
                            <td>Segura</td>
                            <td><ModalDesactivacion estado = "Desactivar"/></td>
                    
                        </tr>
                        <tr>
                            <td>Paolo </td>
                            <td>Blanco</td>
                            <td>Núñez</td>
                            <td><ModalDesactivacion estado = "Activar"/></td>
                        </tr>
                        </tbody>

                    </table>
                    </div>
                </div>
                </div>

                        </div>
                    </div>
                    
                </form>


                

                
            </div>

            



        )
    }
}


