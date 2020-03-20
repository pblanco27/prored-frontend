import React, { Component } from 'react'
import CustomizedHook from '../CustomizedHook/CustomizedHook'
import './PersonalData.css';
import axios from 'axios'
import CountrySelect from '../CountrySelect/CountrySelect';

export default class PersonalData extends Component {
    state = {
        provinces: [],
        cantons: [],
        districts: [],
        selectedProvince: '',
        selectedCanton: '',
        selectedDistrict: '0',
        nombre : '', 
        primerApellido : '',
        segundoApellido : '',
        fechaNacimiento : '',
        cedula : '',
        estadoCivil : '',
        pais : '',
        direccion : '',
        residente : true,
    }

    getProvince = async () => {
        const res = await axios.get(`/province`);
        const provinceData = res.data;
        this.setState ({  provinces : provinceData });
    };

    onChangeProvincia = (event) => {
        const opcion = event.target.value;
        this.state.selectedProvince = opcion;
        this.state.cantons = [];
        this.state.districts = [];
        this.getCanton();
    }

    getCanton = async () => {
        const res = await axios.get(`/province/` + this.state.selectedProvince + '/canton');
        const cantonData = res.data;
        this.setState ({  cantons : cantonData });
    };

    onChangeCanton = (event) => {
        var opcion = event.target.value;
        this.state.selectedCanton = opcion;
        this.state.districts = [];
        this.getDistrict();
    }

    getDistrict = async () => {
        const res = await axios.get('/canton/' + this.state.selectedCanton + '/district');
        const districtData = res.data;
        this.setState ({  districts : districtData });
    };

    onSelectDistrict = (event) => {
        var id = event.target.value;
        this.state.selectedDistrict = id ;
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

    onChangeCountry = (event, values) => {     
        this.setState({pais: values.code});
    }

    onChangeNombre = (event) => {
        var opcion = event.target.value;
        this.setState({ nombre: opcion });
    }

    onChangePrimerApellido = (event) => {
        var opcion = event.target.value;
        this.setState({ primerApellido: opcion });
    }

    onChangeSegundoApellido = (event) => {
        var opcion = event.target.value;
        this.setState({ segundoApellido: opcion });
    }

    onChangeFecha = (event) => {
        var opcion = event.target.value;
        this.setState({ fechaNacimiento: opcion });
    }

    onChangeCedula = (event) => {
        var opcion = event.target.value;
        this.setState({ cedula: opcion });
    }

    onChangeDireccion = (event) => {
        var opcion = event.target.value;
        this.setState({ direccion: opcion });
    }

    onChangeMaritalStatus = (event) => {
        var opcion = event.target.value;
        this.setState({ estadoCivil: opcion });
    }

    onChangeResidente = (event) => {
        if (this.state.residente){
            this.setState({residente : false});
        }
        else{
            this.setState({residente : true});
        }
       
    }

    componentDidMount() {
        this.getProvince();
    }

    render() {
        return (
            <div id="container">
                <header><h4>Información personal</h4></header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="first-name">Nombre</label>
                                <input className="form-control" type="text" name="first-name" id="first-name" onChange={this.onChangeNombre} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name1">Primer Apellido</label>
                                <input className="form-control" type="text" name="last-name1" id="last-name1"  onChange={this.onChangePrimerApellido} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name2">Segundo Apellido</label>
                                <input className="form-control" type="text" name="last-name2" id="last-name2" onChange={this.onChangeSegundoApellido} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthdate">Fecha de nacimiento</label>
                                <input className="form-control" type="date" name="birthdate" min="1917-01-01" id="birthdate" onChange={this.onChangeFecha} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dni">Cédula de identificación</label>
                                <input className="form-control" type="number" name="dni" min="0" max="1000000000" id="dni" onChange={this.onChangeCedula} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="civilState">Estado civil</label> <br></br>
                                <select className="form-control" name="civilState"   onChange={this.onChangeMaritalStatus}  required>
                                    <option className="select-cs" value="" defaultValue>Seleccione estado civil</option>
                                    <option value="Soltero">Soltero (a)</option>
                                    <option value="Casado">Casado (a)</option>
                                    <option value="Viudo">Viudo (a)</option>
                                    <option value="Divorciado">Divorciado (a)</option>
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="country">País de nacimiento</label>
                                <CountrySelect onChange = {this.onChangeCountry}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="residencia">Residencia en Costa Rica</label>
                                <input type="checkbox" id="residencia" name="residencia" checked = {this.state.residente} onChange ={this.onChangeResidente}></input>                                
                            </div>
                            {this.state.residente ?  
                            <div>
                            <div className="form-group">
                                <label htmlFor="province" >Localización</label><br></br>
                                <select className="form-control" id="province" name="provinciaSelect" onChange={this.onChangeProvincia} required>
                                    <option className="select-cs" value="" label="Seleccione la provincia" defaultValue>   Seleccione la provincia  </option>
                                    {this.state.provinces.map((province) => <option key={province.id_province} value={province.id_province}>{province.name}</option>)} 
                                </select>
                            </div>
                                <div className="form-group">
                                    <select className="form-control" name="cantonSelect" id="canton" onChange={this.onChangeCanton} required>
                                        <option className="select-cs" value="" label="Seleccione el cantón" defaultValue>   Seleccione el cantón   </option>
                                        {this.state.cantons.map((canton) => <option key={canton.id_canton} value={canton.id_canton}>{canton.name}</option>)} 
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="distritoSelect" id="distrito" onChange={this.onSelectDistrict} required>
                                        <option className="select-cs" value="" label="Seleccione el distrito" defaultValue>   Seleccione el distrito   </option>
                                        {this.state.districts.map((district) => <option key={district.id_district} value={district.id_district}>{district.name}</option>)}
                                    </select>
                                </div>
                            </div>: null}   
                                <div className="form-group">
                                <label htmlFor="address">Dirección exacta</label>
                                <textarea className="form-control" rows="3" name="address" id="address" required onChange={this.onChangeDireccion}></textarea>
                                </div>
                            
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}





