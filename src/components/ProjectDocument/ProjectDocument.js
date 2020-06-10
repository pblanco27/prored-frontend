import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../../services/env";
import axios from "axios";
import ProjectForm from "./ProjectForm/ProjectForm";
import Article from "./Article/Article";
import Paper from "./Paper/Paper";
import Endorsement from "./Endorsement/Endorsement";
import Input from "../Input/Input";
import {
  students_project_documents,
  normal_project_documents,
} from "../../helpers/Enums";

export default class ProjectDocument extends Component {
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
    this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
  }

  componentDidMount() {
    this.getProject();
  }

  /**
   * Cargamos la informacion del proyecto del cual vamos a mostrar
   * documentos
   */
  getProject() {
    axios.get(`${API}/project/${this.state.id_project}`).then((res) => {
      const project = res.data;
      this.setState({
        project,
      });
    });
  }

  /**
   * Se hace render del componente para cada tipo de archivo
   */
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

  handleDocumentTypeChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <>
        <div className="container mt-3">
          <Link to={`/buscar-proyecto/${this.state.id_project}`}>
            {"< "}Volver al Proyecto
          </Link>
        </div>
        <div className="my-container">
          <header>Documentos del Proyecto: {this.state.project.name}</header>
          <div className="one-column">
            <div className="column">
              <Input
                label="Tipo de documento"
                type="select"
                name="document_type"
                value={this.state.document_type}
                onChange={this.handleDocumentTypeChange}
                options={this.state.documents_options}
              />
            </div>
          </div>
          <hr />
          {this.renderDocumentType()}
        </div>
      </>
    );
  }
}
