import React, { Component } from 'react'
import CustomizedHook from '../CustomizedHook/CustomizedHook'
import './PersonalData.css';
import axios from 'axios'
import CountrySelect from '../CountrySelect/CountrySelect';

export default class PersonalData extends Component {
    state = {
        languages: [],
        selected_languages: []
    }

    getLanguage = async () => {
        const res = await axios.get(`/language`);
        const languageData = res.data;
        languageData.map(language => this.state.languages.push({ title: language.name, id: language.id_language }))
    };

    componentDidMount() {
        this.getLanguage();
    }

    onChangeHook = (event, values) => {     
        this.setState({selected_languages: []});
        values.map(language => this.state.selected_languages.push(language.id))
        console.log(this.state.selected_languages);
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
                                <input className="form-control" type="text" name="first-name" id="first-name" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name1">Primer Apellido</label>
                                <input className="form-control" type="text" name="last-name1" id="last-name1" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name2">Segundo Apellido</label>
                                <input className="form-control" type="text" name="last-name2" id="last-name2" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthdate">Fecha de nacimiento</label>
                                <input className="form-control" type="date" name="birthdate" min="1917-01-01" id="birthdate" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Cédula de identificación</label>
                                <input className="form-control" type="number" name="age" min="0" max="100" id="age" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="civilState">Estado civil</label> <br></br>
                                <select className="form-control" name="civilState" required>
                                    <option className="select-cs" value="" defaultValue>Seleccione estado civil</option>
                                    <option value="1">Soltero (a)</option>
                                    <option value="2">Casado (a)</option>
                                    <option value="3">Viudo (a)</option>
                                    <option value="4">Divorciado (a)</option>
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="languages">Seleccione el (los) idioma (s) que habla</label>
                                <CustomizedHook
                                    id="languages"
                                    list={this.state.languages}
                                    onChangeHook={this.onChangeHook}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">País de nacimiento</label>
                                <CountrySelect />
                            </div>
                            <div className="form-group">
                                <label htmlFor="province" >Localización</label><br></br>
                                <select className="form-control" id="province" name="provinciaSelect" required>
                                    <option className="select-cs" value="" label="Seleccione la provincia" defaultValue>   Seleccione la provincia  </option>
                                    <option value="1">San José</option>
                                    <option value="2">Alajuela</option>
                                    <option value="3">Cartago</option>
                                    <option value="4">Heredia</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="cantonSelect" id="canton" required>
                                    <option className="select-cs" value="" label="Seleccione el cantón" defaultValue>   Seleccione el cantón   </option>
                                    <option value="1">San José </option>
                                    <option value="2">Pavas</option>
                                    <option value="3">San Bosco</option>
                                    <option value="4">Santo Domingo</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="distritoSelect" id="distrito" required>
                                    <option className="select-cs" value="" label="Seleccione el distrito" defaultValue>   Seleccione el distrito   </option>
                                    <option value="1">Santo Tomás</option>
                                    <option value="2">Heredia </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Dirección exacta</label>
                                <textarea className="form-control" rows="3" name="address" id="address" required></textarea>
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





