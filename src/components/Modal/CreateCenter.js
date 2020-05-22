import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";
import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un nuevo centro educativo
 */
export default class CreateCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    //bind
    this.show = this.show.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);

    //ref
    this.centerNameError = React.createRef();
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ name: "" });
    this.centerNameError.current.style.display = "none";
    $("#modalCentro").modal("toggle");
  }

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
      await axios.post(`${API}/center`, center);
      this.props.getCenters();
      $("#modalCentro").modal("hide");
      swal(
        "¡Listo!",
        "Se creó el nuevo centro educativo exitosamente.",
        "success"
      );
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCentro"
          onClick={this.show}
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalCentro" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nuevo centro educativo</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Escriba el nombre del centro</p>
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
