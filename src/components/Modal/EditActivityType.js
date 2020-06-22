import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de un determinado tipo de actividad
 */
export default class EditActivityType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    // bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // ref
    this.typeNameError = React.createRef();
  }

  validateShow() {
    if (this.props.id_acti_type !== "") {
      this.setState({ name: this.props.name });
      this.typeNameError.current.style.display = "none";
      $("#modalActivityTypeEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un tipo de actividad de la lista.",
        "warning"
      );
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.typeNameError.current,
      40,
      "textSpecial"
    );
    if (!nameHasError) {
      const type = {
        name: this.state.name,
      };
      await axios.put(`${API}/activity/type/${this.props.id_acti_type}`, type);
      this.props.getActivityType();
      $("#modalActivityTypeEdit").modal("hide");
      swal(
        "¡Listo!",
        "Se editó el tipo de actividad exitosamente.",
        "success"
      );
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-info btn-md"
          data-target="#modalActivityTypeEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalActivityTypeEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar tipo de actividad</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nombreCampus">Nombre del tipo de actividad</label>
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
                    ref={this.typeNameError}
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
