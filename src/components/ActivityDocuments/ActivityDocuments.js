import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Input from "../Input/Input";
import { activity_documents } from "../../helpers/Enums";
import ListOfAssistance from "./ListOfAssistance/ListOfAssistance";
import Photo from "./Photo/Photo";

export default class ActivityDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.match.params,
      document_type: "nada",
      documents_options: activity_documents,
      activity: {},
    };

    //bind
    this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
  }

  componentDidMount() {
    this.getActivity();
  }

  /**
   * Cargamos la informacion del proyecto del cual vamos a mostrar
   * documentos
   */
  getActivity() {
    axios.get(`${API}/activity/${this.state.id_activity}`).then((res) => {
      const activity = res.data;
      this.setState({
        activity,
      });
    });
  }

  /**
   * Se hace render del componente para cada tipo de archivo
   */
  renderDocumentType() {
    switch (this.state.document_type) {
      case "list_of_assistance":
        return <ListOfAssistance id_activity={this.state.id_activity} />;
      case "photos":
        return <Photo id_activity={this.state.id_activity} />;
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
              Documentos de la activad: {this.state.activity.name}
            </header>
            <div className="w-75 mx-auto">
              <div className="w-100 mt-3">
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
            <hr className="w-75 mx-auto" />
            {this.renderDocumentType()}
          </div>
        </div>
      </>
    );
  }
}
