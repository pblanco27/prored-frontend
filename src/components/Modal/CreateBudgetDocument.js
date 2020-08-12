import React, { Component } from "react";
import LoadingBar from "./LoadingBar";
import File from "../File/File";
import swal from "sweetalert";
import $ from "jquery";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { API } from "../../services/env";
import axios from "axios";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de un nuevo documento para partida
 */
export default class CreateBudgetDocument extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      budget_file: null,
      uploadPercentage: 0,
      uploading: false,
      options: {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
      },
    };

    //bind
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
    this.setState({ budget_file: null });
    $("#modalCreateBudgetDocument").modal("toggle");
  }

  async createBudgetDocument() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado guardará la información de la partida",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.budget_file) {
          const data = new FormData();
          data.append("tabla", "budget_document");
          data.append("id_financial_item", this.props.id_budget);
          data.append("file", this.state.budget_file);
          this.setState({ uploading: true });

          const res = await axios.post(
            `${API}/finantial_document`,
            data,
            this.state.options
          );
          if (res.status === 200) {
            this.setState({ uploadPercentage: 100 }, () => {
              setTimeout(() => {
                $("#loadingBar").modal("hide");
                this.setState({ uploadPercentage: 0, uploading: false });
                swal(
                  "¡Listo!",
                  "Se creó la foto exitosamente.",
                  "success"
                ).then(() => {
                  this.props.updateSelect();
                  $("#modalCreateBudgetDocument").modal("toggle");
                });
              }, 1000);
            });
          }
        }
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.budget_file) {
      this.createBudgetDocument();
    } else {
      swal("¡Atención!", "Debe seleccionar un archivo.", "warning");
    }
  }

  // Función que renderiza el componente para mostrarlo en pantalla
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalCreateBudgetDocument"
          onClick={this.show}
        >
          Agregar documento <i className="fas fa-plus"></i>
        </button>

        <div className="modal-container">
          <div
            className="modal fade"
            id="modalCreateBudgetDocument"
            role="dialog"
          >
            <div className="modal-dialog modal-md modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Crear nuevo documento</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <File
                    file={this.state.budget_file}
                    name={"budget_file"}
                    handleChange={this.handleChange}
                    image={true}
                  />
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
        {this.state.uploading && (
          <LoadingBar uploadPercentage={this.state.uploadPercentage} />
        )}
      </>
    );
  }
}
