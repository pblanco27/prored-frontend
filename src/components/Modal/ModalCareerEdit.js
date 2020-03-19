import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCareerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            degree: ''
        }
        this.validate = this.validate.bind(this);
    }

    validate() {
        if (this.props.career_code !== '') {
            this.setState({ name: this.props.career_name })
            this.setState({ degree: this.props.career_degree })
            $("#modalCareerEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar una carrera de la lista.", "warning");
        }
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeDegree = event => {
        this.setState({ degree: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const career = {
            name: this.state.name,
            degree: this.state.degree
        };
        await axios.put(`/career/` + this.props.career_code, career);
        this.setState({ name: '', degree: '' });
        this.props.getCareer();
        $("#modalCareerEdit").modal("hide");
        swal("¡Listo!", "Se editó la carrera exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalCareerEdit" onClick={this.validate}>Editar actual</button>
                <div className="modal fade" id="modalCareerEdit" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Editar carrera</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="degree">Grado académico</label>
                                    <select
                                        className="form-control"
                                        id="degree"
                                        name="degree"                                        
                                        required
                                        value={this.state.degree}
                                        onChange={this.handleChangeDegree}
                                    >
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
                                    <input
                                        className="form-control"
                                        id="nombreCareer"
                                        type="text"
                                        name="name"                                        
                                        required
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <input type="submit" className="btn btn-primary" value="Guardar" onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}




