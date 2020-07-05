import React, { Component } from "react";
import BudgetInformation from "../BudgetInformation/BudgetInformation";
import { handleSimpleInputChange } from "../../helpers/Handles";
import swal from "sweetalert";

export default class Budget extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      disable: this.props.match.params.id_budget ? true : false,
      edit: this.props.match.params.id_budget ? true : false,
      budget_unit: "",
      budget_subunit: "",
      date: "",
      amount: "",
      dni: "",
      budget_type: "Independiente",
      id_project: null,
      id_activity: null,
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({
        show: false,
      });
    }
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

  loadBudget() {
    console.log("cargando partida de la BD");
  }

  handleSubmit() {
    console.log(this.state);
    if (this.props.match.params.id_budget) {
      //this.preEditProject();
      console.log("editando");
    } else {
      //this.preCreateProject();
      console.log("creando");
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
