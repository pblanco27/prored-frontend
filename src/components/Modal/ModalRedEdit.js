import React, { Component } from 'react'
import axios from 'axios';
import $ from "jquery";

export default class ModalRedEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
    }  

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleChangeType = event => {
        this.setState({ type: event.target.value });
    }

    handleSubmit = async event =>  {
        event.preventDefault();
        const network = {
            name: this.state.name,
            type: this.state.type, 
        };
        const resData = await axios.put(`/network/` + this.props.id_network, network)
        this.setState({ type: '' , name : ''});
        this.props.getNetwork();
        $("#modalRedEdit").modal("hide");
        alert("Se editó la red exitosamente")
    } 

    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalRedEdit">Editar actual</button>
                <div class="modal fade" id="modalRedEdit" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Editar la red</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">                                
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="tipoRed">Tipo de red</label>                                       
                                        <select id="tipoRed" class="form-control" name="type" onChange={this.handleChangeType} value = {this.state.type}>
                                            <option class="select-cs" value="" defaultValue>Seleccione el nuevo tipo de red</option>
                                            <option value="Municipalidad">Municipalidad</option>
                                            <option value="ONG">ONG</option>
                                            <option value="Asociaciones">Asociaciones</option>
                                            <option value="Grupo Artístico">Grupo Artístico</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="nombreRed">Reasigne el nombre</label>
                                        <input class="form-control" type="text" value= {this.state.name} name="name" id="nombreRed" required onChange={this.handleChangeName}></input>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                        <input type="submit" class="btn btn-primary" value="Guardar"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
