import React, { Component } from "react";
import SelectEndorsement from "../Selects/Endorsement";
import CreateEndorsement from "../Modal/CreateEndorsement";
import Input from "../Input/Input";
import { endorsement_type } from "../../helpers/Enums";
import axios from "axios";
import { API } from "../../services/env";
import { handleSimpleInputChange } from "../../helpers/Handles";
import swal from "sweetalert";

export default class Endorsement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_project: parseInt(this.props.id_project),
      type: "Interno",
      endorsement_file: null,
      show: false,
      empty: true,
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

    this.selectEndorsement = React.createRef();

    this.updateSelectEndorsements = this.updateSelectEndorsements.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleEndorsementChange = this.handleEndorsementChange.bind(this);
    this.handleDeleteEndorsement = this.handleDeleteEndorsement.bind(this);
  }

  updateSelectEndorsements() {
    this.selectEndorsement.current.getEndorsements();
    this.setState({
      show: false,
    });
  }

  async getEndorsement(id_endorsement) {
    const res = await axios.get(`${API}/endorsement/${id_endorsement}`);
    const endorsement = res.data;
    this.setState({ empty: false });

    this.setState({
      ...endorsement,
      show: true,
      endorsement_file: null,
    });
  }

  handleEndorsementChange(endorsement) {
    this.setState({ show: false, empty: true });
    if (endorsement) {
      this.getEndorsement(endorsement.value);
    }
  }

  handleDeleteEndorsement() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado se va a borrar el Aval del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        await axios.delete(`${API}/endorsement/${this.state.id_endorsement}`);
        swal("Se eliminó el Aval exitosamente", {
          title: "¡Atención!",
          icon: "info",
        });
        this.updateSelectEndorsements();
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
        <div className="searchByName__content">
          <div className="searchByName__content-select">
            <SelectEndorsement
              id_project={this.props.id_project}
              ref={this.selectEndorsement}
              handleChangeParent={this.handleEndorsementChange}
            />
          </div>
          <CreateEndorsement
            id_project={this.props.id_project}
            updateSelect={this.updateSelectEndorsements}
          />
        </div>
        <hr />

        {this.state.show && (
          <div className="one-column">
            <div className="column">
              <Input
                label="Tipo de aval"
                type="select"
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
                options={endorsement_type}
                disable={true}
              />
              <hr />
              <div className="file-data">
                <div className="file-data">
                  <p>Nombre del archivo: {this.state.filename}</p>
                </div>
                <a
                  className="btn btn-info"
                  href={`${API}/${this.state.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Documento
                </a>
              </div>
              <hr />
              <div className="center-btn">
                <button
                  className="btn btn-danger"
                  onClick={this.handleDeleteEndorsement}
                >
                  Eliminar Aval
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
