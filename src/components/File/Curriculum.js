import React, { Component } from "react";
import Input from "../Input/Input";
import { API } from "../../services/env";

/**
 * * Componente para manejar la subida de archivos
 * * de tipo currículum
 */
export default class Curriculum extends Component {
  renderCvLabel() {
    if (this.props.cv === null || this.props.cv.msg === "empty") {
      return "No hay un archivo cargado";
    } else if (this.props.cv.type) {
      return this.props.cv.name;
    } else if (this.props.cv.dni) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${API}/${this.props.cv.file_path}`}
        >
          Ver curriculum
        </a>
      );
    }
  }

  renderDeleteBtn() {
    if (this.props.dni === "") {
      return this.props.cv ? true : false;
    } else {
      if (this.props.cv) {
        return this.props.cv.msg ? false : true;
      }
    }
  }

  render() {
    const labelDisable = this.props.disable ? "disabled" : "";
    return (
      <div className="cv">
        <div className="cv_label">{this.renderCvLabel()}</div>
        <Input
          label={
            <i className={"btn btn-info " + labelDisable}>
              <i className="fas fa-file-upload" />
            </i>
          }
          type="file"
          name="cv"
          onChange={this.props.handleFile}
          disable={this.props.disable}
        />
        {this.renderDeleteBtn() && (
          <button
            className="btn btn-danger"
            onClick={this.props.handleFile}
            disabled={this.props.disable}
          >
            <i className="fas fa-trash" />
          </button>
        )}
      </div>
    );
  }
}
