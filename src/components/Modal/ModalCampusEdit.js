import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

export default class ModalCampus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.validateShow = this.validateShow.bind(this);
    }

    validateShow() {
        if (this.props.campus_code !== '') {
            this.setState({name: this.props.campus_name})
            $("#modalCampusEdit").modal("toggle");          
        } else {
            swal("¡Atención!", "Debe seleccionar un campus universitario de la lista.", "warning");
        }
    }

    async validateField(value, element_id) {
        var error = "";
        const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
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

    handleSubmit = async event => {
        event.preventDefault();
        await this.validateField(this.state.name, "#campusEditNameError");
        if (!this.state.hasError) {
            const campus = {
                name: this.state.name
            };
            await axios.put(`/campus/` + this.props.campus_code, campus);
            this.setState({ name: '', campus_code: '' });
            this.props.getCampus();
            $("#modalCampusEdit").modal("hide");
            swal("¡Listo!", "Se editó el campus universitario exitosamente.", "success");
        }        
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalCampusEdit" onClick={this.validateShow}>Editar actual</button>
                <div className="modal fade" id="modalCampusEdit" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Editar campus universitario</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="nombreCampus">Nombre del campus</label>
                                    <input
                                        className="form-control"                                        
                                        type="text"
                                        id="nombreCampus"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="campusEditNameError">
                                    </div>
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




