import React, { Component } from 'react'
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
        const resData = await axios.post(`/center`, center)
        this.setState({ name: '' });
        this.props.getCenter();
        $("#modalCentro").modal("hide");
        alert("Se creó el nuevo centro exitosamente")
    }

    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCentro">Crear nuevo</button>

                <div class="modal fade" id="modalCentro" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nuevo centro educativo</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div class="modal-body">
                                    <p>Escriba el nombre del centro</p>
                                    <div class="form-group">
                                        <input class="form-control" type="text" value={this.state.name} name="name" id="nombreCentro" required onChange={this.handleChangeName}></input>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                    <input type="submit" class="btn btn-primary" value="Crear" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}




