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
            networks:[],
            other_careers:[],
            languages: [],
            selected_languages: [],  
            selected_campus : '',
            selected_careers: [],        
            selected_networks:[],
            selected_other_careers:[], 

        }
    }


    getLanguage = async () => {
        const res = await axios.get(`/language`);
        const languageData = res.data;
        languageData.map(language => this.state.languages.push({ title: language.name, id: language.id_language }))
    };

    onChangeLanguage = (event, values) => {     
        this.setState({selected_languages: []});
        const lenguajesX = [] ;
        values.map(language => lenguajesX.push(language.id));
        this.setState({selected_languages: lenguajesX});
    }


    onChangeCampus = (event, values) => {
        if (values.id != null){ 
            this.setState({selected_campus: values.id});
        }
    };


    onChangeCareers= (event, values) => {     
        this.setState({selected_careers: []});
        const careersX = [] ;
        values.map(career => careersX.push(career.id));
        this.setState({selected_careers: careersX});
    };

    onChangeNetworks= (event, values) => {    
        this.setState({selected_networks: []});
        const networksX = [] ;
        values.map(network => networksX.push(network.id));
        this.setState({selected_networks: networksX});
    };

    onChangeAssociatedCareer= (event, values) => {   
        console.log(values) ;
        this.setState({selected_other_careers: []});
        const otherCareerX = [] ;
        values.map(otherCareer => otherCareerX.push(otherCareer.id));
        this.setState({selected_other_careers: otherCareerX});
    };
    
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
        this.setState({other_careers: []})
        associatedData.map(assocareer => this.state.other_careers.push({ title: assocareer.center_name + " - " + assocareer.associated_career_name, id: assocareer.id_associated_career }))
    };

    getNetwork = async () => {
        const res = await axios.get(`/network`);
        const networkData = res.data;
        this.setState({networks: []})
        networkData.map(network => this.state.networks.push({ title: network.name, id: network.id_network }))
    };

    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getAssociated();
        this.getNetwork();
        this.getLanguage();
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
                                <SelectAuto id="centroUniversitario" list={this.state.campuses} onChange = {this.onChangeCampus}/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                                <CustomizedHook id="carreerUned" list={this.state.careers} onChangeHook = {this.onChangeCareers}/>
                            </div>
                        </div>
                        {this.props.load ?  
                        <div className="col-md-5">
                            <b>Información adicional</b>
                            <div className="form-group">
                                <label htmlFor="languages">Seleccione el (los) idioma (s) que habla</label>
                                <CustomizedHook
                                    id="languages"
                                    list={this.state.languages}
                                    onChangeHook={this.onChangeLanguage}
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-9">
                                        <label htmlFor="other_careers">Seleccione el (los) curso (s) que lleva</label>
                                        <CustomizedHook id="other_careers" list={this.state.other_careers} onChangeHook = {this.onChangeAssociatedCareer}/>
                                    </div>
                                    <div className="col-md-1">
                                        <br></br>
                                        <ModalInfoAdicional getAssociated = {this.getAssociated}/>
                                    </div>
                                </div>
                            </div>
                            <b>Información de Red asociada</b>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-9">
                                        <label htmlFor="red">Seleccione la (s) red (es) asociada (s)</label>
                                        <CustomizedHook id="red" list={this.state.networks} onChangeHook = {this.onChangeNetworks}/>
                                    </div>
                                    <div className="col-md-1">
                                        <br></br>
                                        <ModalRed getNetwork = {this.getNetwork} />
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





