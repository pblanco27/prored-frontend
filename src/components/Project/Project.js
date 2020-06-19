import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import { createProjectObject, validateProject } from "./functions";
import { createProject, createProjectForm } from "./createFunctions";
import { editProject } from "./editFunctions";
import LoadingBar from "../Modal/LoadingBar";
import { API } from "../../services/env";
import swal from "sweetalert";
import axios from "axios";
import "./Project.css";

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación y edición de proyectos 
 */
export default class Project extends Component {
  _mount = true;
  constructor(props) {
    super(props);
    this.state = {
      disable: this.props.match.params.id_project ? true : false,
      edit: this.props.match.params.id_project ? true : false,
      disableAlways: this.props.match.params.id_project ? true : false,
      show: false,
      project_code: "",
      id_inv_unit: "",
      id_project: "",
      name: "",
      project_type: "Estudiantes",
      project_form: null,
      linked_list: [],
      linked_listDefault: [],
      uploadPercentage: 0,
      uploading: false,
      options: {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
      },
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLinkedList = this.setLinkedList.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.createProjectObject = createProjectObject.bind(this);
    this.createProject = createProject.bind(this);
    this.createProjectForm = createProjectForm.bind(this);
    this.editProject = editProject.bind(this);
  }

  componentDidMount() {
    this.setState({
      show: false,
    });
    if (this.props.match.params.id_project) {
      this.loadProject(this.props.match.params.id_project);
    } else {
      this.setState({
        show: true,
      });
    }
  }

  /**
   * * Función que carga un determinado proyecto de la base de
   * * datos, dado su id. Esto sucede cuando se desea visualizar
   * * un determinado proyecto en la aplicación
   */
  loadProject(id_project) {
    axios.get(`${API}/project/${id_project}`).then(async (res) => {
      if (this._mount) {
        const project = res.data;
        if (project) {
          const invesUnitSelect = {
            label: (
              <span title={project.description}>{project.inv_unit_name}</span>
            ),
            value: project.id_inv_unit,
            description: project.description,
          };
          const data = await axios.get(`${API}/project_persons/${id_project}`);
          const linked_listData = data.data;
          const linked_list = linked_listData.map((person) => ({
            fullName: `${!person.status ? "(INACTIVO)" : ""} ${person.name} ${
              person.lastname1
            } ${person.lastname2} `,
            rol: person.role,
          }));

          this.setState({
            project_code: project.code_manage,
            id_inv_unit: project.id_inv_unit,
            id_project: project.id_project,
            name: project.name,
            project_type: project.project_type,
            paramType: project.project_type === "Estudiantes" ? "est" : "nor",
            invesUnitSelect: invesUnitSelect,
            edit: true,
            show: true,
            linked_list,
            linked_listDefault: linked_list,
          });
        }
      }
    });
  }

  setLinkedList(linked_list) {
    this.setState({ linked_list });
  }

  preCreateProject() {
    const project = this.createProjectObject();
    if (validateProject(project)) {
      this.createProject(project);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  preEditProject() {
    const project = this.createProjectObject();
    if (validateProject(project)) {
      this.editProject(project);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  handleSubmit() {
    if (this.props.match.params.id_project) {
      this.preEditProject();
    } else {
      this.preCreateProject();
    }
  }

  handleDisable() {
    if (this.state.disable) {
      this.setState({ disable: false });
    } else {
      swal({
        title: "¡Atención!",
        text: "Una vez ejecutado se eliminarán los cambios hechos",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((willConfirm) => {
        if (willConfirm) {
          // this.setState({ disable: true, btnEditColor: "btn-info" });
          // this.loadActivity(this.props.match.params.id_activity);
          window.location.reload();
        } else {
          swal("Los cambios siguen intactos, continue la edición", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    }
  }

  renderBtns() {
    if (this.state.edit) {
      if (this.state.disable) {
        return (
          <button
            type="submit"
            className="btn btn-lg btn-info"
            onClick={this.handleDisable}
          >
            Editar
          </button>
        );
      } else {
        return (
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-lg btn-danger"
              onClick={this.handleDisable}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              Guardar Cambios
            </button>
          </div>
        );
      }
    } else {
      return (
        <button
          type="submit"
          className="btn btn-lg btn-success"
          onClick={this.handleSubmit}
        >
          Crear
        </button>
      );
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    if (this.state.show) {
      return (
        <>
          {this.state.edit && (
            <div className="container mt-3">
              <button
                onClick={() => {
                  this.goBack();
                }}
                className="btn btn-secondary"
              >
                <i className="fas fa-chevron-left"></i> Volver
              </button>
            </div>
          )}
          <GeneralInformation
            handleChange={this.handleChange}
            handleProjectType={this.handleProjectType}
            handleLinkedList={this.setLinkedList}
            {...this.state}
            disable={this.state.disable}
          />

          <div className="project__submit">{this.renderBtns()}</div>
          {this.state.uploading && (
            <LoadingBar uploadPercentage={this.state.uploadPercentage} />
          )}
        </>
      );
    } else {
      return null;
    }
  }
}
