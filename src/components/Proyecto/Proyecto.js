import React, { Component } from 'react'
import CustomizedHook from './CustomizedHook'

export default class Proyecto extends Component {
    render() {
        return (
            <div>
                <div id="container">
                    <header><h4>Registro de proyecto</h4></header>
                    <center>Los campos marcados con * son requeridos</center><br></br>
                    <div id="part-1">
                        <form>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label >Nombre del proyecto</label>
                                        <input class="form-control" type="text" name="first-name" id="pr-name" ></input>
                                    </div>
                                </div>
                                <br></br>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label>Código de proyecto</label>
                                        <input class="form-control" type="number" name="prcode" min="0" max="100" id="prcode" ></input>
                                    </div>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                            <div >
                                <div class="row">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label for="vinculadosProyecto">Seleccione los vinculados del proyecto</label>
                                            <CustomizedHook id="vinculadosProyecto" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="col-md-5"></div>
                                    <div class="col-md-1"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br></br>
                </div>
                <center><button type="submit" class="btn btn-lg btn-success" onClick="">Registrar</button></center>
                <br></br>
            </div>
        )
    }
}

