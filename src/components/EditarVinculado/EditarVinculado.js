import React, { Component } from 'react';
import BuscarVinculado from '../BusquedaNombre/BusquedaNombre'
import Vinculacion from '../Vinculacion/Vinculacion'
import PersonalData from '../PersonalData/PersonalData';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit'

export default class EditarVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <center><h3>Editar vinculado</h3></center>
                    <BuscarVinculado />
                    <Vinculacion />
                    <PersonalData />
                    <AcademicInfo />
                    <AcademicUnit />
                    <center><button type="submit" class="btn btn-lg btn-success" onClick="">Registrar</button></center>
                </form>
            </div>
        )
    }
}


