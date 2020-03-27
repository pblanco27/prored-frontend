import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalRedEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: ''
        }
        this.validateShow = this.validateShow.bind(this);
    }

    validateShow() {
        if (this.props.id_network !== 0) {
            this.setState({ name: this.props.network_name, type: this.props.network_type });
            $("#networkEditNameError").hide();
            $("#modalRedEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar una red asociada de la lista.", "warning");
        }
    }

    async validateField(value, element_id) {
        var error = "";
        const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (value.length > 40){
            error = "Este campo puede tener un máximo de 40 caracteres"
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

    handleChangeType = event => {
        this.setState({ type: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.validateField(this.state.name, "#networkEditNameError");
        if (!this.state.hasError) {
            const network = {
                name: this.state.name,
                type: this.state.type,
            };
            await axios.put(`/network/` + this.props.id_network, network)
            this.setState({ type: '', name: '' });
            this.props.getNetwork();
            $("#modalRedEdit").modal("hide");
            swal("¡Listo!", "Se editó la red exitosamente.", "success");
            this.props.refreshThis();
        }
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalRedEdit" onClick={this.validateShow}>Editar actual</button>
                <div className="modal fade" id="modalRedEdit" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Editar la red</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="tipoRed">Tipo de red</label>
                                    <select
                                        className="form-control"
                                        id="tipoRed"
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.handleChangeType}>
                                        <option className="select-cs" value="" defaultValue>Seleccione el nuevo tipo de red</option>
                                        <option value="Municipalidad">Municipalidad</option>
                                        <option value="ONG">ONG</option>
                                        <option value="Asociaciones">Asociaciones</option>
                                        <option value="Grupo Artístico">Grupo Artístico</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreRed">Escriba el nuevo nombre de la red</label>
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
                                        id="networkEditNameError">
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                    <input type="submit" className="btn btn-primary" value="Guardar" onClick={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
