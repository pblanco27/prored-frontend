import React, { Component } from 'react'
import ModalRed from '../Modal/ModalRed';
import CustomizedHook from "../CustomizedHook/CustomizedHook";
import ModalInfoAdicional from '../Modal/ModalInfoAdicional';
import axios from 'axios'

const redes = [
    { title: 'ONU' },
    { title: 'Municipalidad de Heredia' },
    { title: 'Grupo de baile folclórico' }
];

export default class AcademicInfo extends Component {
    state = {
        campuses: [],
        careers: [],
        associatedCareers: [],         
        networks:[]
    }

    getCampus = async () => {
        const res = await axios.get(`/campus`);
        const campusesData = res.data;
        this.setState({ campusesData });
        this.state.campusesData.map(campus => this.state.campuses.push({ title: campus.name, id: campus.campus_code}))
    };

    getCareer = async () => {
        const res = await axios.get(`/career`);
        const careerData = res.data;
        this.setState({ careerData });
        this.state.careerData.map(career => this.state.careers.push({ title: career.name + "-" + career.degree, id: career.career_code}))
    };

    getAssociatedCareer = async () => {
        const res = await axios.get(`/associated_career`);
        const assoData = res.data;
        this.setState({ assoData });
        {this.state.assoData.map(assocareer => this.state.associatedCareers.push({ title: assocareer.name, id: assocareer.id_associated_career}))}
    };

    getNetwork = async () => {
        const res = await axios.get(`/network`);
        const networkData = res.data;
        this.setState({ networkData });
        this.state.networkData.map(network => this.state.networks.push({ title: network.name, id: network.id_network}))
    };

    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getAssociatedCareer();
        this.getNetwork();
    }

    render() {
        return (
            <div id="container">
                <header>
                    <h4>Información Académica</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <b>Información académica (UNED)</b>
                            <div class="form-group">
                                <label for="centroUniversitario">Centro Universitario</label> <br></br>
                                <CustomizedHook id="centroUniversitario" list={this.state.campuses} />
                            </div>
                            <div class="form-group">
                                <label for="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                                <CustomizedHook id="carreerUned" list={this.state.careers} />
                            </div>
                            <div class="form-group">
                                <label>Grado Académico</label><br></br>
                                <select class="form-control" name="academicLevel" required>
                                    <option class="select-cs" value="" label="Seleccione el grado académico" selected="selected">Seleccione el grado</option>
                                    <option value="0">Técnico</option>
                                    <option value="1">Diplomado</option>
                                    <option value="2">Bachiller</option>
                                    <option value="3">Licenciatura</option>
                                    <option value="4">Máster</option>
                                    <option value="5">Doctor</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <b>Información adicional</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="red">Seleccione el (los) curso (s) que lleva</label>
                                        <CustomizedHook id="cursos" list={this.state.associatedCareers} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalInfoAdicional />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <b>Información de Red asociada</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="red">Seleccione la (s) red (es) asociada (s)</label>
                                        <CustomizedHook id="red" list={this.state.networks} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalRed />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





