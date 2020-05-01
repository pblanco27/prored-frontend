import React, { Component } from "react";
import CreateCampus from "../Modal/CreateCampus";
import EditCampus from "../Modal/EditCampus";
import CreateCareer from "../Modal/CreateCareer";
import EditCareer from "../Modal/EditCareer";
import CreateCenter from "../Modal/CreateCenter";
import EditCenter from "../Modal/EditCenter";
import CreateAsso from "../Modal/CreateAsso";
import EditAsso from "../Modal/EditAsso";
import CreateNetwork from "../Modal/CreateNetwork";
import EditNetwork from "../Modal/EditNetwork";
import SelectAuto from "../SelectAuto/SelectAuto";
import "./InfoGestion.css";
import StudentService from "../../services/StudentService";

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

    //bind
    this.refreshThis = this.refreshThis.bind(this);

    this.getCampuses = StudentService.getCampuses.bind(this);
    this.getCareers = StudentService.getCareers.bind(this);
    this.getCenters = StudentService.getCenters.bind(this);
    this.getAssociatedCareers = StudentService.getAssociatedCareers.bind(this);
    this.getNetworks = StudentService.getNetworks.bind(this);

    this.onChangeCampus = this.onChangeCampus.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onChangeAsso = this.onChangeAsso.bind(this);
    this.onChangeCenter = this.onChangeCenter.bind(this);
    this.onChangeNetwork = this.onChangeNetwork.bind(this);
  }

  componentDidMount() {
    this.getCampuses();
    this.getCareers();
    this.getCenters();
    this.getNetworks();
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
   * * Función para asignar el campus seleccionado
   */
  onChangeCampus(event, values) {
    if (values) {
      this.setState({ campus_code: values.id, campus_name: values.name });
    } else {
      this.setState({ campus_code: "" });
    }
  }

  /**
   * * Función para asignar la carrera seleccionada
   */
  onChangeCareer(event, values) {
    if (values) {
      this.setState({
        career_code: values.id,
        career_name: values.name,
        career_degree: values.degree,
      });
    } else {
      this.setState({ career_code: "" });
    }
  }

  /**
   * * Función para asignar el centro seleccionado
   */
  onChangeCenter(event, values) {
    this.setState({
      associated_careers: [],
      asso_career_key: this.state.asso_career_key + 1,
    });
    if (values) {
      this.setState({ id_center: values.id, center_name: values.name });
      this.getAssociatedCareers(values.id);
    } else {
      this.setState({ id_center: 0 });
    }
  }

  /**
   * * Función para asignar la carrera asociada
   */
  onChangeAsso(event, values) {
    if (values) {
      this.setState({ id_asso: values.id, asso_name: values.name });
    } else {
      this.setState({ id_asso: 0 });
    }
  }

  /**
   * * Función para asignar la red seleccionada
   */
  onChangeNetwork(event, values) {
    if (values) {
      this.setState({
        id_network: values.id,
        network_name: values.name,
        network_type: values.type,
      });
    } else {
      this.setState({ id_network: 0 });
    }
  }

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
                  <EditCampus
                    campus_code={this.state.campus_code}
                    select_key={this.state.campus_key}
                    campus_name={this.state.campus_name}
                    getCampuses={this.getCampuses}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <CreateCampus getCampuses={this.getCampuses} />
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
                  <EditCareer
                    career_code={this.state.career_code}
                    select_key={this.state.career_key}
                    career_name={this.state.career_name}
                    career_degree={this.state.career_degree}
                    getCareers={this.getCareers}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <CreateCareer getCareers={this.getCareers} />
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
                  <EditCenter
                    id_center={this.state.id_center}
                    center_name={this.state.center_name}
                    select_key={this.state.center_key}
                    getCenters={this.getCenters}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <CreateCenter getCenters={this.getCenters} />
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
                  <EditAsso
                    id_asso={this.state.id_asso}
                    asso_name={this.state.asso_name}
                    id_center={this.state.id_center}
                    getAssociatedCareers={this.getAssociatedCareers}
                    select_key={this.state.asso_career_key}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <CreateAsso
                    id_center={this.state.id_center}
                    getAssociatedCareers={this.getAssociatedCareers}
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
                    key={this.state.network_key}
                    id="red"
                    list={this.state.networks}
                    onChange={this.onChangeNetwork}
                  />
                </div>
                <div className="btn-editar">
                  <EditNetwork
                    id_network={this.state.id_network}
                    select_key={this.state.network_key}
                    network_name={this.state.network_name}
                    network_type={this.state.network_type}
                    getNetworks={this.getNetworks}
                    refreshThis={this.refreshThis}
                  />
                </div>
                <div className="btn-crear">
                  <CreateNetwork getNetworks={this.getNetworks} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
