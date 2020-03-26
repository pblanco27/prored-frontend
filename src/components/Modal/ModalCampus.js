import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCampus extends Component {
    state = {
        name: '',
        campus_code: ''
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

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeCode = event => {
        this.setState({ campus_code: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.validateField(this.state.name, "#campusNameError");
        const nameError = this.state.hasError;
        await this.validateField(this.state.campus_code, "#campusCodeError");
        const codeError = this.state.hasError;
        if (!nameError && !codeError) {
            const campus = {
                name: this.state.name,
                code: this.state.campus_code
            };
            const idCenter = campus.code;
            const semaforoCreacion = await axios.post(`/campus_exists`, { id: idCenter });
            if (!semaforoCreacion.data.campusexists) {
                await axios.post(`/campus`, campus)
                this.setState({ name: '', campus_code: '' });
                this.props.getCampus();
                $("#modalCampus").modal("hide");
                swal("¡Listo!", "Se creó el nuevo campus universitario exitosamente.", "success");
            } else {
                swal("¡Atención!", "No se creó el nuevo campus debido a que su código ya se encuentra asociado", "warning");
                
            }
        }
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCampus">Crear nuevo</button>
                <div className="modal fade" id="modalCampus" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Crear nuevo campus universitario</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="campusCode">Código del campus</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="campusCode"
                                        name="campus_code"
                                        value={this.state.campus_code}
                                        onChange={this.handleChangeCode}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="campusCodeError">
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreCampus">Nombre</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="nombreCampus"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="campusNameError">
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




