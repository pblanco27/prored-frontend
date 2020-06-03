import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import Document from "../Document/Document";
import "./Project.css";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: this.props.match.params.id_project ? true : false,
      document_type: "Artículo",
      id_project: "",
      name: "",
      project_code: "",
      project_type: "student",
      investigation_unit: "",
      researcher: "",
      coresearchers: [],
      assistants: [],
      project_form: null
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEdit() {
    this.setState({ disable: !this.state.disable });
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <GeneralInformation
          handleChange={this.handleChange}
          {...this.state}
          disable={this.state.disable}
        />
        {this.props.match.params.id_project && (
          <Document
            handleChange={this.handleChange}
            {...this.state}
            disable={this.state.disable}
          />
        )}
        <div className="project__submit">
          {!this.state.disable && (
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              {this.props.match.params.id_project ? "Guardar Cambios" : "Crear"}
            </button>
          )}
        </div>
      </>
    );
  }
}
