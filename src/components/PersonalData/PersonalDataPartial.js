import React, { Component } from 'react'
import './PersonalData.css';

export default class PersonalDataPartial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre : '', 
            primerApellido : '',
            segundoApellido : '',
            fechaNacimiento : '',
            cedula : '',
        }
    }

    onChangeNombre = (event) => {
        var opcion = event.target.value;
        this.setState({ nombre: opcion });
    }

    onChangePrimerApellido = (event) => {
        var opcion = event.target.value;
        this.setState({ primerApellido: opcion });
    }

    onChangeSegundoApellido = (event) => {
        var opcion = event.target.value;
        this.setState({ segundoApellido: opcion });
    }

    onChangeFecha = (event) => {
        var opcion = event.target.value;
        this.setState({ fechaNacimiento: opcion });
    }

    onChangeCedula = (event) => {
        var opcion = event.target.value;
        this.setState({ cedula: opcion });
    }

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
                                <input className="form-control" type="text" name="first-name" id="first-name" onChange={this.onChangeNombre} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name1">Primer Apellido</label>
                                <input className="form-control" type="text" name="last-name1" id="last-name1" onChange={this.onChangePrimerApellido} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name2">Segundo Apellido</label>
                                <input className="form-control" type="text" name="last-name2" id="last-name2" onChange={this.onChangeSegundoApellido} required></input>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="birthdate">Fecha de nacimiento</label>
                                <input className="form-control" type="date" name="birthdate" min="1917-01-01" id="birthdate" onChange={this.onChangeFecha} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dni">Cédula de identificación</label>
                                <input className="form-control" type="number" name="dni" min="0" max="1000000000000" id="dni" onChange={this.onChangeCedula} required></input>
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





