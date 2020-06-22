import React, { Component } from "react";
import {
  getFormattedProjects,
  getFormattedActivities,
  getFormattedStudents,
  getFormattedResearchers,
} from "./functions";

/**
 * * Componente para mostrar los resultados de
 * * la búsqueda de información con filtros
 */
export default class FilterResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Banderas para la lógica de las tablas
      show: {
        projectTable: false,
        activityTable: false,
        studentTable: false,
        researcherTable: false,
      },
      results: {
        project_list: [],
        activity_list: [],
        student_list: [],
        researcher_list: [],
      },
    };
    //bind
    this.getFormattedProjects = getFormattedProjects.bind(this);
    this.getFormattedActivities = getFormattedActivities.bind(this);
    this.getFormattedStudents = getFormattedStudents.bind(this);
    this.getFormattedResearchers = getFormattedResearchers.bind(this);
  }

  componentDidMount() {
    switch (this.props.filter) {
      case "Proyecto":
        this.getFormattedProjects();
        break;
      case "Actividad":
        this.getFormattedActivities();
        break;
      case "Persona":
        this.props.person_type === "Estudiante"
          ? this.getFormattedStudents()
          : this.getFormattedResearchers();
        break;
      default:
        break;
    }
  }

  renderProjectTable() {
    return (
      this.state.show.projectTable && (
        <table style={{ width: "90%" }}>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Unidad de investigación</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.results.project_list}</tbody>
        </table>
      )
    );
  }

  renderActivityTable() {
    return (
      this.state.show.activityTable && (
        <table style={{ width: "90%" }}>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Proyecto asociado</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.results.activity_list}</tbody>
        </table>
      )
    );
  }

  renderStudentTable() {
    return (
      this.state.show.studentTable && (
        <table style={{ width: "90%" }}>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Campus</th>
              <th>Carrera (s)</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.results.student_list}</tbody>
        </table>
      )
    );
  }

  renderResearcherTable() {
    return (
      this.state.show.researcherTable && (
        <table style={{ width: "90%" }}>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "12%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Dependencia</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.results.researcher_list}</tbody>
        </table>
      )
    );
  }

  render() {
    return (
      <div className="card">
        <header className="card-header text-center container-title">
          <h4>Resultados de la búsqueda</h4>
        </header>
        <center>A continuación se muestra la lista de resultados</center>
        <div className="card-body">
          <div className="table my-3 w-100 overflow-auto ">
            <center>
              {this.renderProjectTable()}
              {this.renderActivityTable()}
              {this.renderStudentTable()}
              {this.renderResearcherTable()}
            </center>
          </div>
        </div>
      </div>
    );
  }
}
