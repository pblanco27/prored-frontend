import React, { Component } from "react";
import { API } from "../../../services/env";
import axios from "axios";
import swal from "sweetalert";
import SelectListAssistance from "../../Selects/ListOfAssistance";
import Input from "../../Input/Input";
import { handleSimpleInputChange } from "../../../helpers/Handles";
import CreateList from "../../Modal/CreateListAssistance";

export default class ListOfAssistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_activity: this.props.id_activity,
      show: false,
      empty: true,
    };

    this.selectList = React.createRef();

    this.updateSelectList = this.updateSelectList.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
  }

  updateSelectList() {
    this.selectList.current.getListAssistances();
    this.setState({
      show: false,
    });
  }

  async getList(id_list) {
    const res = await axios.get(`${API}/list/${id_list}`);
    const list = res.data;
    this.setState({ empty: false });

    this.setState({
      ...list,
      show: true,
    });
  }

  handleListChange(list) {
    this.setState({ show: false, empty: true });
    if (list) {
      this.getList(list.value);
    }
  }

  handleDeleteList() {
    swal({
      title: "¡Atención!",
      text:
        "Una vez ejecutado se va a borrar la lista de asistencia del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        await axios.delete(`${API}/list/${this.state.id_list}`);
        swal("Se eliminó la lista de asistencia exitosamente", {
          title: "¡Atención!",
          icon: "info",
        });
        this.updateSelectList();
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
            <SelectListAssistance
              id_activity={this.props.id_activity}
              ref={this.selectList}
              handleChangeParent={this.handleListChange}
            />
          </div>
          <CreateList
            id_activity={this.props.id_activity}
            updateSelect={this.updateSelectList}
          />
        </div>
        <hr />

        {this.state.show && (
          <div className="one-column">
            <div className="column">
              <Input
                label="Fecha"
                type="date"
                name="date_passedEdit"
                value={this.state.date_passed}
                onChange={this.handleChange}
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
                  onClick={this.handleDeleteList}
                >
                  Eliminar Lista de asistencia
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