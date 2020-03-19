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
        if (this.props.id_center !== 0) {
            $("#modalAsso").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar un centro educativo de la lista.", "warning");
        }
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
        await axios.post(`/associated_career`, assocareer)
        this.setState({name: ''});
        this.props.getAssociatedCareer(this.props.id_center);
        // Dependiendo si vengo del modal, debo actualizar el select de mi grandparent        
        if (this.props.has_grand_parent) {
            this.props.getAssociated();
        }
        $("#modalAsso").modal("hide");
        swal("¡Listo!", "Se creó la nueva carrera asociada exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalAsso" onClick={this.validate}>Crear nueva</button>
                <div className="modal fade" id="modalAsso" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Crear nueva carrera asociada</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Escriba el nombre de la carrera</p>
                                <div className="form-group">
                                    <input className="form-control" type="text" value={this.state.name} name="name" id="nombreAsso" required onChange={this.handleChangeName}></input>
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




