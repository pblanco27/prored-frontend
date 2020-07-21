import React, { Component } from "react";
import Input from "../Input/Input";

/**
 * * Componente para manejar la subida de archivos
 */
export default class File extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    // bind
    this.handleFile = this.handleFile.bind(this);
    this.fileKey = new Date();
  }  

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleFile(event) {
    const file = event.target.files;
    this.fileKey = file ? file[0].name : +new Date();
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

  renderButton() {
    const labelDisable = this.props.disable ? "disabled" : "";
    const uploadBtn = (
      <i className={`btn btn-info ${labelDisable}`}>
        <i className="fas fa-file-upload" />
      </i>
    );

    return uploadBtn;
  }

  render() {
    return (
      <div className="cv">
        <div className="cv_label px-3">{this.renderLabel()}</div>
        <Input
          label={this.renderButton()}
          type="file"
          name={this.props.name}
          onChange={this.handleFile}
          idError={this.props.idError ? this.props.idError : ""}
          disable={this.props.disable}
          key={this.fileKey}
          image={this.props.image}
        />
        {this.renderDeleteBtn() && (
          <button className="btn btn-danger" onClick={this.handleFile}>
            <i className="fas fa-trash" />
          </button>
        )}
      </div>
    );
  }
}
