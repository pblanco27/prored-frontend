import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { put_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de una carrera universitaria
 */
export default class EditCareer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      degree: "",
    };

    // bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisable = this.handleDisable.bind(this);

    // ref
    this.careerNameError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Función que valida si el componente debe mostrarse, dependiendo
   * * de las propiedades que le entran por parámetro. En este caso el
   * * código de la carrera universitaria debe estar definido.
   */
  validateShow() {
    if (this.props.career_code !== "") {
      this.setState({
        name: this.props.career_name,
        degree: this.props.career_degree,
      });
      this.careerNameError.current.style.display = "none";
      $("#modalCareerEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una carrera de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de editar la carrera universitaria si
   * * no se presentan errores en el nombre y grado seleccionado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameError = Validator.validateSimpleText(
      this.state.name,
      this.careerNameError.current,
      100,
      "textSpecial"
    );
    if (!nameError) {
      const career = {
        name: this.state.name,
        degree: this.state.degree,
      };
      const res = await put_request(`career/${this.props.career_code}`, career);
      if (res.status) {
        this.props.getCareers();
        $("#modalCareerEdit").modal("hide");
        swal("¡Listo!", "Se editó la carrera exitosamente.", "success");
      }
    }
  }

  async handleDisable() {
    let res;
    if (this.props.status) {
      res = await put_request(`career/${this.props.career_code}/disable`);
    } else {
      res = await put_request(`career/${this.props.career_code}/enable`);
    }
    if (res.status) {
      this.props.getCareers();
      $("#modalCareerEdit").modal("hide");
      swal("¡Listo!", "Se editó la carrera exitosamente.", "success");
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-info btn-md"
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.careerNameError}
                  ></div>
                </div>
                <button
                  className={`btn mr-2 ${
                    this.props.status ? "btn-danger" : "btn-success"
                  }`}
                  onClick={this.handleDisable}
                >
                  {this.props.status ? "Inactivar" : "Activar"}
                </button>
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
