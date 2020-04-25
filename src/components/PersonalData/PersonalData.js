import React, { Component } from "react";
import "./PersonalData.css";
import axios from "axios";
import CountrySelect from "../CountrySelect/CountrySelect";
import { countries } from "../CountrySelect/CountrySelect";

//Componente para registro y asignación de información del estudiante
/*
    Este componente tiene acargo el manejo y gestión de la información 
    personal del vinculado 
*/

export default class PersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Listar para cargar datos
      provinces: [],
      cantons: [],
      districts: [],
      //Parametros para guardar los datos
      selectedProvince: 0,
      selectedCanton: 0,
      selectedDistrict: 0,
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      fechaNacimiento: "",
      cedula: "",
      estadoCivil: "",
      pais: "",
      default_country: "",
      direccion: "",
      residente: true,
    };
  }

  //Función para recolectar la información de las entradas
  async getPersonalData() {
    const student = this.props.personData.student;
    const direction = this.props.personData.direction;
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
      direccion: student.address,
      residente: direction.id_district !== 0,
    });
    this.getCanton();
    this.getDistrict();
    this.setDefaultCountry();
  }

  //Función que setea el país por defecto en la aplicación
  async setDefaultCountry() {
    var selected_country;
    countries.map((country) => {
      if (country.code === this.state.pais) selected_country = country;
      return null;
    });
    await this.setState({ default_country: selected_country });
  }
  //Función que obtiene las provincias de la base
  getProvince = async () => {
    const res = await axios.get(`/province`);
    const provinceData = res.data;
    this.setState({ provinces: provinceData });
  };
  //Función que obtiene los cantones de la base
  getCanton = async () => {
    const res = await axios.get(
      `/province/` + this.state.selectedProvince + "/canton"
    );
    const cantonData = res.data;
    this.setState({ cantons: cantonData });
  };
  //Función que obtiene los distritos de la base
  getDistrict = async () => {
    const res = await axios.get(
      "/canton/" + this.state.selectedCanton + "/district"
    );
    const districtData = res.data;
    this.setState({ districts: districtData });
  };
  //Función que setea la nueva provincia seleccionada
  onChangeProvincia = async (event) => {
    const opcion = event.target.value;
    await this.setState({
      selectedProvince: opcion,
      cantons: [],
      districts: [],
      selectedCanton: 0,
      selectedDistrict: 0,
    });
    this.getCanton();
  };
  //Función que setea el nuevo cantón seleccionado
  onChangeCanton = async (event) => {
    var opcion = event.target.value;
    await this.setState({
      selectedCanton: opcion,
      districts: [],
      selectedDistrict: 0,
    });
    this.getDistrict();
  };
  //Función que setea el nuevo distrito seleccionado
  onChangeDistrict = async (event) => {
    var id = event.target.value;
    await this.setState({ selectedDistrict: id });
  };
  //Función que setea el lenguage seleccionado
  onChangeLanguage = (event, values) => {
    this.setState({ selected_languages: [] });
    const lenguajesX = [];
    values.map((language) => lenguajesX.push(language.id));
    this.setState({ selected_languages: lenguajesX });
  };
  //Función que setea el nuevo país  seleccionado
  onChangeCountry = (event, values) => {
    if (values !== null) this.setState({ pais: values.code });
  };
  //Función que setea el nombre de la persona
  onChangeNombre = (event) => {
    var opcion = event.target.value;
    this.setState({ nombre: opcion });
  };
  //Función que setea el primer apellido de la persona
  onChangePrimerApellido = (event) => {
    var opcion = event.target.value;
    this.setState({ primerApellido: opcion });
  };
  //Función que setea el segundo apellido  de la persona
  onChangeSegundoApellido = (event) => {
    var opcion = event.target.value;
    this.setState({ segundoApellido: opcion });
  };
  //Función que setea la fecha de nacimiento de la persona
  onChangeFecha = (event) => {
    var opcion = event.target.value;
    this.setState({ fechaNacimiento: opcion });
  };
  //Función que setea la cédula dni de la persona
  onChangeCedula = (event) => {
    var opcion = event.target.value;
    this.setState({ cedula: opcion });
  };
  //Función que setea la dirreción de residencia nacional de la persona
  onChangeDireccion = (event) => {
    var opcion = event.target.value;
    this.setState({ direccion: opcion });
  };
  //Función que setea el estado civil de la persona
  onChangeMaritalStatus = (event) => {
    var opcion = event.target.value;
    this.setState({ estadoCivil: opcion });
  };
  //Función que cambia de estado checkbox del formulario para cuando es residente en Costa Rica o no
  onChangeResidente = (event) => {
    if (this.state.residente) {
      this.setState({
        residente: false,
        selectedDistrict: 0,
        selectedCanton: 0,
        selectedProvince: 0,
      });
    } else {
      this.setState({ residente: true });
    }
  };
  //Función para montar el componente principal
  componentDidMount() {
    this.getProvince();
    if (this.props.parent === "ver") {
      this.getPersonalData();
    }
  }
  //Función que renderiza el componente del país de MAterial UI
  renderCountrySelect() {
    var disabled, label;
    if (this.props.disabled === "disabled") {
      disabled = true;
      label = undefined;
    } else {
      disabled = false;
      label = "Seleccione el país";
    }
    if (this.props.parent === "ver" && this.state.default_country !== "") {
      return (
        <CountrySelect
          value={this.state.default_country}
          onChange={this.onChangeCountry}
          label={label}
          disabled={disabled}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <CountrySelect
          value={null}
          onChange={this.onChangeCountry}
          label={label}
          disabled={disabled}
        />
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div id="container">
        <header>
          <h4>Información personal</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <br></br>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="form-group required">
              <label htmlFor="first-name">Nombre</label>
              <input
                className="form-control"
                type="text"
                id="first-name"
                name="first-name"
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                disabled={this.props.disabled}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personNameError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="last-name1">Primer Apellido</label>
              <input
                className="form-control"
                type="text"
                id="last-name1"
                name="last-name1"
                value={this.state.primerApellido}
                onChange={this.onChangePrimerApellido}
                disabled={this.props.disabled}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personLastName1Error"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="last-name2">Segundo Apellido</label>
              <input
                className="form-control"
                type="text"
                id="last-name2"
                name="last-name2"
                value={this.state.segundoApellido}
                onChange={this.onChangeSegundoApellido}
                disabled={this.props.disabled}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personLastName2Error"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="birthdate">Fecha de nacimiento</label>
              <input
                className="form-control"
                type="date"
                id="birthdate"
                name="birthdate"
                min="1917-01-01"
                value={this.state.fechaNacimiento}
                onChange={this.onChangeFecha}
                disabled={this.props.disabled}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personDateError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="dni">Cédula de identificación</label>
              <input
                className="form-control"
                type="text"
                id="dni"
                name="dni"
                value={this.state.cedula}
                onChange={this.onChangeCedula}
                disabled={this.props.parent === "registro" ? "" : "disabled"}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personDniError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="civilState">Estado civil</label> <br></br>
              <select
                className="form-control"
                id="civilState"
                name="civilState"
                value={this.state.estadoCivil}
                onChange={this.onChangeMaritalStatus}
                disabled={this.props.disabled}
              >
                <option className="select-cs" value="" defaultValue>
                  Seleccione estado civil
                </option>
                <option value="Soltero">Soltero (a)</option>
                <option value="Casado">Casado (a)</option>
                <option value="Viudo">Viudo (a)</option>
                <option value="Divorciado">Divorciado (a)</option>
              </select>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personCivilStateError"
              ></div>
            </div>
          </div>
          <br></br>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="country" className="label-required">
                País de nacimiento
              </label>
              {this.renderCountrySelect()}
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personCountryError"
              ></div>
            </div>
            <div className="form-group">
              <label htmlFor="residencia">Residencia en Costa Rica</label>
              <input
                type="checkbox"
                id="residencia"
                name="residencia"
                checked={this.state.residente}
                onChange={this.onChangeResidente}
                disabled={this.props.disabled}
              ></input>
            </div>
            {this.state.residente ? (
              <div>
                <div className="form-group required">
                  <label htmlFor="province">Localización</label>
                  <br></br>
                  <select
                    className="form-control"
                    id="province"
                    name="provinciaSelect"
                    value={this.state.selectedProvince}
                    onChange={this.onChangeProvincia}
                    disabled={this.props.disabled}
                  >
                    <option
                      className="select-cs"
                      value=""
                      label="Seleccione la provincia"
                      defaultValue
                    >
                      {" "}
                      Seleccione la provincia{" "}
                    </option>
                    {this.state.provinces.map((province) => (
                      <option
                        key={province.id_province}
                        value={province.id_province}
                      >
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group required">
                  <select
                    className="form-control"
                    id="canton"
                    name="cantonSelect"
                    value={this.state.selectedCanton}
                    onChange={this.onChangeCanton}
                    disabled={this.props.disabled}
                  >
                    <option
                      className="select-cs"
                      value=""
                      label="Seleccione el cantón"
                      defaultValue
                    >
                      {" "}
                      Seleccione el cantón{" "}
                    </option>
                    {this.state.cantons.map((canton) => (
                      <option key={canton.id_canton} value={canton.id_canton}>
                        {canton.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group required">
                  <select
                    className="form-control"
                    id="distrito"
                    name="distritoSelect"
                    value={this.state.selectedDistrict}
                    onChange={this.onChangeDistrict}
                    disabled={this.props.disabled}
                  >
                    <option
                      className="select-cs"
                      value=""
                      label="Seleccione el distrito"
                      defaultValue
                    >
                      {" "}
                      Seleccione el distrito{" "}
                    </option>
                    {this.state.districts.map((district) => (
                      <option
                        key={district.id_district}
                        value={district.id_district}
                      >
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="personDistrictError"
                  ></div>
                </div>
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="address">Dirección exacta</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                value={this.state.direccion}
                onChange={this.onChangeDireccion}
                disabled={this.props.disabled}
              ></textarea>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personAddressError"
              ></div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <br></br>
      </div>
    );
  }
}
