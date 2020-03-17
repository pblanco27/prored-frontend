import React, { Component } from 'react'
import ModalRed from '../Modal/ModalRed';
import ModalRedEdit from '../Modal/ModalRedEdit';
import CustomizedHook from "../CustomizedHook/CustomizedHook";
import SelectAuto from "../SelectAuto/SelectAuto"
import ModalInfoAdicional from '../Modal/ModalInfoAdicional';
import axios from 'axios'

export default class InfoGestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campuses: [],
            careers: [],
            networks: [],
            other_careers: [],
            id_network: 0
        }
    }

    getCampus = async () => {
        const res = await axios.get(`/campus`);
        const campusesData = res.data;
        campusesData.map(campus => this.state.campuses.push({ title: campus.name, id: campus.campus_code }))
    };

    getCareer = async () => {
        const res = await axios.get(`/career`);
        const careerData = res.data;
        careerData.map(career => this.state.careers.push({ title: career.name + "-" + career.degree, id: career.career_code }))
    };

    getAssociated = async () => {
        const res = await axios.get(`/associated_career_center`);
        const associatedData = res.data;
        this.setState({ other_careers: [] })
        associatedData.map(assocareer => this.state.other_careers.push({ title: assocareer.center_name + " - " + assocareer.associated_career_name, id: assocareer.id_associated_career }))
    };

    getNetwork = async () => {
        const res = await axios.get(`/network`);
        const networkData = res.data;
        this.setState({ networks: [] })
        networkData.map(network => this.state.networks.push({ title: network.name, id: network.id_network }))
    };

    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getAssociated();
        this.getNetwork();
    }

    onChangeNetwork = (event, values) => {
        if (values !== null) {
            this.setState({id_network:values.id})
        }
    }

    render() {
        return (
            <div id="container">
                <header>
                    <h4>Gestión de información</h4>
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
                            <br></br>
                            <div class="form-group">
                                <label for="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                                <CustomizedHook id="carreerUned" list={this.state.careers} />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <b>Información adicional</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-9">
                                        <label for="other_careers">Seleccione el (los) curso (s) que lleva</label>
                                        <CustomizedHook id="other_careers" list={this.state.other_careers} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalInfoAdicional getAssociated={this.getAssociated} />
                                    </div>
                                </div>
                            </div>
                            <b>Información de Red asociada</b>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-7">
                                        <label for="red">Lista de red (es) asociada (s)</label>
                                        <SelectAuto id="red" list={this.state.networks} onChange={this.onChangeNetwork} />
                                    </div>
                                    <div class="col-md-2">
                                        <br></br>
                                        <ModalRed getNetwork={this.getNetwork} />
                                    </div>
                                    <div class="col-md-1">
                                        <br></br>
                                        <ModalRedEdit id_network={this.state.id_network} getNetwork={this.getNetwork} />
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



