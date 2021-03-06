import React, { Component } from "react";
import ProjectForm from "./ProjectForm/ProjectForm";
import Article from "./Article/Article";
import Paper from "./Paper/Paper";
import Endorsement from "./Endorsement/Endorsement";
import Input from "../Input/Input";
import { handleSimpleInputChange } from "../../helpers/Handles";
import {
  students_project_documents,
  normal_project_documents,
} from "../../helpers/Enums";
import { get_request } from "../../helpers/Request";

/**
 * * Componente que contiene y muestra la información de los 
 * * documentos de un proyecto, tanto para creación como visualización 
 */
export default class ProjectDocument extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      ...props.match.params,
      documents_options:
        props.match.params.type === "nor"
          ? normal_project_documents
          : students_project_documents,
      document_type: "nada",
      project: {},
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getProject();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * * Función encargada de obtener la informacion del 
   * * proyecto de la cual vamos a mostrar documentos 
   */
  async getProject() {
    const res = await get_request(`project/${this.state.id_project}`);
    if (res.status && this._isMounted){
      const project = res.data;
      this.setState({ project });
    }
  }

  renderDocumentType() {
    switch (this.state.document_type) {
      case "project_form":
        return <ProjectForm id_project={this.state.id_project} />;
      case "articles":
        return <Article id_project={this.state.id_project} />;
      case "papers":
        return <Paper id_project={this.state.id_project} />;
      case "endorsement":
        return <Endorsement id_project={this.state.id_project} />;
      default:
        return null;
    }
  }

  goBack() {
    this.props.history.goBack();
  }
  
  render() {
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
            <header className="card-header text-center container-title">
              Documentos del Proyecto: {this.state.project.name}
            </header>
            <div className="w-75 mx-auto">
              <div className="w-100 mt-3">
                <Input
                  label="Tipo de documento"
                  type="select"
                  name="document_type"
                  value={this.state.document_type}
                  onChange={this.handleChange}
                  options={this.state.documents_options}
                />
              </div>
            </div>
            <hr className="w-75 mx-auto" />
            {this.renderDocumentType()}
          </div>
        </div>
      </>
    );
  }
}
