import React, { Component } from 'react';
import Vinculacion from '../Vinculacion/Vinculacion'
import PersonalData from '../PersonalData/PersonalData';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit';
import InfoDesactivar from '../DesactivarPersonas/InfoDesactivar';

export default class RegistroVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <center><h3>Registrar vinculado</h3></center>
                    <Vinculacion />
                    <PersonalData />
                    <AcademicInfo />
                    <AcademicUnit />
                    <center><button type="submit" class="btn btn-lg btn-success" onClick="">Registrar</button></center>
                    <InfoDesactivar/>
                </form>               
            </div>
        )
    }
}


