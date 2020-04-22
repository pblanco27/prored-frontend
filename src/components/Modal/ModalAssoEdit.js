import React, { Component } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la edición de una carrera asociada
*/

export default class ModalAsso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.validateShow = this.validateShow.bind(this);
    }

    /*
        Función que valida si el componente debe mostrarse, dependiendo 
        de las propiedades que le entran por parámetro. En este caso el
        id de la carrera asociada debe estar definido.
    */
    validateShow() {
        if (this.props.id_asso !== 0) {
            this.setState({ name: this.props.asso_name});
            $("#assoEditNameError").hide();
            $("#modalAssoEdit").modal("toggle");
        } else {
            swal("¡Atención!", "Debe seleccionar una carrera asociada de la lista.", "warning");
        }
    }

    /*
        Función que valida el formato del nombre ingresado
        por medio de una expresión regular
    */
    async validateField(value, element_id) {
        var error = "";
        const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (value.length > 40){
            error = "Este campo puede tener un máximo de 40 caracteres"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()';
        }
        $(element_id).text(error);
        if (error !== "") $(element_id).show(); else $(element_id).hide();
        this.setState({ hasError: error !== "" });
    }

    /*
        Función que asigna el nombre ingresado en la 
        variable correspondiente del estado
    */
    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    /*
        Función que maneja el envío del formulario.
        Se encarga de editar la carrera asociada si no se presentan
        errores en el nombre ingresado.
    */
    handleSubmit = async event => {
        event.preventDefault();
        await this.validateField(this.state.name, "#assoEditNameError");
        if (!this.state.hasError) {
            const assocareer = {
                name: this.state.name
            };
            await axios.put(`/associated_career/` + this.props.id_asso, assocareer)
            this.setState({ name: '' });            
            $("#modalAssoEdit").modal("hide");
            swal("¡Listo!", "Se editó la carrera asociada exitosamente.", "success");
            this.props.refreshThis(); 
        }
    }

    // Función que renderiza el componente para mostrarlo en pantalla
    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary btn-sm" data-target="#modalAssoEdit" onClick={this.validateShow}>Editar actual</button>
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
                                    <input
                                        className="form-control"                                        
                                        type="text"
                                        id="nombreAsso"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChangeName}>
                                    </input>
                                    <div
                                        className="alert alert-danger"
                                        style={{ display: "none", fontSize: 12 }}
                                        id="assoEditNameError">
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




