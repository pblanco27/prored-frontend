import React, { Component } from "react";
import SelectAuto from "../SelectAuto/SelectAuto";
import CreateNetwork from "../Modal/CreateNetwork";
import ModalInfoAdicional from "../Modal/ModalInfoAdicional";
import CreateCampus from "../Modal/CreateCampus";
import CreateCareer from "../Modal/CreateCareer";
import axios from "axios";
import "./academicinfo.css";
/**
 * * Clase de academic info es la encargada de brindar
 * * información y registro de la información
 * * académica, entre ellos están el campus, carreras,
 * * redes, carreras asociadas
 */
export default class AcademicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Listas para cargar información desde la base
      campuses: [],
      careers: [],
      networks: [],
      other_careers: [],
      languages: [],

      //Secciones default de las listas y selects
      default_campus: "",
      default_careers: null,
      default_networks: null,
      default_other_careers: null,
      default_languages: null,

      //Información seleccionada
      selected_campus: "",
      selected_careers: [],
      selected_networks: [],
      selected_other_careers: [],
      selected_languages: [],
    };
  }

  componentDidMount() {
    this.getCampus();
    this.getCareer();
    this.getAssociated();
    this.getNetwork();
    this.getLanguage();
    if (this.props.parent === "ver") this.getAcademicInfo();
  }

  /**
   * * Función para agregar los lenguages seleccionados a la lista
   */
  onChangeLanguage = async (event, values) => {
    await this.setState({ selected_languages: [] });
    const lenguajesX = [];
    values.map((language) => lenguajesX.push(language.id));
    await this.setState({ selected_languages: lenguajesX });
  };

  /**
   * * Función para agregar los campus selecionados a la lista
   */
  onChangeCampus = async (event, values) => {
    await this.setState({ selected_campus: [] });
    if (values !== null) {
      await this.setState({ selected_campus: values.id });
    }
  };

  /**
   * * Función para agregar las carreras seleccionadas a la lista
   */
  onChangeCareers = async (event, values) => {
    await this.setState({ selected_careers: [] });
    const careersX = [];
    values.map((career) => careersX.push(career.id));
    await this.setState({ selected_careers: careersX });
  };

  /**
   * * Función para agregar las redes seleccionadas a la lista
   */
  onChangeNetworks = async (event, values) => {
    await this.setState({ selected_networks: [] });
    const networksX = [];
    values.map((network) => networksX.push(network.id));
    await this.setState({ selected_networks: networksX });
  };

  /**
   * * Función para agregar las carreras asociadas seleccionadas a la lista
   */
  onChangeAssociatedCareer = async (event, values) => {
    await this.setState({ selected_other_careers: [] });
    const otherCareerX = [];
    values.map((otherCareer) => otherCareerX.push(otherCareer.id));
    await this.setState({ selected_other_careers: otherCareerX });
  };

  /**
   * * Función para obtener todos los campus de la base
   */
  getCampus = async () => {
    const res = await axios.get(`/campus`);
    const campusesData = res.data;
    this.setState({ campuses: [] });
    campusesData.map((campus) =>
      this.state.campuses.push({
        title: campus.campus_code + " - " + campus.name,
        name: campus.name,
        id: campus.campus_code,
      })
    );
  };

  /**
   * * Función para obtener todas las carreras de la base
   */
  getCareer = async () => {
    const res = await axios.get(`/career`);
    const careerData = res.data;
    this.setState({ careers: [] });
    careerData.map((career) =>
      this.state.careers.push({
        title: career.career_code + " - " + career.degree + " - " + career.name,
        name: career.name,
        degree: career.degree,
        id: career.career_code,
      })
    );
  };

  /**
   * * Función para obtener todas las carreras asociadas de la base
   */
  getAssociated = async () => {
    const res = await axios.get(`/associated_career_center`);
    const associatedData = res.data;
    this.setState({ other_careers: [] });
    associatedData.map((assocareer) =>
      this.state.other_careers.push({
        title:
          assocareer.center_name + " - " + assocareer.associated_career_name,
        id: assocareer.id_associated_career,
      })
    );
  };

  /**
   * * Función para obtener todas las redes de la base
   */
  getNetwork = async () => {
    const res = await axios.get(`/network`);
    const networkData = res.data;
    this.setState({ networks: [] });
    networkData.map((network) =>
      this.state.networks.push({ title: network.name, id: network.id_network })
    );
  };

  /**
   * * Función para obtener todos los lenguages de la base
   */
  getLanguage = async () => {
    const res = await axios.get(`/language`);
    const languageData = res.data;
    languageData.map((language) =>
      this.state.languages.push({
        title: language.name,
        id: language.id_language,
      })
    );
  };

  /**
   * * Función para ensamblar la información académica de
   * * la persona, la cual proviene de la base
   */
  async getAcademicInfo() {
    const student = this.props.personData.student;
    const careers = this.props.personData.careers;
    var career_list = [];
    var career_ids = [];
    careers.map((career) =>
      career_list.push({
        title: career.degree + " - " + career.name,
        id: career.career_code,
      })
    );
    careers.map((career) => career_ids.push(career.career_code));
    if (this.props.load === true) {
      const networks = this.props.personData.networks;
      const asso_careers = this.props.personData.associated_careers;
      const languages = this.props.personData.languages;
      var network_list = [];
      var assocareer_list = [];
      var language_list = [];
      var network_ids = [];
      var assocareer_ids = [];
      var language_ids = [];
      networks.map((network) =>
        network_list.push({ title: network.name, id: network.id_network })
      );
      asso_careers.map((assocareer) =>
        assocareer_list.push({
          title: assocareer.center + " - " + assocareer.associated_career,
          id: assocareer.id_associated_career,
        })
      );
      languages.map((language) =>
        language_list.push({ title: language.name, id: language.id_language })
      );
      networks.map((network) => network_ids.push(network.id_network));
      asso_careers.map((assocareer) =>
        assocareer_ids.push(assocareer.id_associated_career)
      );
      languages.map((language) => language_ids.push(language.id_language));
      await this.setState({
        default_campus: {
          title: student.campus_code + " - " + student.campus,
          id: student.campus_code,
        },
        default_careers: career_list,
        default_networks: network_list,
        default_other_careers: assocareer_list,
        default_languages: language_list,
        selected_campus: student.campus_code,
        selected_careers: career_ids,
        selected_networks: network_ids,
        selected_other_careers: assocareer_ids,
        selected_languages: language_ids,
      });
    } else {
      await this.setState({
        default_campus: {
          title: student.campus_code + " - " + student.campus,
          id: student.campus_code,
        },
        default_careers: career_list,
        default_networks: [],
        default_other_careers: [],
        default_languages: [],
        selected_campus: student.campus_code,
        selected_careers: career_ids,
        selected_networks: [],
        selected_other_careers: [],
        selected_languages: [],
      });
    }
  }

  /**
   * * Función que renderiza el select del campus
   * * Dependiendo del prop de si es registro o ver renderiza
   * * con información de la base
   */
  renderCampusSelect() {
    if (this.props.parent === "ver" && this.state.default_campus !== "") {
      return (
        <SelectAuto
          id="centroUniversitario"
          list={this.state.campuses}
          value={this.state.default_campus}
          onChange={this.onChangeCampus}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <SelectAuto
          id="centroUniversitario"
          list={this.state.campuses}
          value={null}
          onChange={this.onChangeCampus}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else {
      return "";
    }
  }

  /**
   * * Función que renderiza el select de la carrera
   * * Dependiendo del prop de si es registro o ver renderiza
   * * con información de la base
   */
  renderCareerSelect() {
    if (this.props.parent === "ver" && this.state.default_careers !== null) {
      return (
        <SelectAuto
          id="careerUned"
          multiple={true}
          list={this.state.careers}
          value={this.state.default_careers}
          onChange={this.onChangeCareers}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <SelectAuto
          id="careerUned"
          multiple={true}
          list={this.state.careers}
          value={[]}
          onChange={this.onChangeCareers}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else {
      return "";
    }
  }

  /**
   * * Función que renderiza el select de los lenguajes
   * * Dependiendo del prop de si es registro o ver renderiza
   * * con información de la base
   */
  renderLanguageSelect() {
    if (this.props.parent === "ver" && this.state.default_languages !== null) {
      return (
        <SelectAuto
          id="languages"
          multiple={true}
          list={this.state.languages}
          value={this.state.default_languages}
          onChange={this.onChangeLanguage}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <SelectAuto
          id="languages"
          multiple={true}
          list={this.state.languages}
          value={[]}
          onChange={this.onChangeLanguage}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else {
      return "";
    }
  }

  /**
   * * Función que renderiza el select de las carreras asociadas
   * * Dependiendo del prop de si es registro o ver renderiza
   * * con información de la base
   */
  renderAssoCareerSelect() {
    if (this.props.parent === "ver" && this.state.default_languages !== null) {
      return (
        <SelectAuto
          id="other_careers"
          multiple={true}
          list={this.state.other_careers}
          value={this.state.default_other_careers}
          onChange={this.onChangeAssociatedCareer}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <SelectAuto
          id="other_careers"
          multiple={true}
          list={this.state.other_careers}
          value={[]}
          onChange={this.onChangeAssociatedCareer}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else {
      return "";
    }
  }

  /**
   * * Función que renderiza el select de las redes
   * * Dependiendo del prop de si es registro o ver renderiza
   * * con información de la base
   */
  renderNetworkSelect() {
    if (this.props.parent === "ver" && this.state.default_languages !== null) {
      return (
        <SelectAuto
          id="red"
          multiple={true}
          list={this.state.networks}
          value={this.state.default_networks}
          onChange={this.onChangeNetworks}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else if (this.props.parent === "registro") {
      return (
        <SelectAuto
          id="red"
          multiple={true}
          list={this.state.networks}
          value={[]}
          onChange={this.onChangeNetworks}
          disabled={this.props.disabled === "disabled" ? true : false}
        />
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="my-container academic-info">
        <header>
          <h4>Información Académica</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>

        <div className="academic-info__content">
          <div className="select-section">
            <b>Información académica (UNED)</b>

            <div className="item required">
              <label htmlFor="centroUniversitario">Centro Universitario</label>
              <div className="item-content">
                <div className="select">
                  {this.renderCampusSelect()}
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="personCampusError"
                  ></div>
                </div>
                <div className="btn-crear ml-3">
                  <CreateCampus
                    getCampus={this.getCampus}
                    parent={this.props.parent}
                    disabled={this.props.disabled}
                  />
                </div>
              </div>
            </div>

            <div className="item required">
              <label htmlFor="careerUned">
                Seleccione la (s) carrera (s) que cursa
              </label>
              <div className="item-content">
                <div className="select">
                  {this.renderCareerSelect()}
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="personCareerError"
                  ></div>
                </div>
                <div className="btn-crear ml-3">
                  <CreateCareer
                    getCareer={this.getCareer}
                    parent={this.props.parent}
                    disabled={this.props.disabled}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="select-section"
            style={{ display: this.props.load ? "block" : "none" }}
          >
            <b>Información académica adicional</b>
            <div className="item">
              <label htmlFor="other_careers">
                Seleccione el (los) curso (s) que lleva
              </label>
              <div className="item-content">
                <div className="select">{this.renderAssoCareerSelect()}</div>
                <div className="btn-crear ml-3">
                  <ModalInfoAdicional
                    getAssociated={this.getAssociated}
                    parent={this.props.parent}
                    disabled={this.props.disabled}
                  />
                </div>
              </div>
            </div>

            <b>Información de redes asociadas</b>
            <div className="item">
              <label htmlFor="red">
                Seleccione la (s) red (es) asociada (s)
              </label>
              <div className="item-content">
                <div className="select">{this.renderNetworkSelect()}</div>
                <div className="btn-crear ml-3">
                  <CreateNetwork
                    getNetwork={this.getNetwork}
                    parent={this.props.parent}
                    disabled={this.props.disabled}
                  />
                </div>
              </div>
            </div>

            <b>Idiomas</b>
            <div className="item required">
              <label htmlFor="languages">
                Seleccione el (los) idioma (s) que habla
              </label>

              <div className="item-content">
                <div className="select">
                  {this.renderLanguageSelect()}
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="personLanguageError"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
