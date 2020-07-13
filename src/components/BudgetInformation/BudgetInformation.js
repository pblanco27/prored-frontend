import React, { Component } from "react";
import Input from "../Input/Input";
import { budget_type } from "../../helpers/Enums";
import SelectBudgetUnit from "../Selects/BudgetUnit";
import SelectBudgetSubUnit from "../Selects/BudgetSubUnit";
import SelectStudent from "../Selects/Student";
import SelectProject from "../Selects/Project";
import SelectActivity from "../Selects/Activity";
import { Link } from "react-router-dom";

/**
 * * Componente que contiene y muestra la información general de una
 * * partida presupuestaria, a la hora de crear y visualizar información
 */
export default class BudgetInformation extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    // bind
    this.handleBudgetUnitChange = this.handleBudgetUnitChange.bind(this);
    this.handleBudgetSubUnitChange = this.handleBudgetSubUnitChange.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleBudgetTypeChange = this.handleBudgetTypeChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleBudgetUnitChange(value) {
    this.props.handleChange({
      target: {
        name: "code_unit",
        value: value ? value.value : "",
      },
    });
  }

  handleBudgetSubUnitChange(value) {
    this.props.handleChange({
      target: {
        name: "code_subunit",
        value: value ? value.value : "",
      },
    });
  }

  handleStudentChange(value) {
    this.props.handleChange({
      target: {
        name: "dni",
        value: value ? value.value : "",
      },
    });
  }

  handleBudgetTypeChange(event) {
    this.props.handleChange({
      target: {
        name: "id_project",
        value: null,
      },
    });
    this.props.handleChange({
      target: {
        name: "id_activity",
        value: null,
      },
    });
    this.props.handleChange({
      target: {
        name: "type",
        value: event.target.value,
      },
    });
  }

  handleProjectChange(value) {
    this.props.handleChange({
      target: {
        name: "id_project",
        value: value ? value.value : null,
      },
    });
  }

  handleActivityChange(value) {
    this.props.handleChange({
      target: {
        name: "id_activity",
        value: value ? value.value : null,
      },
    });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Partida</h4>
          </header>
          <center>
            Los campos marcados con <span>*</span> son requeridos
          </center>
          <div className="d-lg-flex card-body px-4 d-md-block">
            <div className="w-100">
              <b>Información general</b>
              <div className="select-section form-group">
                <SelectBudgetUnit
                  label="Partida"
                  required={true}
                  noEdit={true}
                  handleChangeParent={this.handleBudgetUnitChange}
                  disable={this.props.disable}
                  value={this.props.code_unit}
                />
              </div>

              <div className="select-section form-group">
                <SelectBudgetSubUnit
                  label="Sub partida"
                  required={true}
                  noEdit={true}
                  handleChangeParent={this.handleBudgetSubUnitChange}
                  disable={this.props.disable}
                  value={this.props.code_subunit}
                />
              </div>

              <Input
                label="Fecha"
                type="date"
                name="date_created"
                value={this.props.date_created}
                onChange={this.props.handleChange}
                idError="budgetDateError"
                required={true}
                disable={this.props.disable}
              />

              <Input
                label="Monto"
                type="number"
                name="amount"
                value={this.props.amount}
                onChange={this.props.handleChange}
                idError="budgetAmountError"
                required={true}
                disable={this.props.disable}
              />
            </div>
            <div className="w-100">
              <b>Vinculación</b>
              <div className="select-section form-group">
                <SelectStudent
                  label="Estudiante"
                  required={true}
                  handleChangeParent={this.handleStudentChange}
                  disable={this.props.disable}
                  value={this.props.dni}
                />
              </div>

              <Input
                label="Asociado a"
                type="select"
                name="type"
                value={this.props.type}
                onChange={this.handleBudgetTypeChange}
                options={budget_type}
                disable={this.props.disable}
              />

              {this.props.type === "Proyecto" && (
                <SelectProject
                  label="Proyecto"
                  required={true}
                  handleChangeProject={this.handleProjectChange}
                  disable={this.props.disable}
                  value={this.props.id_project}
                />
              )}

              {this.props.type === "Actividad" && (
                <SelectActivity
                  label="Actividad"
                  required={true}
                  handleChangeActivity={this.handleActivityChange}
                  disable={this.props.disable}
                  value={this.props.id_activity}
                />
              )}

              {this.props.edit && (
                <div>
                  <hr />
                  <Link
                    to={`/documentos-partida/${this.props.id_financial_item}`}
                  >
                    Ver documentos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
