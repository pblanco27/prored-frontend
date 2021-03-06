import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { period_type, period_cycle } from "../../helpers/Enums";
import { post_request } from "../../helpers/Request";
import Input from "../Input/Input";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un nuevo período
 */
export default class CreatePeriod extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      type: "Semestre",
      cycle: "I",
      year: "2020",
    };

    // bind
    this.show = this.show.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  show() {
    $("#modalCreatePeriod").modal("toggle");
  }

  getPeriodCycles() {
    switch (this.state.type) {
      case "Semestre":
        return [period_cycle[0], period_cycle[1]];
      case "Cuatrimestre":
        return [period_cycle[0], period_cycle[1], period_cycle[2]];
      case "Bimestre":
        return [
          period_cycle[0],
          period_cycle[1],
          period_cycle[2],
          period_cycle[3],
          period_cycle[4],
        ];
      default:
        return [];
    }
  }

  /**
   * * Función que maneja el envío del formulario.
   * * Se encarga de crear el nuevo período si no se
   * * presentan errores de repetición de datos
   */
  async handleSubmit(event) {
    event.preventDefault();
    const period_name = `${this.state.cycle} ${this.state.type} ${this.state.year}`;
    const name = { name: period_name };
    const exist = await post_request(`period/exists`, name);
    if (exist.status) {
      const period_exists = exist.data.periodexists;
      if (!period_exists) {
        const res = await post_request(`period`, name);
        if (res.status) {
          this.props.getPeriods();
          $("#modalCreatePeriod").modal("hide");
          swal("¡Listo!", "Se creó el nuevo período exitosamente.", "success");
        }
      } else {
        swal("¡Atención!", "El período ingresado ya existe.", "warning");
      }
    }
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreatePeriod"
          onClick={this.show}
          disabled={this.props.disable}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div className="modal fade" id="modalCreatePeriod" role="dialog">
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo período</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <Input
                      label="Tipo de período"
                      type="select"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleChange}
                      options={period_type}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      label="Ciclo"
                      type="select"
                      name="cycle"
                      value={this.state.cycle}
                      onChange={this.handleChange}
                      options={this.getPeriodCycles()}
                    />
                  </div>
                  <div className="form-group px-3">
                    Año <br></br>
                    <input
                      type="number"
                      name="year"
                      min="1980"
                      max="2099"
                      step="1"
                      onChange={this.handleChange}
                      value={this.state.year}
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
