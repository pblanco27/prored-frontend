import React, { Component } from "react";
import SelectCenter from "../Selects/Center";
import SelectAssoCareer from "../Selects/AssoCareer";

/*
    Componente que muestra la ventana y elementos correspondientes
    para la creación de nuevos centros educativos y carreras 
*/

export default class AditionalInfo extends Component {
  constructor(props) {
    super(props);

    //bind
    this.handleChangeCenter = this.handleChangeCenter.bind(this);

    //ref
    this.selectAssoCareer = React.createRef();
  }

  async handleChangeCenter(value) {
    if (value) {
      await this.selectAssoCareer.current.saveIdCenter(value.value);
    } else {
      await this.selectAssoCareer.current.saveIdCenter(0);
    }
    this.selectAssoCareer.current.getAssoCareers();
  }
  render() {
    return (
      <div className="modal-container">
        <button
          type="button"
          className="btn btn-success btn-md"
          data-target="#modalInfoAdicional"
          data-toggle="modal"
          disabled={
            this.props.parent === "ver" || this.props.parent === "registro"
              ? this.props.disabled
              : ""
          }
        >
          <i className="fas fa-plus"></i>
        </button>
        <div className="modal fade" id="modalInfoAdicional" role="dialog">
          <div className="modal-dialog modal-md modal-dialog-centered">
            {" "}
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Crear nueva carrera</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <b className="d-block">Nota:</b>
                  Antes de crear una nueva carrera, verifique a continuación que
                  esta no existe
                </p>
                <SelectCenter
                  handleChangeParent={this.handleChangeCenter}
                  label="Centros educativos"
                  noEdit={true}
                />
                <SelectAssoCareer
                  updateParent={this.props.handleChange}
                  ref={this.selectAssoCareer}
                  label="Carreras asiciadas al centro"
                  noEdit={true}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
