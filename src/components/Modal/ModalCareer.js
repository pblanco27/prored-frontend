import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCareer extends Component {
    state = {
        name: '',
        career_code: '',
        degree: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeCode = event => {
        this.setState({ career_code: event.target.value });
    }

    handleChangeDegree = event => {
        this.setState({ degree: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const career = {
            name: this.state.name,
            career_code: this.state.career_code,
            degree: this.state.degree
        };
        await axios.post(`/career`, career)
        this.setState({ name: '', career_code: '', degree: '' });
        this.props.getCareer();
        $("#modalCareer").modal("hide");
        swal("¡Listo!", "Se creó la nueva carrera exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCareer">Crear nueva</button>
                <div className="modal fade" id="modalCareer" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Crear nueva carrera</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="careerCode">Código de la carrera</label>
                                    <input className="form-control" type="text" value={this.state.career_code} name="career_code" id="careerCode" required onChange={this.handleChangeCode}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="degree">Grado académico</label>
                                    <select className="form-control" name="degree" id="degree" required onChange={this.handleChangeDegree}>
                                        <option className="select-cs" value="" defaultValue>Seleccione un grado</option>
                                        <option value="Diplomado">Diplomado</option>
                                        <option value="Bachillerato">Bachillerato</option>
                                        <option value="Licenciatura">Licenciatura</option>
                                        <option value="Maestría">Maestría</option>
                                        <option value="Doctorado">Doctorado</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreCareer">Nombre</label>
                                    <input className="form-control" type="text" value={this.state.name} name="name" id="nombreCareer" required onChange={this.handleChangeName}></input>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <input type="submit" className="btn btn-primary" value="Crear" onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}




