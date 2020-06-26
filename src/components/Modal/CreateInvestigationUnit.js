import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { post_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de una nueva unidad de investigación
 */
export default class CreateInvesUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.show = this.show.bind(this);

    // ref
    this.investUnitNameError = React.createRef();
    this.investUnitDescriptionError = React.createRef();
  }

  show() {
    this.setState({ name: "", description: "" });
    this.investUnitNameError.current.style.display = "none";
    this.investUnitDescriptionError.current.style.display = "none";
    $("#modalInvestUnit").modal("toggle");
  }

  async handleSubmit(event) {
    event.preventDefault();

    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.investUnitNameError.current,
      40,
      "textSpecial"
    );

    const descriptionHasError = Validator.validateSimpleText(
      this.state.description,
      this.investUnitDescriptionError.current,
      120,
      "textSpecial"
    );

    if (!nameHasError && !descriptionHasError) {
      const investigation_unit = {
        name: this.state.name,
        description: this.state.description,
      };
      const res = await post_request(`investigation_unit`, investigation_unit);
      if (res.status) {
        this.props.getInvestUnit();
        $("#modalInvestUnit").modal("hide");
        swal(
          "¡Listo!",
          "Se creó la unidad de investigación exitosamente.",
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
          className="btn btn-success btn-md"
          data-target="#modalInvestUnit"
          onClick={this.show}
        >
          <i className="fas fa-plus"></i>
        </button>

        <div className="modal fade" id="modalInvestUnit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Crear nueva unidad de investigación
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="campusCode">
                    Nombre de la unidad investigación
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.investUnitNameError}
                  >
                    hola
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="nombreCampus">Descripción</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: 12 }}
                    ref={this.investUnitDescriptionError}
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
