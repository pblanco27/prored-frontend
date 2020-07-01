import React, { Component } from "react";
import { API } from "../../../services/env";
import swal from "sweetalert";
import SelectListAssistance from "../../Selects/ListOfAssistance";
import Input from "../../Input/Input";
import { handleSimpleInputChange } from "../../../helpers/Handles";
import CreateList from "../../Modal/CreateListAssistance";
import { get_request, delete_request } from "../../../helpers/Request";

export default class ListOfAssistance extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      id_activity: this.props.id_activity,
      show: false,
      empty: true,
    };

    //bind
    this.updateSelectList = this.updateSelectList.bind(this);
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);

    //ref
    this.selectList = React.createRef();
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  updateSelectList() {
    this.selectList.current.getListAssistances();
    this.setState({
      show: false,
    });
  }

  async getList(id_list) {
    const res = await get_request(`list/${id_list}`);
    if (res.status){
      const list = res.data;
      this.setState({
        ...list,
        empty: false,
        show: true,
      });
    } 
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
        const res = await delete_request(`list/${this.state.id_list}`);
        if (res.status){
          swal("Se eliminó la lista de asistencia exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.updateSelectList();
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
          <div className="w-75 mx-auto">
            <div className="w-100">
              <Input
                label="Fecha"
                type="date"
                name="date_passedEdit"
                value={this.state.date_passed}
                onChange={this.handleChange}
                disable={true}
              />
              <hr />
              <div>
                <p>Nombre del archivo: {this.state.filename}</p>
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
