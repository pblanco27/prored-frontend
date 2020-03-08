import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (    
            <div class="nav_uned">
                <input type="checkbox" id="toggle"></input>
                <div>
                <label for="toggle" class="toggle" data-open="MENÚ" data-close="Cerrar MENÚ" onclick="">Menú</label>
                    <ul class="menu_Inst">
                        <li>
                            <div class="dropdown nav">
                                <button class="btn btn-primary" type="button" id="boton_inicio" >
                                    Inicio
                                </button>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown nav">
                                <button class="btn btn-primary dropdown-toggle" type="button" id="boton_vinculados" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Vinculados
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Registrar vinculado</a>
                                    <a class="dropdown-item" href="#">Editar vinculado</a>
                                    <a class="dropdown-item" href="#">Deshabilitar vinculado</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown nav">
                                <button class="btn btn-primary dropdown-toggle" type="button" id="boton_vinculados" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Proyectos
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Registrar proyecto</a>
                                    <a class="dropdown-item" href="#">Editar proyecto</a>
                                    <a class="dropdown-item" href="#">Deshabilitar proyecto</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>     

        )
    }
}





