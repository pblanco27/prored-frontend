

import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (    
            <div class="nav_uned">
                <input type="checkbox" id="toggle"></input>
                <div>
                <label for="toggle" class="toggle" data-open="MENÚ" data-close="Cerrar MENÚ" onclick="">Men</label>
                    <ul class="menu_Inst">
                        <li><a href="https://www.uned.ac.cr/conociendo-la-uned">Conociendo la UNED</a></li>
                        <li><a href="https://entornoestudiantil.uned.ac.cr/" target="_blank">Estudiantes</a></li>      
                        <li><a href="https://www.uned.ac.cr/entornofuncionarios" target="_blank">Funcionarios</a></li> 
                        <li><a href="https://www.uned.ac.cr/recdidacticos">Recursos Didácticos</a></li>
                        <li><a href="https://investiga.uned.ac.cr/">Investigación</a></li>
                        <li><a href="https://www.uned.ac.cr/extension/">Extensión</a></li>
                        <li><a href="https://www.uned.ac.cr/ceus">Centros Universitarios</a></li>
                        <li><a href="https://campusvirtual.uned.ac.cr/">Campus Virtual</a></li>
                    </ul>
                </div>
            </div>     

        )
    }
}





