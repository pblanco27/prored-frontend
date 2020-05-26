import React, { Component } from "react";
import Curriculum from "../File/Curriculum";
import SelectCampus from "../Selects/Campus";
import SelectCareer from "../Selects/Career";
import SelectNetwork from "../Selects/Network";
import SelectLanguage from "../Selects/Language";
import SelectCentersAndAssoCareer from "../Selects/CentersAndAssoCareer";

export default class AcademicInformation extends Component {
  constructor() {
    super();

    //bind
    this.handleFile = this.handleFile.bind(this);
    this.handleCampus = this.handleCampus.bind(this);
    this.handleCareers = this.handleCareers.bind(this);
    this.handleNetworks = this.handleNetworks.bind(this);
    this.handleLanguages = this.handleLanguages.bind(this);
    this.handleAssoCareers = this.handleAssoCareers.bind(this);
    this.cvKey = new Date();
  }

  handleFile(event) {
    const file = event.target.files;
    this.cvKey = file ? file[0].name : +new Date();
    this.props.handleChange({
      target: {
        name: "cv",
        value: file ? file[0] : null,
      },
    });
  }

  handleCampus(value) {
    this.props.handleChange({
      target: {
        name: "campus_code",
        value: value ? value.value : "",
      },
    });
  }

  handleCareers(value) {
    let values = null;
    if (value) {
      values = value.map((v) => {
        return v.value;
      });
    }
    this.props.handleChange({
      target: {
        name: "careers",
        value: values ? values : [],
      },
    });
  }

  handleNetworks(value) {
    let values = null;
    if (value) {
      values = value.map((v) => {
        return v.value;
      });
    }
    this.props.handleChange({
      target: {
        name: "networks",
        value: values ? values : [],
      },
    });
  }

  handleLanguages(value) {
    let values = null;
    if (value) {
      values = value.map((v) => {
        return v.value;
      });
    }
    this.props.handleChange({
      target: {
        name: "languages",
        value: values ? values : [],
      },
    });
  }

  handleAssoCareers(value) {
    let values = null;
    if (value) {
      values = value.map((v) => {
        return v.value;
      });
    }
    this.props.handleChange({
      target: {
        name: "associated_careers",
        value: values ? values : [],
      },
    });
  }

  render() {
    let extra_info =
      this.props.profile === "Invitado" || this.props.profile === "Básico"
        ? false
        : true;
    return (
      <div className="my-container">
        <header>
          <h4>Información Académica</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <div className="academic-info">
          <div className="select-section">
            <b>Información académica (UNED)</b>
            <SelectCampus
              handleChangeParent={this.handleCampus}
              noEdit={true}
              label="Centro Universitario"
              required={true}
              value={this.props.campus_selected}
              disable={this.props.disable}
            />
            <SelectCareer
              label="Seleccione la (s) carrera (s) que cursa"
              handleChangeParent={this.handleCareers}
              noEdit={true}
              isMulti={true}
              required={true}
              value={this.props.careers_selected}
              disable={this.props.disable}
            />

            <b>Currículum</b>
            <br />
            <Curriculum
              key={this.cvKey}
              cv={this.props.cv}
              dni={this.props.dni}
              original_cv={this.props.original_cv}
              handleFile={this.handleFile}
              disable={this.props.disable}
            />
          </div>
          {extra_info && (
            <div className="select-section">
              <b>Información académica adicional</b>
              <SelectCentersAndAssoCareer
                label="Seleccione el (los) curso (s) que lleva"
                handleChangeParent={this.handleAssoCareers}
                value={this.props.associatedCareers_selected}
                disable={this.props.disable}
              />

              <b>Información de redes asociadas</b>
              <SelectNetwork
                label="Seleccione la (s) red (es) asociada (s)"
                handleChangeParent={this.handleNetworks}
                noEdit={true}
                isMulti={true}
                value={this.props.networks_selected}
                disable={this.props.disable}
              />

              <b>Idiomas</b>
              <SelectLanguage
                label="Seleccione el (los) idioma (s) que habla"
                handleChangeParent={this.handleLanguages}
                required={true}
                value={this.props.languages_selected}
                disable={this.props.disable}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
