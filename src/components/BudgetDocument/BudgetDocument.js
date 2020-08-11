import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { get_request, delete_request } from "../../helpers/Request";
import CreateBudgetDocument from "../Modal/CreateBudgetDocument";
import { API } from "../../services/env";
import swal from "sweetalert";

/**
 * * Componente que contiene y muestra la información de los
 * * documentos de una actividad, tanto para creación como visualización
 */
export default class BudgetDocument extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      ...props.match.params,
      budgetList: [],
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleDeleteBudget = this.handleDeleteBudget.bind(this);
    this.getDocuments = this.getDocuments.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getDocuments();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderDocumentType() {}

  goBack() {
    this.props.history.goBack();
  }

  async getDocuments() {
    const res = await get_request(
      `finantial_document/item/${this.state.id_budget}`
    );
    if (res.status && this._isMounted) {
      const budgetList = res.data;
      this.setState({
        budgetList,
      });
    }
  }

  handleDeleteBudget(event) {
    const value = event.target.value;
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el documento del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`finantial_document/${value}`);
        if (res.status) {
          swal("Se eliminó el documento exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.getDocuments();
        }
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  render() {
    const documents = this.state.budgetList.map((p, i) => {
      return (
        <div className="card mb-3" key={p.id_financial_document}>
          <div className="card-body">
            <div className="card-title">{`Documento #${i + 1}`}</div>
            <div className="btn-container">
              <a
                className="btn btn-info"
                href={`${API}/${p.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver documento
              </a>
              <button
                className="btn btn-danger"
                onClick={this.handleDeleteBudget}
                value={p.id_financial_document}
              >
                Eliminar documento
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
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

        <div className="container my-4">
          <div className="card">
            <div className="d-flex justify-content-center mt-3">
              <CreateBudgetDocument
                id_budget={this.state.id_budget}
                updateSelect={this.getDocuments}
              />
            </div>
            <hr className="w-75 mx-auto" />

            <div className="w-75 mx-auto">
              <div className="w-100">{documents}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
