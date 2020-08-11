import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { get_request } from "../../helpers/Request";
import { API } from "../../services/env";
import SelectPerson from "../Selects/Person";
import File from "../File/File";
import FormDocuments from "../EvaluationForm/FormDocuments";
import LoadingBar from "../Modal/LoadingBar";
import swal from "sweetalert";
import $ from "jquery";
import axios from "axios";

/**
 * * Componente que contiene y muestra la información de los
 * * formularios de evaluación de los vinculados en el sistema
 */
export default class ProjectDocument extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personSelected: null,
      documents_key: 1,
      file: null,
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
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.personChange = this.personChange.bind(this);
    this.getPeople = this.getPeople.bind(this);
    this.createForm = this.createForm.bind(this);

    // ref
    this.personSelect = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    this.getPeople();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Obtiene las personas de la base datos y las carga en la lista
   */
  async getPeopleAux() {
    const res = await get_request(`person/basic`);
    if (res.status) {
      const personData = res.data;
      const personList = personData.map((person) => ({
        label: `${person.name} ${person.lastname1} ${person.lastname2} (${person.person_type})`,
        fullName: `${person.name} ${person.lastname1} ${person.lastname2}`,
        value: person.dni,
      }));
      return personList;
    }
  }

  async getPeople() {
    if (this._isMounted) {
      this.personSelect.current.loading();
    }
    const personList = await this.getPeopleAux();
    if (this._isMounted) {
      this.setState({
        personList,
        personSelected: null,
      });
      this.personSelect.current.loading(false);
    }
  }

  personChange(person) {
    this.setState({
      documents_key: this.state.documents_key + 1,
      personSelected: person,
    });
  }

  async createForm() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado guardará la información del formulario de forma permanente",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        if (this.state.file) {
          const data = new FormData();
          data.append("tabla", "EvaluationForm");
          data.append("dni", this.state.personSelected.value);
          data.append("file", this.state.file);
          this.setState({ uploading: true });

          const res = await axios.post(
            `${API}/evaluation_form`,
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
                  "Se creó el formulario exitosamente.",
                  "success"
                ).then(() => {
                  this.setState({
                    file: null,
                    documents_key: this.state.documents_key + 1,
                  });
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
    if (this.state.file) {
      await this.createForm();
    } else {
      swal(
        "¡Atención!",
        "Debe seleccionar un archivo para crear un formulario.",
        "warning"
      );
    }
  }

  renderFormDocuments() {
    if (this.state.personSelected) {
      return (
        <>
          <div className="w-75 mx-auto">
            <div className="w-100 mt-3">
              <hr className="w-100 mx-auto" />
              <b>Formularios asociados</b>
              <FormDocuments
                key={this.state.documents_key}
                dni={this.state.personSelected.value}
              />
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="card mb-4">
            <header className="card-header text-center container-title">
              <h4>Formularios de evaluación</h4>
            </header>
            <center>
              A continuación puede buscar y subir formularios a una determinada
              persona
            </center>
            <div className="w-75 mx-auto my-3">
              <div className="w-100 mt-3">
                <SelectPerson
                  ref={this.personSelect}
                  options={this.state.personList}
                  value={this.state.personSelected}
                  handleChangeParent={this.personChange}
                  disable={this.props.disable}
                />
                {this.state.personSelected && (
                  <div className="mt-4">
                    <b>Crear formulario</b>
                    <File
                      file={this.state.file}
                      name="file"
                      handleChange={this.handleChange}
                    />
                    <button
                      className="btn btn-success ml-3"
                      onClick={this.handleSubmit}
                    >
                      Crear
                    </button>
                  </div>
                )}
              </div>
            </div>
            {this.renderFormDocuments()}
          </div>
        </div>
        {this.state.uploading && (
          <LoadingBar uploadPercentage={this.state.uploadPercentage} />
        )}
      </>
    );
  }
}
