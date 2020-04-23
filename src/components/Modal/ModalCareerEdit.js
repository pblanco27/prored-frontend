import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import $ from "jquery";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la edición de una carrera universitaria
*/

export default class ModalCareerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      degree: "",
    };
    this.validateShow = this.validateShow.bind(this);
  }

  /*
        Función que valida si el componente debe mostrarse, dependiendo 
        de las propiedades que le entran por parámetro. En este caso el
        código de la carrera universitaria debe estar definido.
    */
  validateShow() {
    if (this.props.career_code !== "") {
      this.setState({
        name: this.props.career_name,
        degree: this.props.career_degree,
      });
      $("#careerEditNameError").hide();
      $("#modalCareerEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una carrera de la lista.",
        "warning"
      );
    }
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
        Función que asigna el nombre ingresado en la 
        variable correspondiente del estado
    */
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
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
        Se encarga de editar la carrera universitaria si
        no se presentan errores en el nombre y grado seleccionado.
    */
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.validateField(this.state.name, "#careerEditNameError");
    if (!this.state.hasError) {
      const career = {
        name: this.state.name,
        degree: this.state.degree,
      };
      await axios.put(`/career/` + this.props.career_code, career);
      this.setState({ name: "", degree: "" });
      this.props.getCareer();
      $("#modalCareerEdit").modal("hide");
      swal("¡Listo!", "Se editó la carrera exitosamente.", "success");
      this.props.refreshThis();
    }
  };

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-primary btn-md"
          data-target="#modalCareerEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalCareerEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar carrera</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="degree">Grado académico</label>
                  <select
                    className="form-control"
                    id="degree"
                    name="degree"
                    value={this.state.degree}
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
                    id="careerEditNameError"
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
                  value="Guardar"
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
