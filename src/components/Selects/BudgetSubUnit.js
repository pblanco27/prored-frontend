import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditBudgetSubUnit from "../Modal/EditBudgetSubUnit";
import CreateBudgetSubUnit from "../Modal/CreateBudgetSubUnit";
import { loading } from "./disable";

export default class SelectBudgetSubUnit extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      budgetSubList: [],
      budgetSubSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectBudgetSubUnit",
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getBudgetSubUnits = this.getBudgetSubUnits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.budgetSubUnitError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.getBudgetSubUnits();
      this.budgetSubUnitError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Funcion para obtener las subpartidas institucionales
   * * Obtiene de la base las subpartidas previamente registradas
   */
  async getBudgetSubUnits() {
    this.loading();
    const res = await get_request(`budget_subunit`);
    if (res.status && this._isMounted) {
      const budgetSubData = res.data;
      const budgetSubList = budgetSubData.map((budget_sub) => ({
        label: `${!budget_sub.status ? "(Inactivado) " : ""}${budget_sub.name}`,
        value: budget_sub.code_budget_subunit,
        name: budget_sub.name,
        status: budget_sub.status,
      }));
      this.setState({
        budgetSubList,
        budgetSubSelected: this.props.value
          ? this.state.budgetSubSelected
          : null,
      });
      this.setValue(this.props.value);
      this.loading(false);
    }
  }

  /**
   * * Función para asignar la subpartida seleccionada
   */
  handleChange(value) {
    this.setState({
      budgetSubSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="mr-2">
          <EditBudgetSubUnit
            id_budget_subunit={
              this.state.budgetSubSelected
                ? this.state.budgetSubSelected.value
                : ""
            }
            budget_subunit_name={
              this.state.budgetSubSelected
                ? this.state.budgetSubSelected.name
                : ""
            }
            status={
              this.state.budgetSubSelected
                ? this.state.budgetSubSelected.status
                : ""
            }
            getBudgetSubUnits={this.getBudgetSubUnits}
          />
        </div>
      );
    }
    return null;
  }

  setValue(id) {
    const value = this.state.budgetSubList.find((p) => {
      return p.value === id;
    });
    this.setState({ budgetSubSelected: value ? value : null });
  }

  createButton() {
    if (!this.props.noCreate) {
      return <CreateBudgetSubUnit getBudgetSubUnits={this.getBudgetSubUnits} />;
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
              options={this.state.budgetSubList}
              value={this.state.budgetSubSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.budgetSubUnitError}
              id="selectBudgetSubUnitError"
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
