import React, { Component } from "react";
import Input from "../Input/Input";

export default class File extends Component {
  constructor(props) {
    super(props);

    // bind
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(event) {
    const file = event.target.files;
    // this.cvKey = file ? file[0].name : +new Date();
    this.props.handleChange({
      target: {
        name: this.props.name,
        value: file ? file[0] : null,
      },
    });
  }

  renderLabel() {
    return this.props.file ? this.props.file.name : "No hay un archivo cargado";
  }

  renderDeleteBtn() {
    return this.props.file ? true : false;
  }

  renderButtons() {
    const labelDisable = this.props.disable ? "disabled" : "";
    const uploadBtn = (
      <i key={"uploadBtn"} className={"btn btn-info " + labelDisable}>
        <i className="fas fa-file-upload" />
      </i>
    );
    const deleteBtn = (
      <button key={"deleteBtn"} className="btn btn-danger">
        <i className="fas fa-trash" />
      </button>
    );
    return this.renderDeleteBtn() ? [uploadBtn, deleteBtn] : uploadBtn;
  }

  render() {
    return (
      <div className="cv">
        <div className="cv_label">{this.renderLabel()}</div>
        <Input
          label={this.renderButtons()}
          type="file"
          name={this.props.name}
          onChange={this.handleFile}
          idError={this.props.idError}
          disable={this.props.disable}
        />
      </div>
    );
  }
}
