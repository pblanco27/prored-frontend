import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la creación de una nueva carrera
*/

export default class ModalCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      career_code: "",
      degree: "",
    };
    this.show = this.show.bind(this);
  }

  /*
        Función que muestra el componente y limpia las variables
        del estado, así como los mensajes de error correspondientes 
    */
  show() {
    this.setState({ name: "", career_code: "" });
    $("#careerNameError").hide();
    $("#careerCodeError").hide();
    $("#careerDegreeError").hide();
    $("#modalCareer").modal("toggle");
  }

  /*
        Función que valida el formato del nombre ingresado
        por medio de una expresión regular
    */
  async validateField(value, element_id) {
    var error = "";
    const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
    if (value === "") {
      error = "Este campo no puede ir vacío";
    } else if (value.length > 40) {
      error = "Este campo puede tener un máximo de 40 caracteres";
    } else if (!reg.test(value)) {
      error =
        "Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()";
    }
    $(element_id).text(error);
    if (error !== "") $(element_id).show();
    else $(element_id).hide();
    this.setState({ hasError: error !== "" });
  }

  /*
        Función que valida el formato del código ingresado
        por medio de una expresión regular
    */
  async validateCode(value, element_id) {
    var error = "";
    const reg = /^[0-9]+$/;
    if (value === "") {
      error = "Este campo no puede ir vacío";
    } else if (value.length > 20) {
      error = "Este campo puede tener un máximo de 20 caracteres";
    } else if (!reg.test(value)) {
      error = "Este campo puede tener únicamente números";
    }
    $(element_id).text(error);
    if (error !== "") $(element_id).show();
    else $(element_id).hide();
    this.setState({ hasError: error !== "" });
  }

  /*
        Función que valida que el select o combo box tenga
        una opción debidamente seleccionada
    */
  async validateSelect(value, element_id) {
    var error = "";
    if (value === "") {
      error = "Debe seleccionar una opción de la lista";
    }
    $(element_id).text(error);
    if (error !== "") $(element_id).show();
    else $(element_id).hide();
    this.setState({ hasError: error !== "" });
  }

  /*
        Función que asigna el nombre ingresado en la 
        variable correspondiente del estado
    */
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  /*
        Función que asigna el código ingresado en la 
        variable correspondiente del estado
    */
  handleChangeCode = (event) => {
    this.setState({ career_code: event.target.value });
  };

  /*
        Función que asigna el grado seleccionado en la 
        variable correspondiente del estado
    */
  handleChangeDegree = (event) => {
    this.setState({ degree: event.target.value });
  };

  /*
        Función que maneja el envío del formulario.
        Se encarga de crear la carrera universitaria si
        no se presentan errores en el nombre, código y grado seleccionado.
    */
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.validateField(this.state.name, "#careerNameError");
    const nameError = this.state.hasError;
    await this.validateCode(this.state.career_code, "#careerCodeError");
    const codeError = this.state.hasError;
    await this.validateSelect(this.state.degree, "#careerDegreeError");
    const degreeError = this.state.hasError;
    if (!nameError && !codeError && !degreeError) {
      const career = {
        name: this.state.name,
        career_code: this.state.career_code,
        degree: this.state.degree,
      };
      const idCareer = career.career_code;
      const semaforoCreacion = await axios.post("/career_exists", {
        id: idCareer,
      });
      if (!semaforoCreacion.data.careerexists) {
        await axios.post(`/career`, career);
        this.setState({ name: "", career_code: "" });
        this.props.getCareer();
        $("#modalCareer").modal("hide");
        swal("¡Listo!", "Se creó la nueva carrera exitosamente.", "success");
      } else {
        swal(
          "¡Atención!",
          "No se creó la carrera debido a que su código ya se encuentra asociado",
          "warning"
        );
      }
    }
  };

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalCareer"
          onClick={this.show}
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalCareer" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva carrera</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="careerCode">Código de la carrera</label>
                  <input
                    className="form-control"
                    type="text"
                    id="careerCode"
                    name="career_code"
                    value={this.state.career_code}
                    onChange={this.handleChangeCode}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="careerCodeError"
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="degree">Grado académico</label>
                  <select
                    className="form-control"
                    id="degree"
                    name="degree"
                    onChange={this.handleChangeDegree}
                  >
                    <option className="select-cs" value="" defaultValue>
                      Seleccione un grado
                    </option>
                    <option value="Diplomado">Diplomado</option>
                    <option value="Bachillerato">Bachillerato</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                  </select>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="careerDegreeError"
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="nombreCareer">Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    id="nombreCareer"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none", fontSize: 12 }}
                    id="careerNameError"
                  ></div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Crear"
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
