import React, { Component } from 'react';
import ModalCampus from '../Modal/ModalCampus';
import ModalCampusEdit from '../Modal/ModalCampusEdit';
import ModalCareer from '../Modal/ModalCareer';
import ModalCareerEdit from '../Modal/ModalCareerEdit';
import ModalCentro from '../Modal/ModalCentro';
import ModalCentroEdit from '../Modal/ModalCentroEdit';
import ModalAsso from '../Modal/ModalAsso';
import ModalAssoEdit from '../Modal/ModalAssoEdit';
import ModalRed from '../Modal/ModalRed';
import ModalRedEdit from '../Modal/ModalRedEdit';
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
            campus_code: '',
            campus_name: '',
            career_code: '',
            career_name: '',
            career_degree: '',
            id_center: 0,
            center_name: '',
            id_asso: 0,
            asso_name: '',
            id_network: 0,
            network_name: '',
            network_type: ''
        }
        this.assoRef = React.createRef();
    }

    getCampus = async () => {
        const res = await axios.get(`/campus`);
        const campusesData = res.data;
        this.setState({ campuses: [] });
        campusesData.map(campus => this.state.campuses.push({ title: campus.campus_code + " - " + campus.name, name: campus.name, id: campus.campus_code }))
    };

    getCareer = async () => {
        const res = await axios.get(`/career`);
        const careerData = res.data;
        this.setState({ careers: [] });
        careerData.map(career => this.state.careers.push({ title: career.career_code + " - " + career.degree + " - " + career.name, name: career.name, degree: career.degree, id: career.career_code }))
    };

    getCenter = async () => {
        const res = await axios.get(`/center`);
        const centerData = res.data;
        this.setState({ centers: [] });
        centerData.map(center => this.state.centers.push({ title: center.name, name: center.name, id: center.id_center }))
    };

    getAssociatedCareer = async (idCenter) => {
        const res = await axios.get(`/associated_career_from_center/` + idCenter);
        const assoData = res.data;
        this.setState({ associated_careers: [] });
        assoData.map(assocareer => this.state.associated_careers.push({ title: assocareer.name, name: assocareer.name, id: assocareer.id_associated_career }))
    };

    getNetwork = async () => {
        const res = await axios.get(`/network`);
        const networkData = res.data;
        this.setState({ networks: [] })
        networkData.map(network => this.state.networks.push({ title: network.name, name: network.name, type: network.network_type, id: network.id_network }))
    };

    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getCenter();
        this.getAssociatedCareer(0);
        this.getNetwork();
    }

    onChangeCampus = (event, values) => {
        if (values !== null) {
            this.setState({ campus_code: values.id, campus_name: values.name })
        } else {
            this.setState({ campus_code: '' });
        }
    }

    onChangeCareer = (event, values) => {
        if (values !== null) {
            this.setState({ career_code: values.id, career_name: values.name, career_degree: values.degree })
        } else {
            this.setState({ career_code: '' });
        }
    }

    onChangeCenter = (event, values) => {
        this.setState({ associated_careers: [] });  
        // Actualizamos el componente del select con las carreras asociadas
        var key = parseInt(this.assoRef.current._reactInternalFiber.key);
        this.assoRef.current._reactInternalFiber.key = key + 1;
        //
        if (values !== null) {
            this.setState({ id_center: values.id, center_name: values.name });
            this.getAssociatedCareer(values.id);
        } else {
            this.setState({ id_center: 0 });
        }
    }

    onChangeAsso = (event, values) => {
        if (values !== null) {
            this.setState({ id_asso: values.id, asso_name: values.name });
        } else {
            this.setState({ id_asso: 0 });
        }
    }

    onChangeNetwork = (event, values) => {
        if (values !== null) {
            this.setState({ id_network: values.id, network_name: values.name, network_type: values.type })
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
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="centroUniversitario">Campus universitarios</label> <br></br>
                                    <SelectAuto
                                        id="centroUniversitario"
                                        list={this.state.campuses}
                                        onChange={this.onChangeCampus}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <br></br>
                                    <ModalCampus getCampus={this.getCampus} />
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalCampusEdit
                                        campus_code={this.state.campus_code}
                                        campus_name={this.state.campus_name}
                                        getCampus={this.getCampus}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="carreerUned">Carreras disponibles</label>
                                    <SelectAuto
                                        id="carreerUned"
                                        list={this.state.careers}
                                        onChange={this.onChangeCareer}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <br></br>
                                    <ModalCareer getCareer={this.getCareer} />
                                </div>
                                <div className="col-md-1">
                                    <br></br>
                                    <ModalCareerEdit
                                        career_code={this.state.career_code}
                                        career_name={this.state.career_name}
                                        career_degree={this.state.career_degree}
                                        getCareer={this.getCareer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <b>Información adicional</b>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="center_select">Centros educativos</label>
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
                                        center_name={this.state.center_name}
                                        getCenter={this.getCenter}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="asso_career_select">Carreras asociadas al centro</label>
                                    <SelectAuto
                                        key="1"
                                        ref={this.assoRef}
                                        id="asso_career_select"
                                        list={this.state.associated_careers}
                                        onChange={this.onChangeAsso}
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
                                        asso_name={this.state.asso_name}
                                        id_center={this.state.id_center}
                                        has_grand_parent={true}
                                        getAssociatedCareer={this.getAssociatedCareer}
                                    />
                                </div>
                            </div>
                        </div>
                        <b>Información de redes</b>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-7">
                                    <label htmlFor="red">Redes asociadas</label>
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
                                        network_name={this.state.network_name}
                                        network_type={this.state.network_type}
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



