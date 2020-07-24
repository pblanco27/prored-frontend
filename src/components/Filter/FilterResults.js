import React, { Component } from "react";
import {
  getFormattedProjects,
  getFormattedActivities,
  getFormattedStudents,
  getFormattedResearchers,
  getFormattedBudgets,
} from "./functions";
import CsvDownload from "react-json-to-csv";

/**
 * * Componente para mostrar los resultados de
 * * la búsqueda de información con filtros
 */
export default class FilterResults extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      // Banderas para la lógica de las tablas
      show: {
        projectTable: false,
        activityTable: false,
        studentTable: false,
        researcherTable: false,
        budgetTable: false,
      },
      results: {
        project_list: [],
        activity_list: [],
        student_list: [],
        researcher_list: [],
        budget_list: [],
      },
    };
    //bind
    this.getFormattedProjects = getFormattedProjects.bind(this);
    this.getFormattedActivities = getFormattedActivities.bind(this);
    this.getFormattedStudents = getFormattedStudents.bind(this);
    this.getFormattedResearchers = getFormattedResearchers.bind(this);
    this.getFormattedBudgets = getFormattedBudgets.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

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
      case "Partida":
        this.getFormattedBudgets();
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderProjectTable() {
    return (
      this.state.show.projectTable && (
        <>
          <CsvDownload
            data={this.state.results.project_csv}
            className="btn btn-info mb-3"
            filename="Proyectos.csv"
          >
            Descargar CSV
          </CsvDownload>
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
        </>
      )
    );
  }

  renderActivityTable() {
    console.log(this.state);
    return (
      this.state.show.activityTable && (
        <>
          <CsvDownload
            data={this.state.results.activity_csv}
            className="btn btn-info mb-3"
            filename="Actividades.csv"
          >
            Descargar CSV
          </CsvDownload>

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
        </>
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

  renderBudgetTable() {
    return (
      this.state.show.budgetTable && (
        <>
          <CsvDownload
            data={this.state.results.budget_csv}
            className="btn btn-info mb-3"
            filename="Partidas.csv"
          >
            Descargar CSV
          </CsvDownload>
          <table style={{ width: "90%" }}>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha (yyyy/mm/dd)</th>
                <th>Partida</th>
                <th>Sub partida</th>
                <th>Asociado a</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.state.results.budget_list}</tbody>
          </table>
        </>
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
          <div className="table my-1 w-100 overflow-auto ">
            <center>
              {this.renderProjectTable()}
              {this.renderActivityTable()}
              {this.renderStudentTable()}
              {this.renderResearcherTable()}
              {this.renderBudgetTable()}
            </center>
          </div>
        </div>
      </div>
    );
  }
}
