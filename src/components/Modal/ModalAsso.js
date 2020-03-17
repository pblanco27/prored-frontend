import React, { Component } from 'react'
import axios from 'axios';
import $ from "jquery";


export default class ModalAsso extends Component {
    state = {
        name: '',
        id_center: 0
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const assocareer = {
            name: this.state.name,
            id_center: this.props.id_center
        };
        const resData = await axios.post(`/associated_career`, assocareer)
        this.setState({ name: '', id_center: 0});
        this.props.getAssociatedCareer(this.props.id_center);
        this.props.getAssociated();
        $("#modalAsso").modal("hide");
        alert("Se creó la nueva carrera asociada exitosamente")
    }

    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalAsso">Crear nueva</button>

                <div class="modal fade" id="modalAsso" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva carrera asociada</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div class="modal-body">
                                    <p>Escriba el nombre de la carrera</p>
                                    <div class="form-group">
                                        <input class="form-control" type="text" value={this.state.name} name="name" id="nombreAsso" required onChange={this.handleChangeName}></input>
                                        <input type="hidden" value={this.state.id_center} name="id_center" id="id_center" required></input>
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




