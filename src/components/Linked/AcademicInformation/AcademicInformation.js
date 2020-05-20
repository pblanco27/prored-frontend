import React, { Component } from "react";
import SelectCampus from "../../Selects/Campus";
import SelectCareer from "../../Selects/Career";
import SelectNetwork from "../../Selects/Network";
import SelectLanguages from "../../Selects/Languages";
import SelectCentersAndAssoCareers from "../../Selects/CentersAndAssoCareers";
export default class AcademicInformation extends Component {
  constructor() {
    super();

    //bind
    this.handleCampus = this.handleCampus.bind(this);
    this.handleCareers = this.handleCareers.bind(this);
    this.handleNetworks = this.handleNetworks.bind(this);
    this.handleLanguages = this.handleLanguages.bind(this);
    this.handleAssoCareers = this.handleAssoCareers.bind(this);
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
          <div className="select-section require">
            <b>Información académica (UNED)</b>
            <SelectCampus
              handleChangeParent={this.handleCampus}
              noEdit={true}
              label="Centro Universitario"
            />
            <SelectCareer
              label="Seleccione la (s) carrera (s) que cursa"
              handleChangeParent={this.handleCareers}
              noEdit={true}
              isMulti={true}
            />
          </div>
          {extra_info && (
            <div className="select-section">
              <b>Información académica adicional</b>

              <SelectCentersAndAssoCareers
                label="Seleccione el (los) curso (s) que lleva"
                handleChangeParent={this.handleAssoCareers}
              />

              <b>Información de redes asociadas</b>
              <SelectNetwork
                label="Seleccione la (s) red (es) asociada (s)"
                handleChangeParent={this.handleNetworks}
                noEdit={true}
                isMulti={true}
              />
              <b>Idiomas</b>
              <SelectLanguages
                label="Seleccione el (los) idioma (s) que habla"
                handleChangeParent={this.handleLanguages}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
