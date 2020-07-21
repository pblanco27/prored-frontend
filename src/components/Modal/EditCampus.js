import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { put_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de un campus universitario
 */
export default class EditCampus extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    // bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisable = this.handleDisable.bind(this);

    // ref
    this.campusNameError = React.createRef();
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
   * * código del campus universitario debe estar definido.
   */
  validateShow() {
    if (this.props.campus_code !== "") {
      this.setState({ name: this.props.campus_name });
      this.campusNameError.current.style.display = "none";
      $("#modalCampusEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un campus universitario de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de editar el campus universitario si
   * * no se presentan errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.campusNameError.current,
      80,
      "textSpecial"
    );
    if (!nameHasError) {
      const campus = {
        name: this.state.name,
      };
      const res = await put_request(`campus/${this.props.campus_code}`, campus);
      if (res.status) {
        this.props.getCampuses();
        $("#modalCampusEdit").modal("hide");
        swal(
          "¡Listo!",
          "Se editó el campus universitario exitosamente.",
          "success"
        );
      }
    }
  }

  async handleDisable() {
    let res;
    if (this.props.status) {
      res = await put_request(`campus/${this.props.campus_code}/disable`);
    } else {
      res = await put_request(`campus/${this.props.campus_code}/enable`);
    }
    if (res.status) {
      this.props.getCampuses();
      $("#modalCampusEdit").modal("hide");
      swal(
        "¡Listo!",
        "Se editó el campus universitario exitosamente.",
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
          data-target="#modalCampusEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalCampusEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar campus universitario</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nombreCampus">Nombre del campus</label>
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
                    ref={this.campusNameError}
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
