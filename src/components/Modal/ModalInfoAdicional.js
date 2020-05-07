import React, { Component } from "react";
import CreateAsso from "./CreateAsso";
import CreateCenter from "./CreateCenter";
import SelectAuto from "../SelectAuto/SelectAuto";
import axios from "axios";
import { API } from "../../services/env";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la creación de nuevos centros educativos y carreras 
*/

export default class ModalInfoAdicional extends Component {
  state = {
    centers: [],
    associatedCareers: [],
    id_center: 0,
    careerSelectKey: 0,
  };

  //Función para obtener los centros educativos de la base
  getCenter = async () => {
    const res = await axios.get(`${API}/center`);
    const centerData = res.data;
    this.setState({ centers: [] });
    centerData.map((center) =>
      this.state.centers.push({ title: center.name, id: center.id_center })
    );
  };

  //Función para obtener todas las carreras asociadas de la base
  getAssociatedCareer = async (idCenter) => {
    const res = await axios.get(
      `${API}/associated_career_from_center/${idCenter}`
    );
    const assoData = res.data;
    this.setState({ associatedCareers: [] });
    assoData.map((assocareer) =>
      this.state.associatedCareers.push({
        title: assocareer.name,
        id: assocareer.id_associated_career,
      })
    );
  };

  /*
        Función que se ejecuta cuando el componente se monta.
        En este caso únicamente se obtienen todos los centro educativos
    */
  componentDidMount() {
    this.getCenter();
  }

  /*
        Función que se ejecuta cuando se selecciona un centro educativo.
        Sí es válido, se obtienen todas las carreras asociadas del mismo.
    */
  onChangeCenter = (event, values) => {
    let key = this.state.careerSelectKey;
    key = key + 1
    this.setState({ associatedCareers: [], careerSelectKey: key});
    if (values !== null) {
      this.setState({ id_center: values.id });
      this.getAssociatedCareer(values.id);
    } else {
      this.setState({ id_center: 0 });
    }
  };

  /*
        Función que renderiza el select o combox de las carreras asociadas.
        Dependiendo de si el centro tiene o no carreras asociadas, se setea
        el valor en nulo con el fin de limpiar el select
    */
  renderCareerSelect() {
    if (this.state.associatedCareers.length === 0) {
      return (
        <SelectAuto
          key={this.state.careerSelectKey}
          id="careerSelect"
          label="Carrera"
          list={this.state.associatedCareers}
          value={null}
        />
      );
    } else {
      return (
        <SelectAuto
          key={this.state.careerSelectKey}
          id="careerSelect"
          label="Carrera"
          list={this.state.associatedCareers}
        />
      );
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalInfoAdicional"
          data-toggle="modal"
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalInfoAdicional" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            {" "}
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva carrera</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <b className="d-block">Nota:</b>
                  Antes de crear una nueva carrera, verifique a continuación que
                  esta no existe
                </p>
                <div className="item">
                  <div className="item-content">
                    <div className="select">
                      <SelectAuto
                        id="centerSelect"
                        list={this.state.centers}
                        label="Centro Educativo"
                        onChange={this.onChangeCenter}
                      />
                    </div>
                    <div className="btn-crear ml-3">
                      <CreateCenter getCenter={this.getCenter} />
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-content">
                    <div className="select">{this.renderCareerSelect()}</div>
                    <div className="btn-crear ml-3">
                      <CreateAsso
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
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
