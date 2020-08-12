import React, { Component } from "react";
import { API } from "../../services/env";
import swal from "sweetalert";
import SelectForm from "../Selects/EvaluationForm";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { get_request, delete_request } from "../../helpers/Request";

/**
 * * Componente que contiene y muestra la información de los formularios
 * * de evaluación de una persona, tanto para creación como visualización
 */
export default class FormDocuments extends Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);

    this.state = {
      dni: this.props.dni,
      file: null,
      show: false,
      empty: true,
    };

    //bind 
    this.updateSelectForms = this.updateSelectForms.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDeleteForm = this.handleDeleteForm.bind(this);
    this.getForm = this.getForm.bind(this);

    //ref
    this.selectForm = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateSelectForms() {
    this.selectForm.current.getForms();
    this.setState({
      show: false,
    });
  }

  async getForm(id_form) {
    const res = await get_request(`evaluation_form/${id_form}`);
    if (res.status) {
      const form = res.data;
      this.setState({
        ...form,
        id_form: id_form,
        empty: false,
        show: true,
        file: null,
      });
    }
  }

  handleFormChange(form) {
    this.setState({ show: false, empty: true });
    if (form) {
      this.getForm(form.value);
    }
  }

  handleDeleteForm() {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar el formulario del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`evaluation_form/${this.state.id_form}`);
        if (res.status){
          swal("Se eliminó el formulario exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.updateSelectForms();
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
    return (
      <>
        <div className="d-flex card-body px-4 justify-content-center align-items-center w-75 mx-auto">
          <div className="w-100 mr-2">
            <SelectForm
              label="Formularios"
              dni={this.props.dni}
              ref={this.selectForm}
              handleChangeParent={this.handleFormChange}
            />
          </div>
        </div>
        <hr />

        {this.state.show && (
          <div className="w-75 mx-auto">
            <div className="w-100">
              <div className="file-data">
                <div className="file-data">
                  <p>Nombre del archivo: {this.state.filename}</p>
                </div>
                <a
                  className="btn btn-info mr-3"
                  href={`${API}/${this.state.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver
                </a>
                <button
                  className="btn btn-danger"
                  onClick={this.handleDeleteForm}
                >
                  Eliminar
                </button>
              </div>
              <br />
              <br />
            </div>
          </div>
        )}
      </>
    );
  }
}
