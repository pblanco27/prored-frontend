import React, { Component } from 'react'
import ModalCarrera from './ModalCarrera';
import ModalCentro from './ModalCentro';
import CustomizedHook from '../CustomizedHook/CustomizedHook'
import axios from 'axios';

export default class ModalInfoAdicional extends Component {
    state = {
        centers: [],
        associatedCareers: [], 
    }

    getCenter = async () => {
        const res = await axios.get(`/center`);
        const centerData = res.data;
        this.setState({ centerData });
        {this.state.centerData.map(center => this.state.centers.push({ title: center.name, id: center.id_center}))}
    };

    getAssociatedCareer = async () => {
        const res = await axios.get(`/associated_career`);
        const assoData = res.data;
        this.setState({ assoData });
        {this.state.assoData.map(assocareer => this.state.associatedCareers.push({ title: assocareer.name, id: assocareer.id_associated_career}))}
    };

    componentDidMount() {
        this.getCenter();
        this.getAssociatedCareer();
    }


    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalInfoAdicional">Crear nueva</button>

                <div class="modal fade" id="modalInfoAdicional" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva carrera</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <label for="centroEducativo">Centro Educativo</label> <br></br>
                                                <CustomizedHook id="centroEducativo" list={this.state.centers} />
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCentro />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <label for="aditionalCareer">Carrera</label>
                                                <CustomizedHook id="aditionalCareer" list={this.state.associatedCareers} />
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCarrera />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}