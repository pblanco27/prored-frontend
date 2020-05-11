import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/*
    
    
*/
/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva carrera asociada
 */
export default class CreateAsso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    //Bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //ref
    this.assoNameError = React.createRef();
  }

  /**
   * * Función que valida si el componente debe mostrarse, dependiendo
   * * de las propiedades que le entran por parámetro. En este caso el
   * * id del centro educativo debe estar definido.
   */
  validateShow() {
    if (this.props.id_center !== 0) {
      this.setState({ name: "" });
      this.assoNameError.current.style.display = "none";
      $("#modalAsso").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un centro educativo de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la carrera asociada si no se presentan
   * * errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.assoNameError.current,
      40,
      "textSpecial"
    );
    if (!nameError) {
      const assocareer = {
        name: this.state.name,
        id_center: this.props.id_center,
      };
      await axios.post(`${API}/associated_career`, assocareer);
      this.props.getAssoCareers(this.props.id_center);

      // * Dependiendo si vengo del modal, debo actualizar el select de mi grandparent
      if (this.props.has_grand_parent) {
        this.props.getAssociated();
      }
      $("#modalAsso").modal("hide");
      swal(
        "¡Listo!",
        "Se creó la nueva carrera asociada exitosamente.",
        "success"
      );
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalAsso"
          onClick={this.validateShow}
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalAsso" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva carrera asociada</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Escriba el nombre de la carrera</p>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.assoNameError}
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
