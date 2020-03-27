import React, { Component } from 'react'
import ModalAsso from './ModalAsso';
import ModalCentro from './ModalCentro';
import SelectAuto from '../SelectAuto/SelectAuto'
import axios from 'axios';

export default class ModalInfoAdicional extends Component {
    state = {
        centers: [],
        associatedCareers: [],
        id_center: 0
    }

    getCenter = async () => {
        const res = await axios.get(`/center`);
        const centerData = res.data;
        this.setState({ centers: [] });
        centerData.map(center => this.state.centers.push({ title: center.name, id: center.id_center }))
    };

    getAssociatedCareer = async (idCenter) => {
        const res = await axios.get(`/associated_career_from_center/` + idCenter);
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
            this.setState({ id_center: values.id });
            this.getAssociatedCareer(values.id);
        } else {
            this.setState({ id_center: 0 });
        }
    }

    renderCareerSelect() {
        if (this.state.associatedCareers.length === 0) {
            return <SelectAuto
                id="careerSelect"
                label="Carrera"
                list={this.state.associatedCareers}
                value={null}
            />;
        } else {
            return <SelectAuto
                id="careerSelect"
                label="Carrera"
                list={this.state.associatedCareers}
            />;
        }
    }

    render() {
        return (
            <div className="container">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-target="#modalInfoAdicional"
                    onClick={this.show}
                    disabled={(this.props.parent === "ver" || this.props.parent === "registro") ? this.props.disabled : ""}>
                    Crear nueva
                </button>
                <div className="modal fade" id="modalInfoAdicional" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Crear nueva carrera</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <b>Nota:</b><br></br>
                                    Antes de crear una nueva carrera,
                                    verifique a continuación que esta no existe
                                </p>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-9">
                                        <SelectAuto
                                            id="centerSelect"
                                            list={this.state.centers}
                                            label="Centro Educativo"
                                            onChange={this.onChangeCenter}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <ModalCentro getCenter={this.getCenter} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-9">
                                        <br></br>
                                        {this.renderCareerSelect()}
                                    </div>
                                    <div className="col-md-1">
                                        <br></br>
                                        <ModalAsso
                                            id_center={this.state.id_center}
                                            has_grand_parent={true}
                                            getAssociatedCareer={this.getAssociatedCareer}
                                            getAssociated={this.props.getAssociated}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Volver</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div >
        )
    }
}