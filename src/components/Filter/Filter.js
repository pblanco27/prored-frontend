import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Input from "../Input/Input";
import SelectCampus from "../Selects/Campus";
import SelectCareer from "../Selects/Career";
import FilterResults from "./FilterResults";
import { filter_options, person_type } from "../../helpers/Enums";
import {
  loadEnums,
  loadInvestigationUnits,
  clearFilters,
  clearResults,
  getFilteredProjects,
  getFilteredStudents,
  getFilteredResearchers,  
} from "./functions";
import "./Filter.css";

/**
 * * Componente para la búsqueda de información con filtros
 */
export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Banderas para la lógica de los filtros
      filter: "Proyecto",
      show: {
        projectFilters: true,
        activityFilters: false,
        personFilters: false,
        filterResults: false,
      },
      // Filtros
      project: {
        type: "",
        inv_unit: "",
      },
      activity: {
        type: "",
        dependence: "",
      },
      person: {
        type: "Estudiante",
        status: "",
        campus: "",
        career: "",        
        inv_unit: "",
        select_key: 1,
      },
      // Listas de opciones para los filtros
      data_list: {
        inv_units: [],
        project_types: [],
        activity_types: [],
        statuses: [],
      },
      // Lista de resultados
      results: {
        project_list: [],
        activity_list: [],
        student_list: [],
        researcher_list: [],
      },
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleCareerChange = this.handleCareerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadEnums = loadEnums.bind(this);
    this.loadInvestigationUnits = loadInvestigationUnits.bind(this);
    this.getFilteredProjects = getFilteredProjects.bind(this);
    this.getFilteredStudents = getFilteredStudents.bind(this);
    this.getFilteredResearchers = getFilteredResearchers.bind(this);
    this.clearFilters = clearFilters.bind(this);
    this.clearResults = clearResults.bind(this);
  }

  componentDidMount() {
    this.loadEnums();
    this.loadInvestigationUnits();
  }

  async handleFilterChange(event) {
    this.clearFilters();
    const show = {
      projectFilters: false,
      activityFilters: false,
      personFilters: false,
      filterResults: false,
    };
    await this.handleChange(event);
    switch (this.state.filter) {
      case "Proyecto":
        show.projectFilters = true;
        break;
      case "Actividad":
        show.activityFilters = true;
        break;
      case "Persona":
        show.personFilters = true;
        break;
      default:
        break;
    }
    this.setState({ show });
  }

  handleProjectChange(event) {
    const { name, value } = event.target;
    this.setState({
      project: {
        ...this.state.project,
        [name]: value,
      },
    });
  }

  handleActivityChange(event) {
    const { name, value } = event.target;
    this.setState({
      activity: {
        ...this.state.activity,
        [name]: value,
      },
    });
  }

  handlePersonChange(event) {
    const { name, value } = event.target;
    this.setState({
      person: {
        ...this.state.person,
        [name]: value,
      },
    });
  }

  handleCampusChange(event) {
    this.setState({
      person: {
        ...this.state.person,
        campus: event ? event.value : "",
      },
    });
  }

  handleCareerChange(event) {
    this.setState({
      person: {
        ...this.state.person,
        career: event ? event.value : "",
      },
    });
  }

  handleSubmit() {
    this.clearResults();
    console.log(this.state);
    switch (this.state.filter) {
      case "Proyecto":
        this.getFilteredProjects();
        break;
      case "Actividad":
        break;
      case "Persona":
        this.state.person.type === "Estudiante"
          ? this.getFilteredStudents()
          : this.getFilteredResearchers();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="filter">
        <div className="my-container">
          <header>
            <h4>Búsqueda con filtros</h4>
          </header>
          <center>
            A continuación puede buscar información con los filtros disponibles
          </center>
          <div className="filter__content">
            <div className="filter__content-select">
              <Input
                label="¿Qué desea buscar?"
                type="select"
                name="filter"
                value={this.state.filter}
                onChange={this.handleFilterChange}
                options={filter_options}
              />
            </div>
          </div>
          <hr />
          {this.state.show.projectFilters && (
            <div className="filter__content">
              <div className="filter__content-filter">
                <b>Filtrado por categorías</b>
                <Input
                  label="Tipo de proyecto"
                  type="select"
                  name="type"
                  value={this.state.project.type}
                  onChange={this.handleProjectChange}
                  options={this.state.data_list.project_types}
                />
              </div>
              <div className="filter__content-filter">
                <br></br>
                <Input
                  label="Unidad de investigación"
                  type="select"
                  name="inv_unit"
                  value={this.state.project.inv_unit}
                  onChange={this.handleProjectChange}
                  options={this.state.data_list.inv_units}
                />
              </div>
            </div>
          )}
          {this.state.show.activityFilters && (
            <div className="filter__content">
              <div className="filter__content-filter">
                <b>Filtrado por categorías</b>
                <Input
                  label="Tipo de actividad"
                  type="select"
                  name="type"
                  value={this.state.activity.type}
                  onChange={this.handleActivityChange}
                  options={this.state.data_list.project_types}
                />
              </div>
              <div className="filter__content-filter">
                <br></br>
                <Input
                  label="Dependencia"
                  type="select"
                  name="dependence"
                  value={this.state.activity.dependence}
                  onChange={this.handleActivityChange}
                  options={this.state.data_list.activity_types}
                />
              </div>
            </div>
          )}
          {this.state.show.personFilters && (
            <>
              <div className="filter__content">
                <div className="filter__content-filter">
                  <b>Filtrado por categorías</b>
                  <Input
                    label="Tipo de vinculado"
                    type="select"
                    name="type"
                    value={this.state.person.type}
                    onChange={this.handlePersonChange}
                    options={person_type}
                  />
                </div>
                <div className="filter__content-filter">
                  <br></br>
                  <Input
                    label="Estado"
                    type="select"
                    name="status"
                    value={this.state.person.status}
                    onChange={this.handlePersonChange}
                    options={this.state.data_list.statuses}
                  />
                </div>
                {this.state.person.type === "Investigador" && (
                  <div className="filter__content-filter">
                    <br></br>
                    <Input
                      label="Unidad de investigación"
                      type="select"
                      name="inv_unit"
                      value={this.state.person.inv_unit}
                      onChange={this.handlePersonChange}
                      options={this.state.data_list.inv_units}
                    />
                  </div>
                )}
              </div>
              {this.state.person.type === "Estudiante" && (
                <div className="filter__content">
                  <div className="filter__content-filter">
                    <b>Filtrado por información académica</b>
                    <SelectCampus
                      key={this.state.person.select_key}
                      label="Campus universitario"
                      name="campus"
                      noCreate={true}
                      noEdit={true}
                      value={this.state.person.campus}
                      handleChangeParent={this.handleCampusChange}
                    />
                  </div>
                  <div className="filter__content-filter">
                    <br></br>
                    <SelectCareer
                      key={this.state.person.select_key}
                      label="Carrera"
                      name="career"
                      noCreate={true}
                      noEdit={true}
                      value={this.state.person.career}
                      handleChangeParent={this.handleCareerChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <div className="filter-btns">
            <center>
              <button
                className="btn btn-md btn-success"
                onClick={this.handleSubmit}
              >
                Buscar
              </button>
              <button
                className="btn btn-md btn-info"
                onClick={this.clearFilters}
              >
                Limpiar
              </button>
            </center>
          </div>
        </div>
        {this.state.show.filterResults && (
          <FilterResults
            history={this.props.history}
            filter={this.state.filter}
            person_type={this.state.person.type}
            {...this.state.results}
          />
        )}
      </div>
    );
  }
}
