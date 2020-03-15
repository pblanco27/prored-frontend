import React, { Component } from 'react';
import BuscarVinculado from '../BusquedaNombre/BusquedaNombre'
import Vinculacion from '../Vinculacion/Vinculacion'
import PersonalData from '../PersonalData/PersonalData';
import PersonalDataPartial from '../PersonalData/PersonalDataPartial';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit'

export default class VerVinculado extends Component {
    render() {
        return (
            <div>
                <form>
                    <BuscarVinculado />                    
                    {/* Estudiante */}
                    <Vinculacion type="student"/>
                    <PersonalData />                    
                    <AcademicInfo />
                    {/* Profesor */}
                    <Vinculacion type="professor"/>
                    <PersonalDataPartial />
                    <AcademicUnit />
                </form>
            </div>
        )
    }
}





