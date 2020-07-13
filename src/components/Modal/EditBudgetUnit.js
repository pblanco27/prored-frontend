import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { put_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de una partida institucional
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

    // ref
    this.budgetUnitNameError = React.createRef();
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
   * * código de la partida institucional debe estar definido.
   */
  validateShow() {
    if (this.props.budget_unit_code !== "") {
      this.setState({ name: this.props.budget_unit_name });
      this.budgetUnitNameError.current.style.display = "none";
      $("#modalBudgetUnitEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una partida de la lista.",
        "warning"
      );
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de editar la partida institucional si
   * * no se presentan errores en el nombre ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.budgetUnitNameError.current,
      80,
      "textSpecial"
    );
    if (!nameHasError) {
      const budget_unit = {
        name: this.state.name,
      };
      const res = await put_request(
        `budget_unit/${this.props.budget_unit_code}`,
        budget_unit
      );
      if (res.status) {
        this.props.getBudgetUnits();
        $("#modalBudgetUnitEdit").modal("hide");
        swal(
          "¡Listo!",
          "Se editó la partida institucional exitosamente.",
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
          className="btn btn-info btn-md"
          data-target="#modalBudgetUnitEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalBudgetUnitEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar partida institucional</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="budgetUnitName">Nombre de la partida</label>
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
                    ref={this.budgetUnitNameError}
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
