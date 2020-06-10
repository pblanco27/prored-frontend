import React, { Component } from "react";
import swal from "sweetalert";
import "./SearchProject.css";
import { Switch, Route } from "react-router-dom";
import Project from "../Project/Project";
import SelectProject from "../Selects/Project";
import { API } from "../../services/env";
import axios from "axios";

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class SearchProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_select_key: 1,
      show: false,
      btnEditColor: "btn-info",
      btnStatusColor: "btn-danger",
    };
    //bind
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.loadProject = this.loadProject.bind(this);
    this.reloadBtnEdit = this.reloadBtnEdit.bind(this);

    //ref
    this.project = React.createRef();
    this.projectSelect = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.id_project) {
      this.loadProject(this.props.match.params.id_project);
    }
  }

  reloadBtnEdit() {
    this.setState({
      btnEditColor: "btn-info",
    });
  }

  async loadProject(id_project) {
    this.reloadBtnEdit();
    const res = await axios.get(`${API}/project/${id_project}`);
    const project = res.data;
    if (project) {
      this.projectSelect.current.setProject({
        label: project.name,
        value: project.id_project,
      });
      this.setState({
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-proyecto/`);
    }
  }

  async handleProjectChange(project) {
    this.setState({
      show: false,
    });
    if (project) {
      await this.props.history.push(`/buscar-proyecto/${project.value}`);
      this.setState({
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-proyecto/`);
    }
  }

  handleClickEdit(event) {
    if (this.state.show) {
      if (this.project.current) {
        this.project.current.toggleEdit();
        if (this.project.current.state.disable) {
          this.setState({
            btnEditColor: "btn-danger",
          });
        } else {
          swal({
            title: "¡Atención!",
            text: "Una vez ejecutado se eliminarán los cambios hechos",
            icon: "info",
            buttons: ["Cancelar", "Aceptar"],
          }).then((willConfirm) => {
            if (willConfirm) {              
              window.location.reload();
            } else {
              this.project.current.toggleEdit();
              swal("Los cambios siguen intactos, continue la edición", {
                title: "¡Atención!",
                icon: "info",
              });
            }
          });
        }
      } else {
        this.setState({
          project_select_key: this.state.project_select_key + 1,
          show: false,
          btnEditColor: "btn-info",
          btnStatusColor: "btn-danger",
        });
      }
    }
  }

  render() {
    return (
      <>
        <div className="searchProject">
          <div className="my-container">
            <header>
              <h4>Buscar proyecto</h4>
            </header>
            <center>
              A continuación puede buscar un proyecto por su nombre
            </center>
            <div className="searchProject__content">
              <div className="searchProject__content-select">
                <SelectProject
                  handleChangeProject={this.handleProjectChange}
                  ref={this.projectSelect}
                  key={this.state.project_select_key}
                />
              </div>

              {this.state.show && (
                <div className="searchProject__content-btns">
                  <button
                    className={`btn ${this.state.btnEditColor}`}
                    onClick={this.handleClickEdit}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Switch>
          <Route
            path="/buscar-proyecto/:id_project"
            render={(routeProps) => {
              return this.state.show ? (
                <Project {...routeProps} ref={this.project} />
              ) : null;
            }}
          />
        </Switch>
      </>
    );
  }
}
