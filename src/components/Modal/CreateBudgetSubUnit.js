import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva subpartida institucional
 */
export default class CreateBudgetSubUnit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.show = this.show.bind(this);

    // ref
    this.budgetSubNameError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Función que muestra el componente y limpia las variables
   * * del estado, así como los mensajes de error correspondientes
   */
  show() {
    this.setState({ name: "" });
    this.budgetSubNameError.current.style.display = "none";
    $("#modalBudgetSubUnit").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la nueva partida institucional si
   * * no se presentan errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.budgetSubNameError.current,
      80,
      "textSpecial"
    );

    if (!nameHasError) {
      const budget_subunit = { name: this.state.name };      
      const res = await post_request(`budget_subunit`, budget_subunit);
      if (res.status) {
        this.props.getBudgetSubUnits();
        $("#modalBudgetSubUnit").modal("hide");
        swal(
          "¡Listo!",
          "Se creó la nueva subpartida exitosamente.",
          "success"
        );
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalBudgetSubUnit"
          onClick={this.show}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal fade" id="modalBudgetSubUnit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Crear nueva subpartida institucional
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">                
                <div className="form-group">
                  <label htmlFor="budgetSubUnitName">Nombre</label>
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
                    ref={this.budgetSubNameError}
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
