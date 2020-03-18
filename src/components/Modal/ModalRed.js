import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalRed extends Component {
    state = {
        name: '',
        type: '',
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
        await axios.post(`/network`, network)
        this.setState({ type: '', name: '' });
        this.props.getNetwork();
        $("#modalRed").modal("hide");
        swal("¡Listo!", "Se creó la nueva red exitosamente.", "success");
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
                                <select className="form-control" name="type" required onChange={this.handleChangeType} value={this.state.type}>
                                    <option className="select-cs" value="" defaultValue>Seleccione la red</option>
                                    <option value="Municipalidad">Municipalidad</option>
                                    <option value="ONG">ONG</option>
                                    <option value="Asociaciones">Asociaciones</option>
                                    <option value="Grupo Artístico">Grupo Artístico</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreRed">Nombre</label>
                                <input className="form-control" type="text" value={this.state.name} name="name" id="nombreRed" required onChange={this.handleChangeName}></input>
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




