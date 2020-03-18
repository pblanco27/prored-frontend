import React, { Component } from 'react'
import './PersonalData.css';

export default class PersonalDataPartial extends Component {
    render() {
        return (
            <div id="container">
                <header><h4>Información personal</h4></header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="first-name">Nombre</label>
                                <input className="form-control" type="text" name="first-name" id="first-name" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name1">Primer Apellido</label>
                                <input className="form-control" type="text" name="last-name1" id="last-name1" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name2">Segundo Apellido</label>
                                <input className="form-control" type="text" name="last-name2" id="last-name2" required></input>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="birthdate">Fecha de nacimiento</label>
                                <input className="form-control" type="date" name="birthdate" min="1917-01-01" id="birthdate" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Cédula de identificación</label>
                                <input className="form-control" type="number" name="age" min="0" max="100" id="age" required></input>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





