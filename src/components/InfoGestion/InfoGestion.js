import React, { Component } from "react";
import ModalCampus from "../Modal/ModalCampus";
import ModalCampusEdit from "../Modal/ModalCampusEdit";
import ModalCareer from "../Modal/ModalCareer";
import ModalCareerEdit from "../Modal/ModalCareerEdit";
import ModalCentro from "../Modal/ModalCentro";
import ModalCentroEdit from "../Modal/ModalCentroEdit";
import ModalAsso from "../Modal/ModalAsso";
import ModalAssoEdit from "../Modal/ModalAssoEdit";
import ModalRed from "../Modal/ModalRed";
import ModalRedEdit from "../Modal/ModalRedEdit";
import SelectAuto from "../SelectAuto/SelectAuto";
import axios from "axios";
import "./InfoGestion.css";

/**
 * * Componente para crear y editar la información  de los selects
 * * Está encargado de mostrar los selects de la información académica
 * * y perfil amplio, brinda la posibilidad de crear y editar este tipo
 * * de datos
 */
export default class InfoGestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //listas para cargar los datos
      campuses: [],
      careers: [],
      centers: [],
      associated_careers: [],
      networks: [],

      //Parametros para elementos seleccionados
      campus_code: "",
      campus_name: "",

      career_code: "",
      career_name: "",
      career_degree: "",

      id_center: 0,
      center_name: "",

      id_asso: 0,
      asso_name: "",

      id_network: 0,
      network_name: "",
      network_type: "",

      //Parámetros para referescar los componentes
      asso_career_key: 0,
      campus_key: 0,
      career_key: 0,
      network_key: 0,
      center_key: 0,
    };
    this.refreshRender = this.refreshRender.bind(this);
    this.refreshThis = this.refreshThis.bind(this);
    this.getCampus = this.getCampus.bind(this);
  }

  componentDidMount() {
    this.getCampus();
    this.getCareer();
    this.getCenter();
    this.getNetwork();
  }

  /**
   * * Funcion para referescar los componentes de la info gestión
   * * Está encargado de mostrar los selects de la información académica
   * * y perfil amplio, brinda la posibilidad de crear y editar este tipo
   * * de datos
   */
  async refreshRender(values) {
    await this.setState({
      career_key: this.state.career_key + 1,
      career_code: "",

      id_center: 0,
      center_key: this.state.center_key + 1,
      associated_careers: [],

      id_asso: 0,
      asso_career_key: this.state.asso_career_key + 1,

      id_network: 0,
      network_key: this.state.network_key + 1,
    });
  }

  /**
   * * Funcion para referescar un select especifico
   */
  refreshThis(values) {
    this.setState({
      ...values,
    });
  }

  /**
   * * Funcion para obtener los campus
   * * Obtiene de la base los campus previamente registrados
   */
  async getCampus() {
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
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getCareer() {
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
  }

  /**
   * *Función para obtener ls centros
   * *Obtiene de la base los centros educativos previamente registradas
   */
  async getCenter() {
    const res = await axios.get(`/center`);
    const centerData = res.data;
    this.setState({ centers: [] });
    centerData.map((center) =>
      this.state.centers.push({
        title: center.name,
        name: center.name,
        id: center.id_center,
      })
    );
  }

  /**
   * * Función para obtener las carreras asociadas
   * * Obtiene de la base las carreras asociadas a centros previamente registradas
   */
  async getAssociatedCareer(idCenter) {
    const res = await axios.get(`/associated_career_from_center/${idCenter}`);
    const assoData = res.data;
    this.setState({ associated_careers: [] });
    assoData.map((assocareer) =>
      this.state.associated_careers.push({
        title: assocareer.name,
        name: assocareer.name,
        id: assocareer.id_associated_career,
      })
    );
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getNetwork() {
    const res = await axios.get(`/network`);
    const networkData = res.data;
    this.setState({ networks: [] });
    networkData.map((network) =>
      this.state.networks.push({
        title: network.name,
        name: network.name,
        type: network.network_type,
        id: network.id_network,
      })
    );
  }

  /**
   * * Función para asignar el campus seleccionado
   */
  onChangeCampus = (event, values) => {
    if (values) {
      this.setState({ campus_code: values.id, campus_name: values.name });
    } else {
      this.setState({ campus_code: "" });
    }
  };

  /**
   * * Función para asignar la carrera seleccionada
   */
  onChangeCareer = (event, values) => {
    if (values) {
      this.setState({
        career_code: values.id,
        career_name: values.name,
        career_degree: values.degree,
      });
    } else {
      this.setState({ career_code: "" });
    }
  };

  /**
   * *Función para asignar el centro seleccionado
   */
  onChangeCenter = (event, values) => {
    this.setState({
      associated_careers: [],
      asso_career_key: this.state.asso_career_key + 1,
    });
    if (values !== null) {
      this.setState({ id_center: values.id, center_name: values.name });
      this.getAssociatedCareer(values.id);
    } else {
      this.setState({ id_center: 0 });
    }
  };

  /**
   * * Función para asignar la carrera asociada
   */
  onChangeAsso = (event, values) => {
    if (values) {
      this.setState({ id_asso: values.id, asso_name: values.name });
    } else {
      this.setState({ id_asso: 0 });
    }
  };

  /**
   * * Función para asignar la red seleccionada
   */
  onChangeNetwork = (event, values) => {
    if (values) {
      this.setState({
        id_network: values.id,
        network_name: values.name,
        network_type: values.type,
      });
    } else {
      this.setState({ id_network: 0 });
    }
  };

  render() {
    return (
      <div className="my-container infoGestion">
        <header>
          <h4>Gestión de información</h4>
        </header>
        <center>
          A continuación se presentan las listas de opciones que puede cambiar
        </center>
        <div className="infoGestion-content">
          <div className="select-section">
            <b>Información académica (UNED)</b>

            <div className="item">
              <label htmlFor="centroUniversitario">Campus universitarios</label>
              <div className="item-content">
                <div className="select">
                  <SelectAuto
                    key={this.state.campus_key}
                    id="centroUniversitario"
                    list={this.state.campuses}
                    onChange={this.onChangeCampus}
                  />
                </div>
                <div className="btn-editar">
                  <ModalCampusEdit
                    campus_code={this.state.campus_code}
                    select_key={this.state.campus_key}
                    campus_name={this.state.campus_name}
                    getCampus={this.getCampus}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <ModalCampus getCampus={this.getCampus} />
                </div>
              </div>
            </div>

            <div className="item">
              <label htmlFor="carreerUned">Carreras disponibles</label>
              <div className="item-content">
                <div className="select">
                  <SelectAuto
                    key={this.state.career_key}
                    id="carreerUned"
                    list={this.state.careers}
                    onChange={this.onChangeCareer}
                  />
                </div>
                <div className="btn-editar">
                  <ModalCareerEdit
                    career_code={this.state.career_code}
                    career_name={this.state.career_name}
                    career_degree={this.state.career_degree}
                    getCareer={this.getCareer}
                    refreshThis={this.refreshRender}
                  />
                </div>
                <div className="btn-crear">
                  <ModalCareer getCareer={this.getCareer} />
                </div>
              </div>
            </div>
          </div>
          <div className="select-section">
            <b>Información adicional</b>

            <div className="item">
              <label htmlFor="center_select">Centros educativos</label>
              <div className="item-content">
                <div className="select">
                  <SelectAuto
                    key={this.state.center_key}
                    id="center_select"
                    list={this.state.centers}
                    onChange={this.onChangeCenter}
                  />
                </div>
                <div className="btn-editar">
                  <ModalCentroEdit
                    id_center={this.state.id_center}
                    center_name={this.state.center_name}
                    getCenter={this.getCenter}
                    refreshThis={this.refreshRender}
                  />
                </div>
                <div className="btn-crear">
                  <ModalCentro getCenter={this.getCenter} />
                </div>
              </div>
            </div>

            <div className="item">
              <label htmlFor="asso_career_select">
                Carreras asociadas al centro
              </label>
              <div className="item-content">
                <div className="select">
                  <SelectAuto
                    key={this.state.asso_career_key}
                    id="asso_career_select"
                    list={this.state.associated_careers}
                    onChange={this.onChangeAsso}
                  />
                </div>
                <div className="btn-editar">
                  <ModalAssoEdit
                    id_asso={this.state.id_asso}
                    asso_name={this.state.asso_name}
                    id_center={this.state.id_center}
                    has_grand_parent={true}
                    getAssociatedCareer={this.getAssociatedCareer}
                    refreshThis={this.refreshRender}
                  />
                </div>
                <div className="btn-crear">
                  <ModalAsso
                    id_center={this.state.id_center}
                    getAssociatedCareer={this.getAssociatedCareer}
                  />
                </div>
              </div>
            </div>

            <b>Información de redes</b>

            <div className="item">
              <label htmlFor="red">Redes asociadas</label>
              <div className="item-content">
                <div className="select">
                  <SelectAuto
                    id="red"
                    key={this.state.network_key}
                    list={this.state.networks}
                    onChange={this.onChangeNetwork}
                  />
                </div>
                <div className="btn-editar">
                  <ModalRedEdit
                    id_network={this.state.id_network}
                    network_name={this.state.network_name}
                    network_type={this.state.network_type}
                    getNetwork={this.getNetwork}
                    refreshThis={this.refreshRender}
                  />
                </div>
                <div className="btn-crear">
                  <ModalRed getNetwork={this.getNetwork} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
