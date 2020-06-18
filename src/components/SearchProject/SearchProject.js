import React, { Component } from "react";
import "./SearchProject.css";
import { Link } from "react-router-dom";

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
    };
    //bind
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.loadProject = this.loadProject.bind(this);

    //ref

    this.projectSelect = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.id_project) {
      this.loadProject(this.props.match.params.id_project);
    }
  }

  async loadProject(id_project) {
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
                  <Link
                    className="btn btn-info"
                    to={`/ver-proyecto/${this.props.match.params.id_project}`}
                  >
                    <i className="fas fa-search"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
