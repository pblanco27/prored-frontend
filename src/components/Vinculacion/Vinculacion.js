import React, { Component } from 'react'
import PersonalData from '../PersonalData/PersonalData';
import PersonalDataPartial from '../PersonalData/PersonalDataPartial';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit';
import swal from 'sweetalert';
import axios from 'axios';

export default class Vinculacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: "disabled",
            showMyComponent: '0',
            infoList: [],
            tipoVinculado: ''
        }
        this.ParcialDataInvitado = React.createRef();
        this.ParcialDataBasico = React.createRef();
        this.PersonalDataMedio = React.createRef();
        this.PersonalDataAvanzado = React.createRef();
        this.AcademicInfoMedio = React.createRef();
        this.AcademicInfoAvanzado = React.createRef();
        this.AcademicInfoBasico = React.createRef();
        this.AcademicInfoInvitado = React.createRef();
    }

    async componentDidMount() {
        if (this.props.parent === "ver") {
            var prof = this.props.personData.student.profile;
            if (prof === "Invitado") await this.setState({ profile: '1' });
            if (prof === "Básico") await this.setState({ profile: '2' });
            if (prof === "Intermedio") await this.setState({ profile: '3' });
            if (prof === "Avanzado") await this.setState({ profile: '4' });
            // Acá se manda el tipo de vinculado que venga del data (profe o student).
            this.setState({ tipoVinculado: "1" });
            //
            this.setComponentCodes(this.state.profile);
        }
        if (this.props.type === "professor") {
            const disabled = "disabled"
            this.setState({ disabled })
        }
    }

    onChange = (event) => {
        var opcion = event.target.value;
        var res = "";
        if (opcion === '2') {
            res = "disabled";
            this.setState({ tipoVinculado: '2' });
            //this.setState({ showMyComponent: '2' });
        } else {
            this.setState({ tipoVinculado: '1' });
            //this.setState({ showMyComponent: '1' });
        }
        this.setState({ disabled: res })
    }

    onChangeVinculacion = (event) => {
        var opcion = event.target.value;
        this.setComponentCodes(opcion);
    }

    setComponentCodes(opcion) {
        if (this.state.tipoVinculado !== '2') {
            switch (opcion) {
                case '1':
                    this.setState({ showMyComponent: '11' });
                    break;
                case '2':
                    this.setState({ showMyComponent: '12' });
                    break;
                case '3':
                    this.setState({ showMyComponent: '13' });
                    break;
                case '4':
                    this.setState({ showMyComponent: '14' });
                    break;
                default:
                    this.setState({ showMyComponent: this.state.showMyComponent });
                    break;
            }
        }
    }

    renderSwitch() {
        switch (this.state.showMyComponent) {
            case '11':
                return <div>
                    <PersonalData
                        ref={this.ParcialDataInvitado}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                    />
                    <AcademicInfo
                        ref={this.AcademicInfoInvitado}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                        load={false}
                    />
                </div>;
            case '12':
                return <div>
                    <PersonalData
                        ref={this.ParcialDataBasico}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                    />
                    <AcademicInfo
                        ref={this.AcademicInfoBasico}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                        load={false}
                    />
                </div>;
            case '13':
                return <div>
                    <PersonalData
                        ref={this.PersonalDataMedio}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                    />
                    <AcademicInfo
                        ref={this.AcademicInfoMedio}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                        load={true}
                    />
                </div>;
            case '14':
                return <div>
                    <PersonalData
                        ref={this.PersonalDataAvanzado}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                    />
                    <AcademicInfo
                        ref={this.AcademicInfoAvanzado}
                        parent={this.props.parent}
                        personData={this.props.personData}
                        disabled={this.props.disabled}
                        load={true}
                    />
                </div>;
            case '2':
                return <div>
                    <PersonalDataPartial />
                    <AcademicUnit />
                </div>;
            default:
                return <div> </div>;
        }
    }

    createGuest(currentMA, currentMAacademic, type) {
        const student = {
            dni: currentMA.state.cedula,
            name: currentMA.state.nombre,
            lastname1: currentMA.state.primerApellido,
            lastname2: currentMA.state.segundoApellido,
            born_dates: currentMA.state.fechaNacimiento,
            id_district: currentMA.state.selectedDistrict,
            marital_status: currentMA.state.estadoCivil,
            campus_code: currentMAacademic.state.selected_campus,
            profile: type,
            address: currentMA.state.direccion,
            nationality: currentMA.state.pais,
            careers: currentMAacademic.state.selected_careers,
            languages: [],
            networks: [],
            associated_careers: [],
        }
        axios.post(`/student`, student);
    }

    createMedioAvanzado(currentMA, currentMAacademic, type) {
        const student = {
            dni: currentMA.state.cedula,
            name: currentMA.state.nombre,
            lastname1: currentMA.state.primerApellido,
            lastname2: currentMA.state.segundoApellido,
            born_dates: currentMA.state.fechaNacimiento,
            id_district: currentMA.state.selectedDistrict,
            marital_status: currentMA.state.estadoCivil,
            campus_code: currentMAacademic.state.selected_campus,
            profile: type,
            address: currentMA.state.direccion,
            nationality: currentMA.state.pais,
            careers: currentMAacademic.state.selected_careers,
            languages: currentMAacademic.state.selected_languages,
            networks: currentMAacademic.state.selected_networks,
            associated_careers: currentMAacademic.state.selected_other_careers,
        }
        console.log(student);
        //const data  = axios.post(`/student`, student);
    }

    handleSubmit = () => {
        var type = '';
        switch (this.state.showMyComponent) {
            case '11':
                type = "Invitado";
                const currentInvitado = this.ParcialDataInvitado.current;
                const currentInvitadoAcademic = this.AcademicInfoInvitado.current;
                this.createGuest(currentInvitado, currentInvitadoAcademic, type);
                break;
            case '12':
                type = "Básico";
                const currentBasico = this.ParcialDataBasico.current;
                const currentBasicoAcademic = this.AcademicInfoBasico.current;
                this.createGuest(currentBasico, currentBasicoAcademic, type);
                break;
            case '13':
                type = "Intermedio";
                const currentMedio = this.PersonalDataMedio.current;
                const currentMedioAcademic = this.AcademicInfoMedio.current;
                this.createMedioAvanzado(currentMedio, currentMedioAcademic, type);
                break;
            case '14':
                type = "Avanzado";
                const currentAvanzado = this.PersonalDataAvanzado.current;
                const currentAvanzadoAcademic = this.AcademicInfoAvanzado.current;
                this.createMedioAvanzado(currentAvanzado, currentAvanzadoAcademic, type);
                break;
            case '2':
                break;
            default:
                return <div> </div>;
        }
        swal("¡Listo!", "Se creó un nuevo vinculado exitosamente.", "success");
    }

    renderSubmitButton(){
        if (this.props.parent === "registro" || (this.props.parent === "ver" && this.props.showSubmitButton === true)){
            return <center><button type="submit" className="btn btn-lg btn-success" onClick={this.handleSubmit} >Registrar</button></center>;
        }
    }

    render() {
        return (
            <div>
                <div id="container">
                    <header><h4>Sección de vinculación</h4></header>
                    <div id="part-1">
                        <br></br>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="tipoVinculado">Tipo de vinculado: </label>
                                    <select
                                        className="form-control"
                                        value={this.state.tipoVinculado}
                                        onChange={this.onChange}
                                        disabled={this.props.disabled}>
                                        <option className="select-cs" value="" defaultValue>Seleccione el tipo de vinculado</option>
                                        <option value="1">Estudiante</option>
                                        {/* <option value="2">Profesor</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="tipoVinculacion">Tipo de vinculación:   </label><br></br>
                                    <select
                                        className="form-control"
                                        value={this.state.profile}
                                        onChange={this.onChangeVinculacion}
                                        disabled={this.props.disabled}>
                                        <option className="select-cs" value="" defaultValue>Seleccione el tipo de vinculación</option>
                                        <option value="1">Invitado</option>
                                        <option value="2">Básico</option>
                                        <option value="3">Medio</option>
                                        <option value="4">Avanzado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <br></br>
                    </div>
                </div>
                {this.renderSwitch()}
                {this.renderSubmitButton()}
                <br></br>
            </div>
        )
    }
}

