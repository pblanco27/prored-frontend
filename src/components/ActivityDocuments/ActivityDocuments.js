import React, { Component } from "react";
import Input from "../Input/Input";
import { activity_documents } from "../../helpers/Enums";
import { handleSimpleInputChange } from "../../helpers/Handles";
import ListOfAssistance from "./ListOfAssistance/ListOfAssistance";
import Photo from "./Photo/Photo";
import { get_request } from "../../helpers/Request";

/**
 * * Componente que contiene y muestra la información de los 
 * * documentos de una actividad, tanto para creación como visualización 
 */
export default class ActivityDocument extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      ...props.match.params,
      document_type: "nada",
      documents_options: activity_documents,
      activity: {},
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
  }

  componentDidMount(){
    this._isMounted = true;

    this.getActivity();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  /**
   * * Función encargada de obtener la informacion de la 
   * * actividad de la cual vamos a mostrar documentos 
   */
  async getActivity() {
    const res = await get_request(`activity/${this.state.id_activity}`);
    if (res.status && this._isMounted){
      const activity = res.data;
      this.setState({
        activity,
      });
    }
  }

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
