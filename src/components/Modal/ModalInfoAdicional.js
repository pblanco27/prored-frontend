import React, { Component } from 'react'
import ModalCarrera from './ModalCarrera';
import ModalCentro from './ModalCentro';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SelectAuto from '../SelectAuto/SelectAuto'
import axios from 'axios';

export default class ModalInfoAdicional extends Component {
    state = {
        centers: [],
        associatedCareers: [],
    }

    getCenter = async () => {
        const res = await axios.get(`/center`);
        const centerData = res.data;
        centerData.map(center => this.state.centers.push({ title: center.name, id: center.id_center }))
    };

    getAssociatedCareer = async (idCenter) => {
        const res = await axios.get(`/associated_career/` + idCenter);
        const assoData = res.data;
        this.setState({ associatedCareers: [] });
        assoData.map(assocareer => this.state.associatedCareers.push({ title: assocareer.name, id: assocareer.id_associated_career }))
    };

    componentDidMount() {
        this.getCenter();
    }

    onChangeCenter = (event, values) => {
        this.setState({ associatedCareers: [] });
        if (values !== null) {
            var id = values.id;
            this.getAssociatedCareer(id);
        }
    }

    onChangeCareer = (event, values) => {
        if (values !== null) {
            var idCareer = values.id;
        }
    }

    renderCareerSelect() {
        var isEmpty;
        if (this.state.associatedCareers.length === 0){
            isEmpty = true;
        } else {
            isEmpty = false;
        }
        if (isEmpty) {
            return <div>
                <Autocomplete
                    id="careerSelect"
                    value={null}
                    options={this.state.associatedCareers}
                    getOptionLabel={option => option.title}
                    style={{ width: "100%" }}
                    onChange={this.onChangeCareer}
                    renderInput={params => <TextField {...params} label={"Carrera"} variant="outlined" />}
                />
            </div>;
        } else {
            return <div>
                <Autocomplete
                    id="careerSelect"
                    options={this.state.associatedCareers}
                    getOptionLabel={option => option.title}
                    style={{ width: "100%" }}
                    onChange={this.onChangeCareer}
                    renderInput={params => <TextField {...params} label={"Carrera"} variant="outlined" />}
                />
            </div>;
        }
    }

    render() {
        return (
            <div class="container">
                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalInfoAdicional">Crear nueva</button>

                <div class="modal fade" id="modalInfoAdicional" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Crear nueva carrera</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <br></br>
                                                {<Autocomplete
                                                    id="centerSelect"
                                                    options={this.state.centers}
                                                    getOptionLabel={option => option.title}
                                                    style={{ width: "100%" }}
                                                    onChange={this.onChangeCenter}
                                                    renderInput={params => <TextField {...params} label={"Centro Educativo"} variant="outlined" />}
                                                />}
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCentro />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <br></br>
                                                {this.renderCareerSelect()}
                                            </div>
                                            <div class="col-md-1">
                                                <br></br>
                                                <ModalCarrera />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Volver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}