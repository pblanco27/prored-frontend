import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
// import axios from "axios";
// import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Validator from "../../helpers/Validations";
import Input from "../Input/Input";
import { endorsement_type } from "../../helpers/Enums";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo aval
 */
export default class CreateEndorsement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Interno",
      endorsement_file: null,
    };

    //bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ endorsement_file: null });
    $("#modalCreateEndorsement").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear el nuevo aval si no se
   * * presentan errores en el tipo y archivo seleccionado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const fileError = Validator.validateSimpleFileJquery(
      this.state.endorsement_file,
      "endorsementFileError"
    );

    if (fileError) {
      console.log(this.state);
      //await axios.post(`${API}/network`, network);
      //this.props.getNetworks();
      $("#modalCreateEndorsement").modal("hide");
      swal("¡Listo!", "Se creó el nuevo aval exitosamente.", "success");
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreateEndorsement"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>
        
        <div className="modal-container">
          <div className="modal fade" id="modalCreateEndorsement" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo aval</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <Input
                      label="Tipo de aval"
                      type="select"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleChange}
                      options={endorsement_type}
                      disable={this.props.disable}
                    />
                  </div>
                  <div className="form-group">
                    <File
                      file={this.state.endorsement_file}
                      name={"endorsement_file"}
                      handleChange={this.handleChange}
                      idError={"endorsementFileError"}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" data-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
