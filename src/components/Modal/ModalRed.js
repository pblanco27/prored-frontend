import React, { Component } from 'react'
import axios from 'axios';



export default class ModalRed extends Component {
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

    handleSubmit = async (event) =>  {
        event.preventDefault();
        const network = {
            name: this.state.name,
            type : this.state.type, 
        };
        console.log(network);
        const resData = await axios.post(`/network`, network )
        console.log(resData.data);
        this.setState({ type: '' , name : ''});
        this.props.fun();
      
    } 
    

    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalRed">Crear nueva</button>
                <div class="modal fade" id="modalRed" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva red</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">                                
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="tipoRed">Tipo de red</label>
                                        <select class="form-control" name="name" onChange={this.handleChangeType} value = {this.state.type}>
                                            <option class="select-cs" value="" label="Seleccione la red" selected="selected">Seleccione la red</option>
                                            <option value="Municipalidad">Municipalidad</option>
                                            <option value="ONG">ONG</option>
                                            <option value="Asociaciones">Asociaciones</option>
                                            <option value="Grupo Artístico">Grupo Artístico</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="nombreRed">Nombre</label>
                                        <input class="form-control" type="text" value= {this.state.name} name="type" id="nombreRed" required onChange={this.handleChangeName}></input>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                        <input type="submit" class="btn btn-primary" data-dismiss="modal" value="Aceptar" onClick = {this.handleSubmit} />
                                      
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




