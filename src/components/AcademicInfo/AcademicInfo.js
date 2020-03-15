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
        careerLista : [],
        associatedLista : [], 
        campus : []
    }


    getCampus = async () => {
        const res = await axios.get(`/campus`);
        const campus = res.data;
        this.setState({ campus });
    };

    getCareer = async () => {
        const res = await axios.get(`/career`);
        const career = res.data;
        this.setState({ career });
        {this.state.career.map(career => this.state.careerLista.push({ title: career.name + "-" + career.degree , id: career.career_code}))}
    };

    getAssociatedCareer = async () => {
        const res = await axios.get(`/associated_career`);
        const associated = res.data;
        this.setState({ associated });
        {this.state.associated.map(assocareer => this.state.associatedLista.push({ title: assocareer.name, id: assocareer.id_associated_career}))}
    };


    componentDidMount() {
        this.getCampus();
        this.getCareer();
        this.getAssociatedCareer();
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
                                <select class="form-control" name="centroUnversitario" required>
                                    <option class="select-cs" value="" label="Seleccione centro universitario" selected="selected">  Seleccione centro universitario  </option>
                                    {
                                        this.state.campus.map(place =>
                                        <option value={place.campus_code}>  {place.name}    </option> ) 
                                    }
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="carreerUned">Seleccione la (s) carrera (s) que cursa</label>
                                <CustomizedHook id="carreerUned" list={this.state.careerLista} />
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
                                        <CustomizedHook id="cursos" list={this.state.associatedLista} />
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
                                        <CustomizedHook id="red" list={redes} />
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





