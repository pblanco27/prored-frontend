import React, { Component } from 'react'
import PersonInformation from '../PersonInformation/PersonInformation'
import BusquedaNombre from '../BusquedaNombre/BusquedaNombre'

export default class DesactivarVinculado extends Component {
    render() {
        return (
            <div>
                <BusquedaNombre />
                <PersonInformation />
            </div>
        )
    }
}


