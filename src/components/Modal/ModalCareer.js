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

    async validateField(value, element_id) {
        var error = "";
        const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()';
        }
        $(element_id).text(error);
        if (error !== "") $(element_id).show(); else $(element_id).hide();
        this.setState({ hasError: error !== "" });
    }

    async validateCode(value, element_id) {
        var error = "";
        const reg = /^[0-9]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente números';
        }
        $(element_id).text(error);
        if (error !== "") $(element_id).show(); else $(element_id).hide();
        this.setState({ hasError: error !== "" });
    }

    async validateSelect(value, element_id) {
        var error = "";
        if (value === "") {
            error = "Debe seleccionar una opción de la lista";
        }
        $(element_id).text(error);
        if (error !== "") $(element_id).show(); else $(element_id).hide();
        this.setState({ hasError: error !== "" });
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
        await this.validateField(this.state.name, "#careerNameError");
        const nameError = this.state.hasError;
        await this.validateCode(this.state.career_code, "#careerCodeError");
        const codeError = this.state.hasError;
        await this.validateSelect(this.state.degree, "#careerDegreeError");
        const degreeError = this.state.hasError;
        if (!nameError && !codeError && !degreeError) {
            const career = {
                name: this.state.name,
                career_code: this.state.career_code,
                degree: this.state.degree
            };

            // FALTA VERIFICAR QUE NO SE REPITA EL CÓDIGO DE CARRERA 

            await axios.post(`/career`, career)
            this.setState({ name: '', career_code: '', degree: '' });
            this.props.getCareer();
            $("#modalCareer").modal("hide");
            swal("¡Listo!", "Se creó la nueva carrera exitosamente.", "success");
        }
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
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="careerCode"
                                        name="career_code"
                                        value={this.state.career_code}
                                        onChange={this.handleChangeCode}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="careerCodeError">
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="degree">Grado académico</label>
                                    <select
                                        className="form-control"
                                        id="degree"
                                        name="degree"
                                        onChange={this.handleChangeDegree}>
                                        <option className="select-cs" value="" defaultValue>Seleccione un grado</option>
                                        <option value="Diplomado">Diplomado</option>
                                        <option value="Bachillerato">Bachillerato</option>
                                        <option value="Licenciatura">Licenciatura</option>
                                        <option value="Maestría">Maestría</option>
                                        <option value="Doctorado">Doctorado</option>
                                    </select>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="careerDegreeError">
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreCareer">Nombre</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="nombreCareer"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="careerNameError">
                                    </div>
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




