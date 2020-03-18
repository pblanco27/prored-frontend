import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCentro extends Component {
    state = {
        name: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const center = {
            name: this.state.name
        };
        await axios.post(`/center`, center)
        this.setState({ name: '' });
        this.props.getCenter();
        $("#modalCentro").modal("hide");
        swal("¡Listo!", "Se creó el nuevo centro educativo exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCentro">Crear nuevo</button>
                <div className="modal fade" id="modalCentro" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Crear nuevo centro educativo</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Escriba el nombre del centro</p>
                                <div className="form-group">
                                    <input className="form-control" type="text" value={this.state.name} name="name" id="nombreCentro" required onChange={this.handleChangeName}></input>
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




