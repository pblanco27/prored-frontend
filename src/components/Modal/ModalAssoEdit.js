import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalAsso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.validate = this.validate.bind(this);
    }

    validate() {
        console.log(this.props.id_asso);
        if (this.props.id_asso !== 0) {
            $("#modalAssoEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar una carrera asociada de la lista.", "warning");
        }
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const assocareer = {
            name: this.state.name
        };
        await axios.put(`/associated_career/` + this.props.id_asso, assocareer)
        this.setState({ name: '' });
        this.props.getAssociatedCareer(this.props.id_center);
        $("#modalAssoEdit").modal("hide");
        swal("¡Listo!", "Se editó la carrera asociada exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalAssoEdit" onClick={this.validate}>Editar actual</button>
                <div className="modal fade" id="modalAssoEdit" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Editar carrera asociada</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Escriba el nuevo nombre de la carrera</p>
                                <div className="form-group">
                                    <input className="form-control" type="text" value={this.state.name} name="name" id="nombreAsso" required onChange={this.handleChangeName}></input>
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
        )
    }
}




