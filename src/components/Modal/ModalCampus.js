import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCampus extends Component {
    state = {
        name: '',
        campus_code: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeCode = event => {
        this.setState({ campus_code: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const campus = {
            name: this.state.name,
            code: this.state.campus_code
        };
        await axios.post(`/campus`, campus)
        this.setState({ name: '', campus_code: ''});
        this.props.getCampus();
        $("#modalCampus").modal("hide");
        swal("¡Listo!", "Se creó el nuevo campus universitario exitosamente.", "success");
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalCampus">Crear nuevo</button>
                <div className="modal fade" id="modalCampus" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Crear nuevo campus universitario</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="campusCode">Código del campus</label>
                                    <input className="form-control" type="text" value={this.state.campus_code} name="campus_code" id="campusCode" required onChange={this.handleChangeCode}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreCampus">Nombre</label>
                                    <input  className="form-control" type="text" value={this.state.name} 
                                            name="name" id="nombreCampus" required onChange={this.handleChangeName}></input>
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




