import React, { Component } from "react";
import Input from "../Input/Input";

export default class Curriculum extends Component {
  constructor(props) {
    super(props);

    //bind
    this.renderBtn = this.renderBtn.bind(this);
  }

  renderBtn() {
    if (this.props.download){
      return (
        <>
          <button className="btn btn-success">
            <i className="fas fa-file-download" />
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-trash" />
          </button>
        </>
      );
    } else {
      return (
        <button className="btn btn-danger">
          <i className="fas fa-trash" />
        </button>
      );
    }
  }

  render() {
    return (
      <Input
        fileOptions={this.renderBtn}
        label={
          <button className="btn btn-info">
            <i className="fas fa-file-upload" />
          </button>
        }
        type="file"
        name="cv"
        onChange={this.props.handleFile}
        loadedFile={
          this.props.cv
            ? ` Archivo cargado: ${this.props.cv.name}`
            : " No hay un archivo cargado"
        }
      />
    );
  }
}
