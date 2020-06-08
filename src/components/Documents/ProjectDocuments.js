import React, { Component } from "react";
import {
  students_project_documents,
  normal_project_documents,
} from "../../helpers/Enums";
import Input from "../Input/Input";
import ProjectForm from "./ProjectForm";
import Paper from "./Paper";
import { API } from "../../services/env";
import axios from "axios";
import { Link } from "react-router-dom";
import Article from "./Article";

export default class ProjectDocuments extends Component {
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

  getProject() {
    axios.get(`${API}/project/${this.state.id_project}`).then((res) => {
      const project = res.data;
      this.setState({
        project,
      });
    });
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
        return <h1>Aval</h1>;
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
        <Link to={`/buscar-proyecto/${this.state.id_project}`}>
          {"< "}Volver al Proyecto
        </Link>
        <div className="my-container">
          <header>Documentos del Proyecto: {this.state.project.name}</header>
          <Input
            label="Tipo de documento"
            type="select"
            name="document_type"
            value={this.state.document_type}
            onChange={this.handleDocumentTypeChange}
            options={this.state.documents_options}
          />
        </div>
        {this.renderDocumentType()}
      </>
    );
  }
}
