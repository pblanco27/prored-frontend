import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API } from "../../services/env";
import $ from "jquery";

import Validator from "../../helpers/Validations";
import { handleSimpleInputChange } from "../../helpers/Handles";

/**
 * * Componente que muestra la ventana y elementos
 * * correspondientes para la edición de una red
 */
export default class EditNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
    };

    //bind
    this.validateShow = this.validateShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);

    //ref
    this.networkNameError = React.createRef();
  }

  /**
   * * Función que valida si el componente debe mostrarse, dependiendo
   * * de las propiedades que le entran por parámetro. En este caso el
   * * id de la red debe estar definido.
   */
  validateShow() {
    if (this.props.id_network !== 0) {
      this.setState({
        name: this.props.network_name,
        type: this.props.network_type,
      });
      this.networkNameError.current.style.display = "none";
      $("#modalRedEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una red asociada de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de editar la red si no se
   * * presentan errores en el nombre y tipo seleccionado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.networkNameError.current,
      40,
      "textSpecial"
    );

    if (!nameError) {
      const network = {
        name: this.state.name,
        type: this.state.type,
      };
      await axios.put(`${API}/network/${this.props.id_network}`, network);
      this.props.getNetworks();
      $("#modalRedEdit").modal("hide");
      swal("¡Listo!", "Se editó la red exitosamente.", "success");
      this.props.refreshThis({
        id_network: 0,
        network_key: this.props.select_key + 1,
      });
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalRedEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalRedEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar la red</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="tipoRed">Tipo de red</label>
                  <select
                    className="form-control"
                    id="tipoRed"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                  >
                    <option className="select-cs" value="" defaultValue>
                      Seleccione el nuevo tipo de red
                    </option>
                    <option value="Municipalidad">Municipalidad</option>
                    <option value="ONG">ONG</option>
                    <option value="Asociaciones">Asociaciones</option>
                    <option value="Grupo Artístico">Grupo Artístico</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="name">
                    Escriba el nuevo nombre de la red
                  </label>
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
                    ref={this.networkNameError}
                  ></div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
