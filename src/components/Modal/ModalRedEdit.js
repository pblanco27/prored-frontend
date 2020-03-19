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
        this.validate = this.validate.bind(this);
    }

    validate() {
        if (this.props.id_network !== 0) {
            this.setState({ name: this.props.network_name });
            this.setState({ type: this.props.network_type });
            $("#modalRedEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar una red asociada de la lista.", "warning");
        }
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeType = event => {
        this.setState({ type: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const network = {
            name: this.state.name,
            type: this.state.type,
        };
        await axios.put(`/network/` + this.props.id_network, network)
        this.setState({ type: '', name: '' });
        this.props.getNetwork();
        $("#modalRedEdit").modal("hide");
        swal("¡Listo!", "Se editó la red exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalRedEdit" onClick={this.validate}>Editar actual</button>
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
                                        onChange={this.handleChangeType}
                                    >
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
                                        name="name"
                                        id="nombreRed"
                                        required
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
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
