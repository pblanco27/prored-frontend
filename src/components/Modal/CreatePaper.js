import React, { Component } from "react";
import File from "../File/File";
import swal from "sweetalert";
// import axios from "axios";
// import { API } from "../../services/env";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Validator from "../../helpers/Validations";
import Input from "../Input/Input";
import SelectCountry from "../Selects/Country";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un documento de tipo ponencia
 */
export default class CreatePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      date: "",
      speaker: "",
      place: "",
      country: "",
      paper_file: null,
    };

    //bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({
      name: "",
      type: "",
      date: "",
      speaker: "",
      place: "",
      country: "",
      paper_file: null,
    });
    $("#modalCreatePaper").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la nueva ponencia si no se
   * * presentan errores en el nombre
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleTextJquery(
      this.state.name,
      "paperNameError",
      60,
      "textSpecial"
    );

    if (nameError) {
      console.log(this.state);
      //await axios.post(`${API}/network`, network);
      //this.props.getNetworks();
      $("#modalCreatePaper").modal("hide");
      swal("¡Listo!", "Se creó la nueva ponencia exitosamente.", "success");
    }
  }

  handleCountryChange(value) {
    this.handleChange({
      target: {
        name: "country",
        value: value ? value.value : "",
      }
    });
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreatePaper"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreatePaper" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nueva ponencia</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <Input
                      label="Nombre"
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      idError="paperNameError"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Tipo de ponencia"
                      type="select"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleChange}
                      options={[]}
                      disable={this.props.disable}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Fecha"
                      type="date"
                      name="date"
                      onChange={this.handleChange}
                      value={this.state.date}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Exponente"
                      type="text"
                      name="speaker"
                      onChange={this.handleChange}
                      value={this.state.speaker}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      label="Lugar"
                      type="text"
                      name="place"
                      onChange={this.handleChange}
                      value={this.state.place}
                    />
                  </div>
                  <div className="form-group">
                    <SelectCountry
                      handleChangeParent={this.handleCountryChange}
                      value={this.state.country}
                    />
                  </div>
                  <div className="form-group">
                    Adjuntar archivo
                    <File
                      file={this.state.paper_file}
                      name={"paper_file"}
                      handleChange={this.handleChange}
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
