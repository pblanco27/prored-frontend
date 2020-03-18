import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCentro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.validate = this.validate.bind(this);
    }

    validate() {
        console.log(this.props.id_center);
        if (this.props.id_center !== 0) {
            $("#modalCentroEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar un centro de la lista.", "warning");
        }
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const center = {
            name: this.state.name
        };
        await axios.put(`/center/` + this.props.id_center, center)
        this.setState({ name: '' });
        this.props.getCenter();
        $("#modalCentroEdit").modal("hide");
        swal("¡Listo!", "Se editó el centro exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalCentroEdit" onClick={this.validate}>Editar actual</button>
                <div className="modal fade" id="modalCentroEdit" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Editar centro educativo</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Escriba el nuevo nombre del centro</p>
                                    <div className="form-group">
                                        <input className="form-control" type="text" value={this.state.name} name="name" id="nombreCentro" required onChange={this.handleChangeName}></input>
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
            </div>
        )
    }
}




