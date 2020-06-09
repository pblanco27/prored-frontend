import React, { Component } from "react";
import Input from "../Input/Input";
import { project_type } from "../../helpers/Enums";
import File from "../File/File";
import SelectInvestigationUnit from "../Selects/InvestigationUnit";
import LinkedToProject from "../LinkedToProject/LinkedToProject";
import { Link } from "react-router-dom";

export default class GeneralInformation extends Component {
  constructor(props) {
    super(props);

    // bind
    this.handleInvesUnit = this.handleInvesUnit.bind(this);

    this.handleProjectType = this.handleProjectType.bind(this);
    this.resetLinked = this.resetLinked.bind(this);

    //ref
    this.linkedToProject = React.createRef();
  }

  handleInvesUnit(value) {
    this.props.handleChange({
      target: {
        name: "id_inv_unit",
        value: value ? value.value : "",
      },
    });
  }

  resetLinked() {
    this.linkedToProject.current.getPeople();
    this.props.handleLinkedList(this.props.linked_listDefault);
  }

  handleProjectType(event) {
    this.props.handleChange(event);
    this.resetLinked();
  }

  render() {
    return (
      <div className="my-container general-info">
        <header>
          <h4>Proyecto</h4>
        </header>
        <center>
          Los campos marcados con <span>*</span> son requeridos
        </center>
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
              onChange={this.handleProjectType}
              options={project_type}
              required={true}
              disable={this.props.disableAlways}
            />

            <b>Información académica</b>
            <div className="select-section form-group">
              <SelectInvestigationUnit
                label="Unidad de investigación"
                required={true}
                noEdit={true}
                handleChangeParent={this.handleInvesUnit}
                disable={this.props.disable}
                value={this.props.invesUnitSelect}
              />
            </div>
            {!this.props.edit && (
              <>
                <b>Formulario de proyecto</b>
                <div className="select-section form-group">
                  <File
                    file={this.props.project_form}
                    name={"project_form"}
                    handleChange={this.props.handleChange}
                    disable={this.props.disable}
                  />
                </div>
              </>
            )}
          </div>
          <div className="column">
            <b>Vinculados</b>
            <LinkedToProject
              project_type={this.props.project_type}
              ref={this.linkedToProject}
              handleLinkedList={this.props.handleLinkedList}
              linked_list={this.props.linked_list}
              disable={this.props.disable}
              edit={this.props.edit}
              id_project={this.props.id_project}
            />
            {this.props.linked_list.length >
              this.props.linked_listDefault.length && (
              <div className="clear-btn">
                <button
                  className="btn  btn-danger "
                  onClick={this.resetLinked}
                  disabled={this.props.disable}
                >
                  Limpiar
                </button>
              </div>
            )}
            {this.props.edit && (
              <div>
                <hr />
                <Link
                  to={`/documentos-proyecto/${this.props.paramType}/${this.props.id_project}`}
                >
                  Ver documentos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
