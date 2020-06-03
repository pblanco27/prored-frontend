import React, { Component } from "react";
import Input from "../Input/Input";
import { project_type, investigation_unit } from "../../helpers/Enums";
import SelectPerson from "../Selects/ProjectPerson";
import File from "../File/File";

export default class GeneralInformation extends Component {
  constructor(props) {
    super(props);

    // bind
    this.handleResearcher = this.handleResearcher.bind(this);
    this.handleCoresearchers = this.handleCoresearchers.bind(this);
    this.handleAssistants = this.handleAssistants.bind(this);
  }

  handleResearcher(value) {
    this.props.handleChange({
      target: {
        name: "researcher",
        value: value ? value.value : "",
      },
    });
  }

  handleCoresearchers(value) {
    if (this.props.project_type === "researcher") {
      let values = null;
      if (value) {
        values = value.map((v) => {
          return v.value;
        });
      }
      this.props.handleChange({
        target: {
          name: "coresearchers",
          value: values ? values : [],
        },
      });
    } else {
      this.props.handleChange({
        target: {
          name: "coresearchers",
          value: value ? value : [],
        },
      });
    }
  }

  handleAssistants(value) {
    let values = null;
    if (value) {
      values = value.map((v) => {
        return v.value;
      });
    }
    this.props.handleChange({
      target: {
        name: "assistants",
        value: values ? values : [],
      },
    });
  }

  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Proyecto</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <div className="two-columns">
          <div className="column">
            <b>Información general</b>
            <Input
              label="Nombre"
              type="text"
              name="name"
              onChange={this.props.handleChange}
              value={this.props.name}
              idError="projectNameError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Código del proyecto"
              type="text"
              name="project_code"
              value={this.props.project_code}
              onChange={this.props.handleChange}
              idError="projectCodeError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Tipo de proyecto"
              type="select"
              name="project_type"
              value={this.props.project_type}
              onChange={this.props.handleChange}
              options={project_type}
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Unidad de investigación"
              type="select"
              name="investigation_unit"
              value={this.props.investigation_unit}
              onChange={this.props.handleChange}
              options={investigation_unit}
              required={true}
              disable={this.props.disable}
            />
          </div>
          <div className="column">
            <b>Vinculados</b>
            <br></br>
            <SelectPerson
              label={
                this.props.project_type === "researcher"
                  ? "Investigador SOLO INVESTIGADORES"
                  : "Estudiante investigador SOLO ESTUDIANTES"
              }
              handleChangeParent={this.handleResearcher}
              selected={this.props.researcher}
              required={true}
              disable={this.props.disable}
            />
            <br></br>
            <SelectPerson
              label={
                this.props.project_type === "researcher"
                  ? "Co-investigador (es) SOLO ESTUDIANTES"
                  : "Investigador SOLO INVESTIGADORES"
              }
              handleChangeParent={this.handleCoresearchers}
              selected={this.props.coresearchers}
              required={true}
              disable={this.props.disable}
              isMulti={this.props.project_type === "researcher" ? true : false}
            />
            <br></br>
            <SelectPerson
              label={"Asistentes vinculados SOLO ESTUDIANTES"}
              handleChangeParent={this.handleAssistants}
              selected={this.props.assistants}
              required={true}
              isMulti={true}
              disable={this.props.disable}
            />
            <br></br>
            <b>Formulario de proyecto</b>
            <File
              file={this.props.project_form}
              name={"project_form"}
              handleChange={this.props.handleChange}
              disable={this.props.disable}
            />
          </div>
        </div>
      </div>
    );
  }
}
