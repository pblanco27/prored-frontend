import React, { Component } from 'react'

export default class Vinculacion extends Component {
    state = {
        disabled: ""
    }

    componentDidMount(){
        if (this.props.type === "professor"){
            const disabled = "disabled"
            this.setState({disabled})                       
        } 
    }

    render() {
        return (            
            <div id="container">
                <header><h4>Sección de vinculación</h4></header>
                <div id="part-1">
                    <br></br>
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="tipoVinculado">Tipo de vinculado: </label>
                                <select class="form-control" >
                                    <option class="select-cs" value="" selected="selected">Seleccione el tipo de vinculado</option>
                                    <option value="1">Estudiante</option>
                                    <option value="2">Profesor</option>
                                    {/* <option value="3">Investigador</option>
                                    <option value="4">Asistente</option> */}
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="tipoVinculacion">Tipo de vinculación:   </label><br></br>
                                <h1>{this.state.disabled}</h1>
                                <select class="form-control" >                                    
                                    <option class="select-cs" value="" selected="selected">Seleccione el tipo de vinculación</option>
                                    <option value="1">Básico</option>
                                    <option value="2">Medio</option>
                                    <option value="3">Avanzado</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    <br></br>
                </div>
            </div>
        )
    }
}

