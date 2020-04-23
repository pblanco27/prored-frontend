import React, { Component } from 'react'
import PersonalData from '../PersonalData/PersonalData';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import ScrollTop from '../ScrollTop/ScrollTop';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import swal from 'sweetalert';
import axios from 'axios';
import $ from "jquery";

/*
    Componente que renderiza los componentes correspondientes para el registro y edición
    de los vinculados, dependiendo del tipo y perfil del vinculado
*/

export default class Vinculacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Banderas que controlan la visualización
            disabled: "disabled",
            showMyComponent: '0',
            showSubmitButton: false,
            infoList: [],
            tipoVinculado: '',
            disableInvitado: '',
            disableBasico: '',
            disableMedio: '',
            disableAvanzado: '',
            nombreBotonRegistro: 'Registrar',
            hasErrors: false
        }
        // Se declaran las referencias a los componentes por mostrar
        this.ParcialDataInvitado = React.createRef();
        this.ParcialDataBasico = React.createRef();
        this.PersonalDataMedio = React.createRef();
        this.PersonalDataAvanzado = React.createRef();
        this.AcademicInfoMedio = React.createRef();
        this.AcademicInfoAvanzado = React.createRef();
        this.AcademicInfoBasico = React.createRef();
        this.AcademicInfoInvitado = React.createRef();
    }

    /*
        Función que se ejecuta al momento que se monta el componente.
        Dependiendo del tipo vinculado se asignan valores tales como el perfil
        en el caso del estudiante, y así mostrar los componentes necesarios
    */
    async componentDidMount() {
        if (this.props.parent === "ver") {
            var prof = this.props.personData.student.profile;
            if (prof === "Invitado") await this.setState({ profile: '1' });
            if (prof === "Básico") await this.setState({ profile: '2', disableInvitado: 'disabled' });
            if (prof === "Intermedio") await this.setState({ profile: '3', disableInvitado: 'disabled', disableBasico: 'disabled' });
            if (prof === "Avanzado") await this.setState({ profile: '4', disableInvitado: 'disabled', disableBasico: 'disabled', disableMedio: 'disabled' });
            // Acá se mandaría el tipo de vinculado que venga del data (profe o student).
            await this.setState({ tipoVinculado: "1", nombreBotonRegistro: 'Guardar cambios' });
            this.setComponentCodes(this.state.profile);
        }
        if (this.props.type === "professor") {
            const disabled = "disabled"
            await this.setState({ disabled })
        }
    }

    // Función que asigna el tipo de vinculado cuando cambia el select correspondiente
    onChangeType = (event) => {
        var opcion = event.target.value;
        var res = "";
        if (opcion === '2') {
            res = "disabled";
            this.setState({ tipoVinculado: '2' });
        } else {
            this.setState({ tipoVinculado: '1' });
        }
        this.setState({ disabled: res })
    }

    // Asigna el perfil del vinculado cuando cambia el select correspondiente
    onChangeProfile = (event) => {
        var opcion = event.target.value;
        this.setState({ profile: opcion });
        this.setComponentCodes(opcion);
    }

    /*
        Dependiendo del valor seleccionado en el select del perfil
        se asigna una variable que determina los componentes por mostrar
    */
    setComponentCodes(opcion) {
        if (this.state.tipoVinculado !== '2') {
            switch (opcion) {
                case '1':
                    this.setState({ showMyComponent: '11', showSubmitButton: true });
                    break;
                case '2':
                    this.setState({ showMyComponent: '12', showSubmitButton: true });
                    break;
                case '3':
                    this.setState({ showMyComponent: '13', showSubmitButton: true });
                    break;
                case '4':
                    this.setState({ showMyComponent: '14', showSubmitButton: true });
                    break;
                default:
                    this.setState({ showMyComponent: this.state.showMyComponent, showSubmitButton: false });
                    break;
            }
        }
    }

    /*
        Renderiza los componentes por mostrar en pantalla
        dependiendo del pefil del vinculado 
    */
    renderSwitch() {
        switch (this.state.showMyComponent) {
            // Estudiante invitado
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
            // Estudiante básico
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
            // Estudiante intermedio
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
            // Estudiante avanzado
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
            // Profesor 
            case '2':
                return <div></div>;
            default:
                return <div></div>;
        }
    }

    /*
        Función que valida el formato de los campos para el nombre
        por medio de una expresión regular
    */
    async validateName(value, element_id) {
        var error = "";
        const reg = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (value.length > 40) {
            error = "Este campo puede tener un máximo de 40 caracteres"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente letras y espacios';
        }
        $(element_id).text(error);
        if (error !== "") {
            $(element_id).show();
            this.setState({ hasErrors: true });
        } else {
            $(element_id).hide();
        }
    }

    /*
        Función que valida el formato del campo de número de cédula
        por medio de una expresión regular
    */
    async validateDni(value, element_id) {
        var error = "";
        const reg = /^[\w-]+$/;
        if (value === "") {
            error = "Este campo no puede ir vacío"
        } else if (value.length > 40) {
            error = "Este campo puede tener un máximo de 40 caracteres"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente números, letras y guiones';
        }
        $(element_id).text(error);
        if (error !== "") {
            $(element_id).show();
            this.setState({ hasErrors: true });
        } else {
            $(element_id).hide();
        }
    }

    /*
        Función que valida que un determinado campo no venga vacío.
        Se utiliza para la validación de los select o combo box.
    */
    async validateEmpty(value, element_id) {
        var error = "";
        if (value === "" || value === 0 || JSON.stringify(value) === JSON.stringify([])) {
            error = "Debe seleccionar una opción de la lista";
        }
        $(element_id).text(error);
        if (error !== "") {
            $(element_id).show();
            this.setState({ hasErrors: true });
        } else {
            $(element_id).hide();
        }
    }

    /*
        Función que valida el formato del campo de dirección exacta
        por medio de una expresión regular
    */
    async validateAddress(value, element_id) {
        var error = "";
        const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,#-]*$/;
        if (value.length > 200) {
            error = "Este campo puede tener un máximo de 200 caracteres"
        } else if (!reg.test(value)) {
            error = 'Este campo puede tener únicamente letras, espacios y los siguientes caracteres: . , - #';
        }
        $(element_id).text(error);
        if (error !== "") {
            $(element_id).show();
            this.setState({ hasErrors: true });
        } else {
            $(element_id).hide();
        }
    }

    /*
        Función que valida la información ingresada en el formulario
        de la información personal de la persona campo por campo.
    */
    async validateFields(student, isResident) {
        await this.validateName(student.name, "#personNameError");
        await this.validateName(student.lastname1, "#personLastName1Error");
        await this.validateName(student.lastname2, "#personLastName2Error");
        await this.validateEmpty(student.born_dates, "#personDateError");
        await this.validateDni(student.dni, "#personDniError");
        await this.validateEmpty(student.marital_status, "#personCivilStateError");
        await this.validateEmpty(student.nationality, "#personCountryError");
        if (isResident) await this.validateEmpty(student.id_district, "#personDistrictError");
        await this.validateAddress(student.address, "#personAddressError");
        await this.validateEmpty(student.campus_code, "#personCampusError");
        await this.validateEmpty(student.careers, "#personCareerError");
    }

    /*
        Función que recibe las referencias de los dos componentes (información personal e
        información académica), obtiene la información de las mismas y, luego de validarlas,
        manda a crear o editar el vinculado de perfil invitado y básico
    */
    async createGuest(currentMA, currentMAacademic, type) {
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
        await this.validateFields(student, currentMA.state.residente);
        if (this.state.hasErrors) {
            swal("¡Atención!", "Hay campos que no cumplen con el formato adecuado.", "warning");
        } else {
            this.gestionInfoSubmit(student, currentMAacademic);
        }
    }

    /*
        Función que recibe las referencias de los dos componentes (información personal e
        información académica), obtiene la información de las mismas y, luego de validarlas,
        manda a crear o editar el vinculado de perfil intermedio y avanzado
    */
    async createMedioAvanzado(currentMA, currentMAacademic, type) {
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
            associated_careers: currentMAacademic.state.selected_other_careers
        }
        await this.validateFields(student, currentMA.state.residente);
        await this.validateEmpty(student.languages, "#personLanguageError");
        if (this.state.hasErrors) {
            swal("¡Atención!", "Hay campos que no cumplen con el formato adecuado.", "warning");
        } else {
            this.gestionInfoSubmit(student, currentMAacademic);
        }
    }

    /*
        Función que recibe la referencia al componente de información académica y 
        la cédula del vinculado, con tal de añadir la información necesaria de
        perfil amplio del vinculado. Para esto es necesario primero eliminar todos
        los registros y luego añadir los nuevos datos.
    */
    async addExtraInfo(studentDNI, currentMAacademic) {
        await this.removeLanguages(studentDNI, currentMAacademic);
        await this.removeNetworks(studentDNI, currentMAacademic);
        await this.removeCareers(studentDNI, currentMAacademic);
        await this.removeOtherCareers(studentDNI, currentMAacademic);
        await this.addLanguages(studentDNI, currentMAacademic);
        await this.addNetworks(studentDNI, currentMAacademic);
        await this.addCareers(studentDNI, currentMAacademic);
        await this.addOtherCareers(studentDNI, currentMAacademic);
    }

    // Función que elimina todos los lenguajes de un vinculado de la BD
    async removeLanguages(studentDNI, currentMAacademic) {
        const defaultLanguages = currentMAacademic.state.default_languages;
        if (defaultLanguages !== null) {
            await defaultLanguages.map(async language => await axios.delete('/student/' + studentDNI + '/language', { data: { id_language: language.id } }));
        }
    }

    // Función que elimina todas las redes de un vinculado de la BD
    async removeNetworks(studentDNI, currentMAacademic) {
        const defaultNetworks = currentMAacademic.state.default_networks;
        if (defaultNetworks !== null) {
            await defaultNetworks.map(async network => await axios.delete('/student/' + studentDNI + '/network', { data: { id_network: network.id } }));
        }
    }

    // Función que elimina todas las carreras de un vinculado de la BD
    async removeCareers(studentDNI, currentMAacademic) {
        const defaultCareers = currentMAacademic.state.default_careers;
        if (defaultCareers !== null) {
            await defaultCareers.map(async career => await axios.delete('/student/' + studentDNI + '/career', { data: { career_code: career.id } }));
        }
    }

    // Función que elimina todas las carreras asociadas de un vinculado de la BD
    async removeOtherCareers(studentDNI, currentMAacademic) {
        const defaultAssociated = currentMAacademic.state.default_other_careers;
        if (defaultAssociated !== null) {
            await defaultAssociated.map(async  asso => await axios.delete('/student/' + studentDNI + '/associated_career', { data: { id_associated_career: asso.id } }));
        }
    }

    // Función que agrega todos los lenguajes seleccionados para un vinculado a la BD
    async addLanguages(studentDNI, currentMAacademic) {
        const newLanguages = currentMAacademic.state.selected_languages;
        newLanguages.map(async language => await axios.post('/student/' + studentDNI + '/language', { id_language: language }));
    }

    // Función que agrega todas las redes seleccionadas para un vinculado a la BD
    async addNetworks(studentDNI, currentMAacademic) {
        const newNetworks = currentMAacademic.state.selected_networks;
        newNetworks.map(async network => await axios.post('/student/' + studentDNI + '/network', { id_network: network }));
    }

    // Función que agrega todas las carreras seleccionadas para un vinculado a la BD
    async addCareers(studentDNI, currentMAacademic) {
        const newCareers = currentMAacademic.state.selected_careers;
        newCareers.map(async career => await axios.post('/student/' + studentDNI + '/career', { career_code: career }));
    }

    // Función que agrega todas las carreras asociadas seleccionadas para un vinculado a la BD
    async addOtherCareers(studentDNI, currentMAacademic) {
        const newAssociated = currentMAacademic.state.selected_other_careers;
        newAssociated.map(async asso => await axios.post('/student/' + studentDNI + '/associated_career', { id_associated_career: asso }));
    }

    /*
        Función que controla el flujo entre la creación y edición de datos de un vinculado.
        Dependiendo del flujo se realizan diferentes operaciones.
    */
    gestionInfoSubmit = async (infoStudent, currentMAacademic) => {
        if (this.props.parent === "registro") {
            // Se valida que la cédula ingresada no exista en la BD
            const res = await axios.post(`/person_exists`, { id: infoStudent.dni });
            if (!res.data.personexists) {
                // Mensaje de confirmación para la creación del vinculado
                // El vinculado se crea únicamente si el usuario acepta la operación
                swal({
                    title: "¡Atención!",
                    text: "Una vez ejecutado guardará la información del vinculado de forma permanente",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                .then((willConfirm) => {
                    if (willConfirm) {
                        this.confirmCreacion(infoStudent, currentMAacademic);
                        swal("¡Listo!", "Se creó el vinculado exitosamente.", "success")
                        .then(() => {
                            window.location.reload();
                        });
                    } else {
                        swal("La información se mantendrá igual", {
                            title: "¡Atención!",
                            icon: "info",
                        });
                    }
                });
            } else {
                swal("¡Atención!", "No se creó el vinculado debido a que su identificación ya se encuentra registrada", "warning");
            }
        } else {
            // Mensaje de confirmación para la edición del vinculado
            // El vinculado se edita únicamente si el usuario acepta la operación
            swal({
                title: "¡Atención!",
                text: "Una vez ejecutado cambiará la información del vinculado de forma permanente",
                icon: "warning",
                buttons: ["Cancelar", "Aceptar"],
                dangerMode: true,
            })
            .then((willConfirm) => {
                if (willConfirm) {
                    this.confirmEdicion(infoStudent, currentMAacademic);
                    swal("¡Listo!", "Se editó el vinculado exitosamente.", "success")
                    .then(() => {
                        window.location.reload();
                    });
                } else {
                    swal("La información se mantendrá igual", {
                        title: "¡Atención!",
                        icon: "info",
                    });
                }
            });
        }
    }

    // Función que manda a crear el vinculado en la BD
    async confirmCreacion(infoStudent, currentMAacademic) {
        await axios.post(`/student`, infoStudent);
    }

    // Función que manda a editar el vinculado en la BD
    async confirmEdicion(infoStudent, currentMAacademic) {
        await axios.put(`/student/` + infoStudent.dni, infoStudent);
        await this.addExtraInfo(infoStudent.dni, currentMAacademic);
    }

    /*
        Función que se ejecuta al momento de enviar el formulario de creción o edición.
        Dependiendo de la variable que controla los componentes que se muestran, se 
        obtiene la referencia de dichos componentes y se envían para su posterior manejo    
    */
    handleSubmit = async () => {
        var type = '';
        await this.setState({ hasErrors: false });
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
                break;
        }
    }

    // Función que controla si el botón de registro o edición debe mostrarse
    renderSubmitButton() {
        if ((this.props.parent === "registro" && this.state.showSubmitButton === true) ||
            (this.props.parent === "ver" && this.props.showSubmitButton === true)) {
            return <center><button type="submit" className="btn btn-lg btn-success" onClick={this.handleSubmit} >{this.state.nombreBotonRegistro}</button></center>;
        }
    }

    // Función que renderiza el componente para mostrarlo en pantalla
    render() {
        return (
            <div>
                <div id="container">
                    <header><h4>Sección de vinculación</h4></header>
                    <center>Los campos marcados con * son requeridos</center><br></br>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="form-group required">
                                <label htmlFor="tipoVinculado">Tipo de vinculado: </label>
                                <select
                                    className="form-control"
                                    value={this.state.tipoVinculado}
                                    onChange={this.onChangeType}
                                    disabled={this.props.disabled}>
                                    <option className="select-cs" value="" defaultValue>Seleccione el tipo de vinculado</option>
                                    <option value="1">Estudiante</option>
                                    {/* <option value="2">Profesor</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group required">
                                <label htmlFor="tipoVinculacion">Tipo de vinculación:   </label><br></br>
                                <select
                                    className="form-control"
                                    value={this.state.profile}
                                    onChange={this.onChangeProfile}
                                    disabled={this.props.disabled}>
                                    <option className="select-cs" value="" defaultValue>Seleccione el tipo de vinculación</option>
                                    <option value="1" disabled={this.state.disableInvitado} >Invitado</option>
                                    <option value="2" disabled={this.state.disableBasico}>Básico</option>
                                    <option value="3" disabled={this.state.disableMedio}>Medio</option>
                                    <option value="4" disabled={this.state.disableAvanzado}>Avanzado</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    <br></br>
                </div>
                {this.renderSwitch()}
                {this.renderSubmitButton()}
                <br></br>
                <ScrollTop {...this.props}>
                    <Fab color="secondary" size="small" aria-label="Ir arriba">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </div>
        )
    }
}

