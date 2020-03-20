import React, { Component } from 'react'
import './PersonalData.css';
import axios from 'axios'
import CountrySelect from '../CountrySelect/CountrySelect';
import { countries } from '../CountrySelect/CountrySelect';

export default class PersonalData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            cantons: [],
            districts: [],
            selectedProvince: '',
            selectedCanton: '',
            selectedDistrict: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: '',
            cedula: '',
            estadoCivil: '',
            pais: '',
            default_country: '',
            direccion: '',
            residente : true
        }
    }

    async getPersonalData() {
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
        };
        const direction = {
            "id_district": 1,
            "district_name": "Piedades",
            "id_canton": 1,
            "canton_name": "Santa Ana",
            "id_province": 1,
            "name": "San Jose"
        }
        await this.setState({
            selectedProvince: direction.id_province,
            selectedCanton: direction.id_canton,
            selectedDistrict: direction.id_district,
            nombre: student.name,
            primerApellido: student.lastname1,
            segundoApellido: student.lastname2,
            fechaNacimiento: student.born_dates,
            cedula: student.dni,
            estadoCivil: student.marital_status,
            pais: student.nationality,
            direccion: student.address
        });
        this.getCanton();
        this.getDistrict();
        this.setDefaultCountry();
    }

    async setDefaultCountry() {
        var selected_country;
        countries.map(country => { if (country.code === this.state.pais) selected_country = country; });
        await this.setState({ default_country: selected_country });
    }

    getProvince = async () => {
        const res = await axios.get(`/province`);
        const provinceData = res.data;
        this.setState({ provinces: provinceData });
    };

    getCanton = async () => {
        const res = await axios.get(`/province/` + this.state.selectedProvince + '/canton');
        const cantonData = res.data;
        this.setState({ cantons: cantonData });
    };

    getDistrict = async () => {
        const res = await axios.get('/canton/' + this.state.selectedCanton + '/district');
        const districtData = res.data;
        this.setState({ districts: districtData });
    };

    onChangeProvincia = (event) => {
        const opcion = event.target.value;
        this.state.selectedProvince = opcion;
        this.state.cantons = [];
        this.state.districts = [];
        this.getCanton();
    }

    onChangeCanton = (event) => {
        var opcion = event.target.value;
        this.state.selectedCanton = opcion;
        this.state.districts = [];
        this.getDistrict();
    }

    onChangeDistrict = (event) => {
        var id = event.target.value;
        this.state.selectedDistrict = id;
    }

    onChangeLanguage = (event, values) => {
        this.setState({ selected_languages: [] });
        const lenguajesX = [];
        values.map(language => lenguajesX.push(language.id));
        this.setState({ selected_languages: lenguajesX });
    }

    onChangeCountry = (event, values) => {
        if (values !== null) this.setState({ pais: values.code });
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
        if (this.props.parent === "ver") this.getPersonalData();
    }

    renderCountrySelect() {
        if (this.props.parent === "ver" && this.state.default_country !== "") {
            return <CountrySelect
                value={this.state.default_country}
                onChange={this.onChangeCountry}
            />;
        } else if (this.props.parent === "registro") {
            return <CountrySelect
                value={null}
                onChange={this.onChangeCountry}
            />;
        } else {
            return "";
        }
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
                                <input
                                    className="form-control"
                                    type="text"
                                    id="first-name"
                                    name="first-name"
                                    value={this.state.nombre}
                                    onChange={this.onChangeNombre}
                                    required>
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name1">Primer Apellido</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="last-name1"
                                    name="last-name1"
                                    value={this.state.primerApellido}
                                    onChange={this.onChangePrimerApellido}
                                    required>
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name2">Segundo Apellido</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="last-name2"
                                    name="last-name2"
                                    value={this.state.segundoApellido}
                                    onChange={this.onChangeSegundoApellido}
                                    required>
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthdate">Fecha de nacimiento</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    min="1917-01-01"
                                    value={this.state.fechaNacimiento}
                                    onChange={this.onChangeFecha}
                                    required>
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dni">Cédula de identificación</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="dni"
                                    name="dni"
                                    min="0"
                                    max="1000000000"
                                    value={this.state.cedula}
                                    onChange={this.onChangeCedula}
                                    required>
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="civilState">Estado civil</label> <br></br>
                                <select
                                    className="form-control"
                                    id="civilState"
                                    name="civilState"
                                    value={this.state.estadoCivil}
                                    onChange={this.onChangeMaritalStatus}
                                    required>
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
                                {this.renderCountrySelect()}
                            </div>
                            <div className="form-group">
                                <label htmlFor="residencia">Residencia en Costa Rica</label>
                                <input type="checkbox" id="residencia" name="residencia" checked = {this.state.residente} onChange ={this.onChangeResidente}></input>                                
                            </div>
                            {this.state.residente ?  
                            <div>
                                <div className="form-group">
                                    <label htmlFor="province" >Localización</label><br></br>
                                    <select
                                        className="form-control"
                                        id="province"
                                        name="provinciaSelect"
                                        value={this.state.selectedProvince}
                                        onChange={this.onChangeProvincia}
                                        required>
                                        <option className="select-cs" value="" label="Seleccione la provincia" defaultValue>   Seleccione la provincia  </option>
                                        {this.state.provinces.map((province) => <option key={province.id_province} value={province.id_province}>{province.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        id="canton"
                                        name="cantonSelect"
                                        value={this.state.selectedCanton}
                                        onChange={this.onChangeCanton}
                                        required>
                                        <option className="select-cs" value="" label="Seleccione el cantón" defaultValue>   Seleccione el cantón   </option>
                                        {this.state.cantons.map((canton) => <option key={canton.id_canton} value={canton.id_canton}>{canton.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        name="distritoSelect"
                                        id="distrito"
                                        value={this.state.selectedDistrict}
                                        onChange={this.onChangeDistrict}
                                        required>
                                        <option className="select-cs" value="" label="Seleccione el distrito" defaultValue>   Seleccione el distrito   </option>
                                        {this.state.districts.map((district) => <option key={district.id_district} value={district.id_district}>{district.name}</option>)}
                                    </select>
                                </div>
                            </div>: null} 
                            <div className="form-group">
                                <label htmlFor="address">Dirección exacta</label>
                                <textarea
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    rows="3"
                                    required
                                    value={this.state.direccion}
                                    onChange={this.onChangeDireccion}>
                                </textarea>
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





