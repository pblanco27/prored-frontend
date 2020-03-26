import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalRed extends Component {
    state = {
        name: '',
        type: '',
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

    handleChangeType = event => {
        this.setState({ type: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.validateField(this.state.name, "#networkNameError");
        const nameError = this.state.hasError;
        await this.validateSelect(this.state.type, "#networkTypeError");
        const typeError = this.state.hasError;
        if (!nameError && !typeError) {
            const network = {
                name: this.state.name,
                type: this.state.type
            };
            await axios.post(`/network`, network)
            this.setState({ name: '' });
            this.props.getNetwork();
            $("#modalRed").modal("hide");
            swal("¡Listo!", "Se creó la nueva red exitosamente.", "success");
        }
        this.props.refreshComponent();
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalRed">Crear nueva</button>
                <div className="modal fade" id="modalRed" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Crear nueva red</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="tipoRed">Tipo de red</label>
                                <select
                                    className="form-control"
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.handleChangeType}>
                                    <option className="select-cs" value="" defaultValue>Seleccione la red</option>
                                    <option value="Municipalidad">Municipalidad</option>
                                    <option value="ONG">ONG</option>
                                    <option value="Asociaciones">Asociaciones</option>
                                    <option value="Grupo Artístico">Grupo Artístico</option>
                                </select>
                                <div
                                    className="alert alert-danger"
                                    style={{ display: "none", fontSize: 12 }}
                                    id="networkTypeError">
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreRed">Nombre</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nombreRed"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChangeName}>
                                </input>
                                <div
                                    className="alert alert-danger"
                                    style={{ display: "none", fontSize: 12 }}
                                    id="networkNameError">
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
            </div>
        )
    }
}




