import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de un centro educativo
 */
export default class EditCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    //bind
    this.validateShow = this.validateShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);

    //ref
    this.centerNameError = React.createRef();
  }

  /**
   * * Función que valida si el componente debe mostrarse, dependiendo
   * * de las propiedades que le entran por parámetro. En este caso el
   * * id del centro educativo debe estar definido.
   */
  validateShow() {
    if (this.props.id_center !== 0) {
      this.setState({ name: this.props.center_name });
      this.centerNameError.current.style.display = "none";
      $("#modalCentroEdit").modal("toggle");
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
   * * Se encarga de editar el centro educativo si
   * * no se presentan errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.centerNameError.current,
      40,
      "textSpecial"
    );

    if (!nameError) {
      const center = {
        name: this.state.name,
      };
      await axios.put(`${API}/center/${this.props.id_center}`, center);
      this.props.getCenter();
      $("#modalCentroEdit").modal("hide");
      swal("¡Listo!", "Se editó el centro exitosamente.", "success");
      this.props.refreshThis({
        id_center: 0,
        center_key: this.props.select_key + 1,
        associated_careers: [],
      });
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalCentroEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalCentroEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar centro educativo</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Escriba el nuevo nombre del centro</p>
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
                    ref={this.centerNameError}
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
