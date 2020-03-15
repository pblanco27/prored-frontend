import React, { Component } from 'react'
import CustomizedHook from '../CustomizedHook/CustomizedHook'
import './PersonalData.css';
import axios from 'axios'
import CountrySelect from '../CountrySelect/CountrySelect';

export default class PersonalData extends Component {
    state = {
        languages: []
    }

    getLanguage = async () => {
        const res = await axios.get(`/language`);
        const languageData = res.data;
        this.setState({ languageData });
        {this.state.languageData.map(language => this.state.languages.push({ title: language.name, id: language.id_language}))}
    };

    componentDidMount() {
        this.getLanguage();
    }

    render() {
        return (
            <div id="container">
                <header><h4>Información personal</h4></header>
                <center>Los campos marcados con * son requeridos</center><br></br>
                <div id="part-1">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="first-name">Nombre</label>
                                <input class="form-control" type="text" name="first-name" id="first-name" required></input>
                            </div>
                            <div class="form-group">
                                <label for="last-name1">Primer Apellido</label>
                                <input class="form-control" type="text" name="last-name1" id="last-name1" required></input>
                            </div>
                            <div class="form-group">
                                <label for="last-name2">Segundo Apellido</label>
                                <input class="form-control" type="text" name="last-name2" id="last-name2" required></input>
                            </div>
                            <div class="form-group">
                                <label for="birthdate">Fecha de nacimiento</label>
                                <input class="form-control" type="date" name="birthdate" min="1917-01-01" id="birthdate" required></input>
                            </div>
                            <div class="form-group">
                                <label for="age">Cédula de identificación</label>
                                <input class="form-control" type="number" name="age" min="0" max="100" id="age" required></input>
                            </div>
                            <div class="form-group">
                                <label for="civilState">Estado civil</label> <br></br>
                                <select class="form-control" name="civilState" required>
                                    <option class="select-cs" value="" selected="selected">Seleccione estado civil</option>
                                    <option value="1">Soltero (a)</option>
                                    <option value="2">Casado (a)</option>
                                    <option value="3">Viudo (a)</option>
                                    <option value="4">Divorciado (a)</option>
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="languages">Seleccione el (los) idioma (s) que habla</label>
                                <CustomizedHook id="languages" list={this.state.languages} />
                            </div>
                            <div class="form-group">
                                <label for="country">País de nacimiento</label>
                                <CountrySelect />
                            </div>
                            <div class="form-group">
                                <label>Localización</label><br></br>
                                <select class="form-control" name="provinciaSelect" required>
                                    <option class="select-cs" value="" label="Seleccione la provincia" selected="selected">   Seleccione la provincia  </option>
                                    <option value="1">San José</option>
                                    <option value="2">Alajuela</option>
                                    <option value="3">Cartago</option>
                                    <option value="4">Heredia</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="cantonSelect" id="canton" required>
                                    <option class="select-cs" value="" label="Seleccione el cantón " selected="selected">   Seleccione el cantón   </option>
                                    <option value="1">San José </option>
                                    <option value="2">Pavas</option>
                                    <option value="3">San Bosco</option>
                                    <option value="4">Santo Domingo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="distritoSelect" id="distrito" required>
                                    <option class="select-cs" value="" label="Seleccione el distrito" selected="selected">   Seleccione el distrito   </option>
                                    <option value="1">Santo Tomás</option>
                                    <option value="2">Heredia </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="address">Dirección exacta</label>
                                <textarea class="form-control" rows="3" name="address" id="address" required></textarea>
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





