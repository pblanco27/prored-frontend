import React, { Component } from 'react';
import ModalCentro from '../Modal/ModalCentro';
import ModalCentroEdit from '../Modal/ModalCentroEdit';
import ModalAsso from '../Modal/ModalAsso';
import ModalAssoEdit from '../Modal/ModalAssoEdit';
import ModalRed from '../Modal/ModalRed';
import ModalRedEdit from '../Modal/ModalRedEdit';
import CustomizedHook from "../CustomizedHook/CustomizedHook";
import SelectAuto from "../SelectAuto/SelectAuto";
import axios from 'axios';

export default class InfoGestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campuses: [],
            careers: [],
            centers: [],
            associated_careers: [],
            networks: [],
            id_center: 0,
            id_asso: 0,
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

    getCenter = async () => {
        const res = await axios.get(`/center`);
        const centerData = res.data;
        this.setState({ centers: [] });
        centerData.map(center => this.state.centers.push({ title: center.name, id: center.id_center }))
    };

    getAssociatedCareer = async (idCenter) => {
        const res = await axios.get(`/associated_career_from_center/` + idCenter);
        const assoData = res.data;
        this.setState({ associated_careers: [] });
        assoData.map(assocareer => this.state.associated_careers.push({ title: assocareer.name, id: assocareer.id_associated_career }))
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
        this.getCenter();
        this.getAssociatedCareer(0);
        this.getNetwork();
    }

    onChangeCenter = (event, values) => {
        this.setState({ associated_careers: [] });

        if (values !== null) {
            this.setState({ id_center: values.id });
            this.getAssociatedCareer(values.id);
        } else {
            this.setState({ id_center: 0 });
        }
    }

    onChangeCareer = (event, values) => {
        if (values !== null) {
            this.setState({ id_asso: values.id });
        } else {
            this.setState({ id_asso: 0 });
        }
    }

    onChangeNetwork = (event, values) => {
        if (values !== null) {
            this.setState({ id_network: values.id })
        } else {
            this.setState({ id_network: 0 });
        }
    }

    render() {
        return (
            <div id="container">
                <header>
                    <h4>Gestión de información</h4>
                </header>
                <center>A continuación se presentan las listas de opciones que puede cambiar</center><br></br>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                        <b>Información académica (UNED)</b>
                        <div className="form-group">
                            <label htmlFor="centroUniversitario">Centro Universitario</label> <br></br>
                            <CustomizedHook id="centroUniversitario" list={this.state.campuses} />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label htmlFor="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                            <CustomizedHook id="carreerUned" list={this.state.careers} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <b>Información adicional</b>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="center_select">Lista de centros educativos</label>
                                    <SelectAuto
                                        id="center_select"
                                        list={this.state.centers}
                                        onChange={this.onChangeCenter}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <br></br>
                                    <ModalCentro getCenter={this.getCenter} />
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalCentroEdit
                                        id_center={this.state.id_center}
                                        getCenter={this.getCenter}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="asso_career_select">Lista de carreras asociadas</label>
                                    <SelectAuto
                                        id="asso_career_select"
                                        list={this.state.associated_careers}
                                        onChange={this.onChangeCareer}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <br></br>
                                    <ModalAsso
                                        id_center={this.state.id_center}
                                        getAssociatedCareer={this.getAssociatedCareer}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalAssoEdit
                                        id_asso={this.state.id_asso}
                                        id_center={this.state.id_center}
                                        has_grand_parent={true}
                                        getAssociatedCareer={this.getAssociatedCareer}
                                    />
                                </div>
                            </div>
                        </div>

                        <b>Información de Red asociada</b>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="red">Lista de redes asociadas</label>
                                    <SelectAuto
                                        id="red"
                                        list={this.state.networks}
                                        onChange={this.onChangeNetwork}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <br></br>
                                    <ModalRed getNetwork={this.getNetwork} />
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalRedEdit
                                        id_network={this.state.id_network}
                                        getNetwork={this.getNetwork}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <br></br>
            </div>
        )
    }
}



