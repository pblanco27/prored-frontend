import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditBudgetUnit from "../Modal/EditBudgetUnit";
import CreateBudgetUnit from "../Modal/CreateBudgetUnit";
import { loading } from "./disable";

export default class SelectBudgetUnit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      budgetUnitList: [],
      budgetUnitSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectBudgetUnit",
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getBudgetUnits = this.getBudgetUnits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.budgetUnitError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.getBudgetUnits();
      this.budgetUnitError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Funcion para obtener las partidas institucionales
   * * Obtiene de la base las partidas previamente registradas
   */
  async getBudgetUnits() {
    this.loading();
    const res = await get_request(`budget_unit`);
    if (res.status && this._isMounted) {
      const budgetUnitData = res.data;
      const budgetUnitList = budgetUnitData.map((budget_unit) => ({
        label: `${!budget_unit.status ? "(Inactivado) " : ""}${
          budget_unit.code_budget_unit
        } - ${budget_unit.name}`,
        value: budget_unit.code_budget_unit,
        name: budget_unit.name,
        status: budget_unit.status,
      }));
      this.setState({
        budgetUnitList,
        budgetUnitSelected: this.props.value
          ? this.state.budgetUnitSelected
          : null,
      });
      this.setValue(this.props.value);
      this.loading(false);
    }
  }

  setValue(id) {
    const value = this.state.budgetUnitList.find((p) => {
      return p.value === id;
    });

    this.setState({ budgetUnitSelected: value ? value : null });
  }

  /**
   * * Función para asignar la partida seleccionada
   */
  handleChange(value) {
    this.setState({
      budgetUnitSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="mr-2">
          <EditBudgetUnit
            budget_unit_code={
              this.state.budgetUnitSelected
                ? this.state.budgetUnitSelected.value
                : ""
            }
            budget_unit_name={
              this.state.budgetUnitSelected
                ? this.state.budgetUnitSelected.name
                : ""
            }
            status={
              this.state.budgetUnitSelected
                ? this.state.budgetUnitSelected.status
                : ""
            }
            getBudgetUnits={this.getBudgetUnits}
          />
        </div>
      );
    }
    return null;
  }

  createButton() {
    if (!this.props.noCreate) {
      return <CreateBudgetUnit getBudgetUnits={this.getBudgetUnits} />;
    }
    return null;
  }

  render() {
    return (
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
            <Select
              options={this.state.budgetUnitList}
              value={this.state.budgetUnitSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.budgetUnitError}
              id="selectBudgetUnitError"
            ></div>
          </div>
          <div className="d-flex justify-content-center">
            {this.editButton()}
            {this.createButton()}
          </div>
        </div>
      </div>
    );
  }
}
