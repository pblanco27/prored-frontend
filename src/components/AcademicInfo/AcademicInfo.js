import React, { Component } from 'react'
import ModalRed from '../Modal/ModalRed';
import CustomizedHook from "../CustomizedHook/CustomizedHook";
import ModalInfoAdicional from '../Modal/ModalInfoAdicional';
import axios from 'axios'
import SelectAuto from '../SelectAuto/SelectAuto';

export default class AcademicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campuses: [],
            careers: [],
            networks: [],
            other_careers: [],
            languages: [],
            default_campus: '',
            default_careers: [],
            default_networks: [],
            default_other_careers: [],
            default_languages: [],
            selected_campus: '',
            selected_careers: [],
            selected_networks: [],
            selected_other_careers: [],
            selected_languages: [],
        }
    }

    onChangeLanguage = (event, values) => {
        this.setState({ selected_languages: [] });
        const lenguajesX = [];
        values.map(language => lenguajesX.push(language.id));
        this.setState({ selected_languages: lenguajesX });
    }

    onChangeCampus = (event, values) => {
        if (values.id !== null) {
            this.setState({ selected_campus: values.id });
        }
    };

    onChangeCareers = (event, values) => {
        this.setState({ selected_careers: [] });
        const careersX = [];
        values.map(career => careersX.push(career.id));
        this.setState({ selected_careers: careersX });
    };

    onChangeNetworks = (event, values) => {
        this.setState({ selected_networks: [] });
        const networksX = [];
        values.map(network => networksX.push(network.id));
        this.setState({ selected_networks: networksX });
    };

    onChangeAssociatedCareer = (event, values) => {
        console.log(values);
        this.setState({ selected_other_careers: [] });
        const otherCareerX = [];
        values.map(otherCareer => otherCareerX.push(otherCareer.id));
        this.setState({ selected_other_careers: otherCareerX });
    };

    getCampus = async () => {
        const res = await axios.get(`/campus`);
        const campusesData = res.data;
        campusesData.map(campus => this.state.campuses.push({ title: campus.name, id: campus.campus_code }))
    };

    getCareer = async () => {
        const res = await axios.get(`/career`);
        const careerData = res.data;
        careerData.map(career => this.state.careers.push({ title: career.degree + " - " + career.name, id: career.career_code }))
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

    getLanguage = async () => {
        const res = await axios.get(`/language`);
        const languageData = res.data;
        languageData.map(language => this.state.languages.push({ title: language.name, id: language.id_language }))
    };

    async getAcademicInfo() {
        const student = {
            "dni": "116920331",
            "name": "Gabriel",
            "lastname1": "Solórzano",
            "lastname2": "Chanto",
            "born_dates": "1997-10-31T06:00:00.000Z",
            "id_district": 1,
            "district": "Piedades",
            "campus_code": "C1",
            "campus": "Heredia",
            "marital_status": "Soltero",
            "profile": "Avanzado",
            "address": "San Bosco de Santa Bárbara",
            "nationality": "CR"
        }
        const careers = [
            {
                "career_code": 1,
                "name": "Career 1",
                "degree": "Diplomado"
            }
        ];
        const networks = [
            {
                "id_network": 1,
                "name": "Municipalidad Heredia",
                "network_type": "Municipalidad"
            }
        ];
        const asso_careers = [
            {
                "id_associated_career": 1,
                "associated_career": "Compu",
                "id_center": 1,
                "center": "Center 1"
            }
        ];
        const languages = [
            {
                "id_language": 1,
                "name": "Language 1"
            }
        ];
        var career_list = [];
        var network_list = [];
        var assocareer_list = [];
        var language_list = [];
        //var language_ids = [];
        careers.map(career => career_list.push({ title: career.degree + " - " + career.name, id: career.career_code }));
        networks.map(network => network_list.push({ title: network.name, id: network.id_network }));
        asso_careers.map(assocareer => assocareer_list.push({ title: assocareer.center + " - " + assocareer.associated_career, id: assocareer.id_associated_career }));
        languages.map(language => language_list.push({ title: language.name, id: language.id_language }));
        //languages.map(language => language_ids.push(language.id_language));
        await this.setState({
            default_campus: { title: student.campus, id: student.campus_code },
            default_careers: career_list,
            default_networks: network_list,
            default_other_careers: assocareer_list,
            default_languages: language_list,
            //selected_languages: language_ids
        });
        console.log(this.state.languages);
        console.log(this.state.default_languages);
    }

    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getAssociated();
        this.getNetwork();
        this.getLanguage();
        if (this.props.parent === "ver") this.getAcademicInfo();
    }

    renderCampusSelect() {
        if (this.props.parent === "ver" && this.state.default_campus !== "") {
            return <SelectAuto
                id="centroUniversitario"
                list={this.state.campuses}
                value={this.state.default_campus}
                onChange={this.onChangeCampus}
            />;
        } else if (this.props.parent === "registro") {
            return <SelectAuto
                id="centroUniversitario"
                list={this.state.campuses}
                value={null}
                onChange={this.onChangeCampus}
            />;
        } else {
            return "";
        }
    }

    renderCareerSelect() {
        if (this.props.parent === "ver" && JSON.stringify(this.state.default_careers) !== JSON.stringify([])) {
            return <CustomizedHook
                id="careerUned"
                list={this.state.careers}
                value={this.state.default_careers}
                onChangeHook={this.onChangeCareers}
            />;
        } else if (this.props.parent === "registro") {
            return <CustomizedHook
                id="careerUned"
                list={this.state.careers}
                value={[]}
                onChangeHook={this.onChangeCareers}
            />;
        } else {
            return "";
        }
    }

    renderLanguageSelect() {
        if (this.props.parent === "ver" && JSON.stringify(this.state.default_languages) !== JSON.stringify([])) {
            return <CustomizedHook
                id="languages"
                list={this.state.languages}
                value={this.state.default_languages}
                onChangeHook={this.onChangeLanguage}
            />
        } else if (this.props.parent === "registro") {
            return <CustomizedHook
                id="languages"
                list={this.state.languages}
                value={[]}
                onChangeHook={this.onChangeLanguage}
            />
        } else {
            return "";
        }
    }

    renderAssoCareerSelect() {
        if (this.props.parent === "ver" && JSON.stringify(this.state.default_other_careers) !== JSON.stringify([])) {
            return <CustomizedHook
                id="other_careers"
                list={this.state.other_careers}
                value={this.state.default_other_careers}
                onChangeHook={this.onChangeAssociatedCareer}
            />
        } else if (this.props.parent === "registro") {
            return <CustomizedHook
                id="other_careers"
                list={this.state.other_careers}
                value={[]}
                onChangeHook={this.onChangeAssociatedCareer}
            />;
        } else {
            return "";
        }
    }

    renderNetworkSelect() {
        if (this.props.parent === "ver" && JSON.stringify(this.state.default_networks) !== JSON.stringify([])) {
            return <CustomizedHook
                id="red"
                list={this.state.networks}
                value={this.state.default_networks}
                onChangeHook={this.onChangeNetworks}
            />;
        } else if (this.props.parent === "registro") {
            return <CustomizedHook
                id="red"
                list={this.state.networks}
                value={[]}
                onChangeHook={this.onChangeNetworks}
            />;
        } else {
            return "";
        }
    }

    render() {
        return (
            <div id="container">
                <header>
                    <h4>Información Académica</h4>
                </header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <b>Información académica (UNED)</b>
                            <div className="form-group">
                                <label htmlFor="centroUniversitario">Centro Universitario</label> <br></br>
                                {this.renderCampusSelect()}
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="careerUned">Seleccione la (s) carrera (s) que cursa</label>
                                {this.renderCareerSelect()}
                            </div>
                        </div>
                        {this.props.load ?
                            <div className="col-md-5">
                                <b>Información adicional</b>
                                <div className="form-group">
                                    <label htmlFor="languages">Seleccione el (los) idioma (s) que habla</label>
                                    {this.renderLanguageSelect()}
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <label htmlFor="other_careers">Seleccione el (los) curso (s) que lleva</label>
                                            {this.renderAssoCareerSelect()}
                                        </div>
                                        <div className="col-md-1">
                                            <br></br>
                                            <ModalInfoAdicional getAssociated={this.getAssociated} />
                                        </div>
                                    </div>
                                </div>
                                <b>Información de Red asociada</b>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <label htmlFor="red">Seleccione la (s) red (es) asociada (s)</label>
                                            {this.renderNetworkSelect()}
                                        </div>
                                        <div className="col-md-1">
                                            <br></br>
                                            <ModalRed getNetwork={this.getNetwork} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





