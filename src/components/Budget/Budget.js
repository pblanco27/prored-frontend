import React, { Component } from "react";
import BudgetInformation from "../BudgetInformation/BudgetInformation";
import { handleSimpleInputChange } from "../../helpers/Handles";
import swal from "sweetalert";
import { createBudgetObject, validateBudget } from "./functions";
import { createBudget } from "./createFunctions";
import { get_request } from "../../helpers/Request";
import { editBudget } from "./editFunctions";

export default class Budget extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      disable: this.props.match.params.id_budget ? true : false,
      edit: this.props.match.params.id_budget ? true : false,
      date_created: "",
      amount: "",
      type: "Independiente",
      id_project: null,
      id_activity: null,
      dni: "",
      code_unit: "",
      code_subunit: "",
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.createBudgetObject = createBudgetObject.bind(this);
    this.createBudget = createBudget.bind(this);
    this.editBudget = editBudget.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({
        show: false,
      });
    }
    //!Esto no esta en el isMonted
    if (this.props.match.params.id_budget) {
      this.loadBudget(this.props.match.params.id_budget);
    } else {
      if (this._isMounted) {
        this.setState({
          show: true,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async loadBudget(id_budget) {
    const res = await get_request(`financial_item/${id_budget}`);
    if (res.status && this._isMounted) {
      const budget = res.data;
      this.setState({ ...budget, show: true });
    }
  }

  preCreateBudget() {
    const budget = this.createBudgetObject();
    if (!validateBudget(budget)) {
      this.createBudget(budget);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  preEditBudget() {
    const budget = this.createBudgetObject();
    if (!validateBudget(budget)) {
      this.editBudget(budget);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  handleSubmit() {
    if (this.state.edit) {
      this.preEditBudget();
    } else {
      this.preCreateBudget();
    }
  }

  handleDisable() {
    if (this.state.disable) {
      this.setState({ disable: false });
    } else {
      swal({
        title: "¡Atención!",
        text: "Una vez ejecutado se eliminarán los cambios hechos",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((willConfirm) => {
        if (willConfirm) {
          window.location.reload();
        } else {
          swal("Los cambios siguen intactos, continue la edición", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  renderBtns() {
    if (this.state.edit) {
      if (this.state.disable) {
        return (
          <button
            type="submit"
            className="btn btn-lg btn-info"
            onClick={this.handleDisable}
          >
            Editar
          </button>
        );
      } else {
        return (
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-lg btn-danger"
              onClick={this.handleDisable}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              Guardar Cambios
            </button>
          </div>
        );
      }
    } else {
      return (
        <button
          type="submit"
          className="btn btn-lg btn-success"
          onClick={this.handleSubmit}
        >
          Crear
        </button>
      );
    }
  }

  render() {
    if (this.state.show) {
      return (
        <>
          {this.state.edit && (
            <div className="container mt-3">
              <button
                onClick={() => {
                  this.goBack();
                }}
                className="btn btn-secondary"
              >
                <i className="fas fa-chevron-left"></i> Volver
              </button>
            </div>
          )}
          <BudgetInformation
            handleChange={this.handleChange}
            {...this.state}
            disable={this.state.disable}
          />

          <div className="d-flex justify-content-center mt-1 mb-3">
            {this.renderBtns()}
          </div>
          {/* {this.state.uploading && (
            <LoadingBar uploadPercentage={this.state.uploadPercentage} />
          )} */}
        </>
      );
    } else {
      return null;
    }
  }
}
