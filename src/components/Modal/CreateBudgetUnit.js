import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request, get_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva partida institucional
 */
export default class CreateBudgetUnit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
    };

    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.show = this.show.bind(this);

    // ref
    this.budgetUnitNameError = React.createRef();
    this.budgetUnitCodeError = React.createRef();
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
    this.setState({ name: "", code: "" });
    this.budgetUnitNameError.current.style.display = "none";
    this.budgetUnitCodeError.current.style.display = "none";
    $("#modalBudgetUnit").modal("toggle");
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear la nueva partida institucional si
   * * no se presentan errores en el nombre y el código ingresado.
   */
  async handleSubmit(event) {
    event.preventDefault();
    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.budgetUnitNameError.current,
      80,
      "textSpecial"
    );

    const codeHasError = Validator.validateSimpleText(
      this.state.code,
      this.budgetUnitCodeError.current,
      20,
      "onlyNumber"
    );

    if (!nameHasError && !codeHasError) {
      const budget_unit = {
        name: this.state.name,
        id: this.state.code,
      };
      const exist = await get_request(`budget_unit/${budget_unit.id}/exists`);
      if (exist.status) {
        if (!exist.data.budgetunitexists) {
          const res = await post_request(`budget_unit`, budget_unit);
          if (res.status) {
            this.props.getBudgetUnits();
            $("#modalBudgetUnit").modal("hide");
            swal(
              "¡Listo!",
              "Se creó la nueva partida institucional exitosamente.",
              "success"
            );
          }
        } else {
          swal(
            "¡Atención!",
            "No se creó la partida debido a que su código ya se encuentra asociado",
            "warning"
          );
        }
      }
    }
  }

  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalBudgetUnit"
          onClick={this.show}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal fade" id="modalBudgetUnit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Crear nueva partida institucional
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="budgetUnitCode">Código de la partida</label>
                  <input
                    className="form-control"
                    type="text"
                    name="code"
                    value={this.state.code}
                    onChange={this.handleChange}
                  ></input>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.budgetUnitCodeError}
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="budgetUnitName">Nombre</label>
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
