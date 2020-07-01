import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { put_request } from "../../helpers/Request";
import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import $ from "jquery";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la edición de una determinada unidad de investigación
 */
export default class EditInvestUnit extends Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };

    // bind
    this.validateShow = this.validateShow.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // ref
    this.investUnitNameError = React.createRef();
    this.investUnitDescriptionError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  validateShow() {
    if (this.props.id_inv_unit !== "") {
      this.setState({
        name: this.props.name,
        description: this.props.description,
      });
      this.investUnitNameError.current.style.display = "none";
      this.investUnitDescriptionError.current.style.display = "none";
      $("#modalInvestEdit").modal("toggle");
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar una unidad de investigación de la lista.",
        "warning"
      );
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const nameHasError = Validator.validateSimpleText(
      this.state.name,
      this.investUnitNameError.current,
      100,
      "textSpecial"
    );

    const descriptionHasError = Validator.validateSimpleText(
      this.state.description,
      this.investUnitDescriptionError.current,
      180,
      "textSpecial"
    );

    if (!nameHasError && !descriptionHasError) {
      const investigation_unit = {
        name: this.state.name,
        description: this.state.description,
      };
      const res = await put_request(
        `investigation_unit/${this.props.id_inv_unit}`,
        investigation_unit
      );
      if (res.status) {
        this.props.getInvestUnit();
        $("#modalInvestEdit").modal("hide");
        swal(
          "¡Listo!",
          "Se editó la unidad de investigación exitosamente.",
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
          className="btn btn-info btn-md"
          data-target="#modalInvestEdit"
          onClick={this.validateShow}
        >
          <i className="fas fa-edit"></i>
        </button>
        <div className="modal fade" id="modalInvestEdit" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Editar unidad de investigación</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">
                    Nombre de la unidad de investigación
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
                  ></div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descripción</label>
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
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
