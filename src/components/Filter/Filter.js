import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Input from "../Input/Input";
import SelectCampus from "../Selects/Campus";
import SelectCareer from "../Selects/Career";
import SelectStudent from "../Selects/Student";
import SelectBudgetUnit from "../Selects/BudgetUnit";
import SelectBudgetSubUnit from "../Selects/BudgetSubUnit";
import SelectProject from "../Selects/Project";
import SelectActivity from "../Selects/Activity";
import FilterResults from "./FilterResults";
import { filter_options, person_type } from "../../helpers/Enums";
import {
  isEmpty,
  loadEnums,
  loadInvestigationUnits,
  loadActivityTypes,
  clearFilters,
  clearResults,
  getFilteredProjects,
  getFilteredDependentActivities,
  getFilteredIndependentActivities,
  getFilteredStudents,
  getFilteredResearchers,
} from "./functions";

/**
 * * Componente para la búsqueda de información con filtros
 */
export default class Filter extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      // Banderas para la lógica de los filtros
      filter: "Proyecto",
      show: {
        projectFilters: true,
        activityFilters: false,
        personFilters: false,
        budgetFilters: false,
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
        campus_key: 1,
        career_key: 2,
      },
      budget: {
        dni: "",
        budget_unit: "",
        budget_subunit: "",
        budget_type: "",
        id_project: "",
        id_activity: "",
        start_date: "",
        end_date: "",
        end_date_key: 3
      },
      // Listas de opciones para los filtros
      data_list: {
        inv_units: [],
        project_types: [],
        activity_types: [],
        activity_dependences: [],
        budget_types: [],
        statuses: [],
      },
      // Lista de resultados
      results: {
        project_list: [],
        activity_list: [],
        student_list: [],
        researcher_list: [],
        budget_list: [],
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
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleBudgetUnitChange = this.handleBudgetUnitChange.bind(this);
    this.handleBudgetSubUnitChange = this.handleBudgetSubUnitChange.bind(this);
    this.handleBudgetTypeChange = this.handleBudgetTypeChange.bind(this);
    this.handleBudgetProjectChange = this.handleBudgetProjectChange.bind(this);
    this.handleBudgetActivityChange = this.handleBudgetActivityChange.bind(
      this
    );
    this.handleStartDateChange = this.handleStartDateChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadEnums = loadEnums.bind(this);
    this.loadInvestigationUnits = loadInvestigationUnits.bind(this);
    this.loadActivityTypes = loadActivityTypes.bind(this);
    this.getFilteredProjects = getFilteredProjects.bind(this);
    this.getFilteredStudents = getFilteredStudents.bind(this);
    this.getFilteredResearchers = getFilteredResearchers.bind(this);
    this.getFilteredDependentActivities = getFilteredDependentActivities.bind(
      this
    );
    this.getFilteredIndependentActivities = getFilteredIndependentActivities.bind(
      this
    );
    this.clearFilters = clearFilters.bind(this);
    this.clearResults = clearResults.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadEnums();
    this.loadInvestigationUnits();
    this.loadActivityTypes();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async handleFilterChange(event) {
    this.clearFilters();
    const show = {
      projectFilters: false,
      activityFilters: false,
      personFilters: false,
      budgetFilters: false,
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
      case "Partida":
        show.budgetFilters = true;
        break;
      default:
        break;
    }
    this.setState({ show });
  }

  /**
   * * Maneja los filtros de proyecto
   */
  handleProjectChange(event) {
    const { name, value } = event.target;
    this.setState({
      project: {
        ...this.state.project,
        [name]: value,
      },
    });
  }

  /**
   * * Maneja los filtros de actividad
   */
  handleActivityChange(event) {
    const { name, value } = event.target;
    this.setState({
      activity: {
        ...this.state.activity,
        [name]: value,
      },
    });
  }

  /**
   * * Manejan los filtros de persona
   */
  handlePersonChange(event) {
    this.setState({
      show: {
        ...this.state.show,
        filterResults: false,
      },
    });
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

  /**
   * * Maneja los filtros de partida
   */
  handleBudgetChange(event) {
    const { name, value } = event.target;
    this.setState({
      budget: {
        ...this.state.budget,
        [name]: value,
      },
    });
  }

  handleStudentChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        dni: event ? event.value : "",
      },
    });
  }

  handleBudgetUnitChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        budget_unit: event ? event.value : "",
      },
    });
  }

  handleBudgetSubUnitChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        budget_subunit: event ? event.value : "",
      },
    });
  }

  handleBudgetTypeChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        budget_type: event ? event.value : "",
        id_project: null,
        id_activity: null
      },
    });
  }

  handleBudgetProjectChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        id_project: event ? event.value : "",
      },
    });
  }

  handleBudgetActivityChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        id_activity: event ? event.value : "",
      },
    });
  }  

  handleStartDateChange(event) {
    this.setState({
      budget: {
        ...this.state.budget,
        end_date: "",
        end_date_key: this.state.budget.end_date_key + 1,
      },
    });
    this.handleBudgetChange({
      target: {
        name: "start_date",
        value: event.target ? event.target.value : "",
      },
    });
  }

  /**
   * * Función que se encarga de llamar la función correspondiente
   * * para obtener los datos necesarios luego de aplicar los filtros
   */
  async handleSubmit() {
    this.clearResults();
    switch (this.state.filter) {
      case "Proyecto":
        await this.getFilteredProjects();
        break;
      case "Actividad":
        if (this.state.activity.dependence === "") {
          await this.getFilteredDependentActivities();
          await this.getFilteredIndependentActivities();
        } else if (this.state.activity.dependence === "Dependiente") {
          await this.getFilteredDependentActivities();
        } else {
          await this.getFilteredIndependentActivities();
        }
        break;
      case "Persona":
        this.state.person.type === "Estudiante"
          ? await this.getFilteredStudents()
          : await this.getFilteredResearchers();
        break;
      case "Partida":
        console.log(this.state.budget);
        console.log("mandar a filtrar");
        break;
      default:
        break;
    }
    this.showResults();
  }

  clearAll() {
    this.clearFilters();
    this.clearResults();
  }

  showResults() {
    if (
      !isEmpty(this.state.results.project_list) ||
      !isEmpty(this.state.results.activity_list) ||
      !isEmpty(this.state.results.student_list) ||
      !isEmpty(this.state.results.researcher_list) ||
      !isEmpty(this.state.results.budget_list)
    ) {
      this.setState({
        show: {
          ...this.state.show,
          filterResults: true,
        },
      });
    }
  }

  renderProjectFilters() {
    return (
      this.state.show.projectFilters && (
        <div className="container">
          <b>Filtrado por categorías</b>
          <Input
            label="Tipo de proyecto"
            type="select"
            name="type"
            value={this.state.project.type}
            onChange={this.handleProjectChange}
            options={this.state.data_list.project_types}
          />
          <Input
            label="Unidad de investigación"
            type="select"
            name="inv_unit"
            value={this.state.project.inv_unit}
            onChange={this.handleProjectChange}
            options={this.state.data_list.inv_units}
          />
        </div>
      )
    );
  }

  renderActivityFilters() {
    return (
      this.state.show.activityFilters && (
        <div className="container">
          <b>Filtrado por categorías</b>
          <Input
            label="Tipo de actividad"
            type="select"
            name="type"
            value={this.state.activity.type}
            onChange={this.handleActivityChange}
            options={this.state.data_list.activity_types}
          />
          <Input
            label="Dependencia"
            type="select"
            name="dependence"
            value={this.state.activity.dependence}
            onChange={this.handleActivityChange}
            options={this.state.data_list.activity_dependences}
          />
        </div>
      )
    );
  }

  renderPersonFilters() {
    return (
      this.state.show.personFilters && (
        <div className="container">
          <b>Filtrado por categorías</b>
          <Input
            label="Tipo de vinculado"
            type="select"
            name="type"
            value={this.state.person.type}
            onChange={this.handlePersonChange}
            options={person_type}
          />
          <Input
            label="Estado"
            type="select"
            name="status"
            value={this.state.person.status}
            onChange={this.handlePersonChange}
            options={this.state.data_list.statuses}
          />
          {this.state.person.type === "Investigador" && (
            <Input
              label="Unidad de investigación"
              type="select"
              name="inv_unit"
              value={this.state.person.inv_unit}
              onChange={this.handlePersonChange}
              options={this.state.data_list.inv_units}
            />
          )}
          {this.state.person.type === "Estudiante" && (
            <>
              <b>Filtrado por información académica</b>
              <SelectCampus
                key={this.state.person.campus_key}
                label="Campus universitario"
                name="campus"
                noCreate={true}
                noEdit={true}
                value={this.state.person.campus}
                handleChangeParent={this.handleCampusChange}
              />
              <SelectCareer
                key={this.state.person.career_key}
                label="Carrera"
                name="career"
                noCreate={true}
                noEdit={true}
                value={this.state.person.career}
                handleChangeParent={this.handleCareerChange}
              />
            </>
          )}
        </div>
      )
    );
  }

  renderBudgetFilters() {
    return (
      this.state.show.budgetFilters && (
        <div className="container">
          <b>Filtrado por categorías</b>
          <SelectStudent
            label="Estudiante"
            required={true}
            handleChangeParent={this.handleStudentChange}
            disable={this.props.disable}
            value={this.props.dni}
          />
          <SelectBudgetUnit
            label="Partida"
            required={true}
            noEdit={true}
            noCreate={true}
            handleChangeParent={this.handleBudgetUnitChange}
            disable={this.props.disable}
            value={this.props.budget_unit}
          />
          <SelectBudgetSubUnit
            label="Sub partida"
            required={true}
            noEdit={true}
            noCreate={true}
            handleChangeParent={this.handleBudgetSubUnitChange}
            disable={this.props.disable}
            value={this.props.budget_unit}
          />
          <Input
            label="Asociado a"
            type="select"
            name="budget_type"
            value={this.state.budget.budget_type}
            onChange={this.handleBudgetTypeChange}
            options={this.state.data_list.budget_types}
            disable={this.props.disable}
          />
          {this.props.budget_type === "Proyecto" && (
            <SelectProject
              label="Proyecto"
              handleChangeProject={this.handleBudgetProjectChange}
              value={this.state.budget.id_project}
            />
          )}
          {this.props.budget_type === "Actividad" && (
            <SelectActivity
              label="Actividad"
              handleChangeActivity={this.handleBudgetActivityChange}
              value={this.state.budget.id_activity}
            />
          )}
          <Input
            label="Fecha inicio"
            type="date"
            name="start_date"
            min="1980-01-01"
            value={this.state.budget.start_date}
            onChange={this.handleStartDateChange}
          />
          <Input
            label="Fecha final"
            type="date"
            name="end_date"
            key={this.state.budget.end_date_key}
            min={
              this.state.budget.start_date !== ""
                ? this.getNextDate()
                : "1980-01-01"
            }
            value={this.state.budget.end_date}
            onChange={this.handleBudgetChange}
            disable={this.state.budget.start_date === ""}
          />
        </div>
      )
    );
  }

  getNextDate() {
    const date = new Date(this.state.budget.start_date);
    date.setDate(date.getDate() + 1);
    const new_date = date.toISOString().slice(0, 10);
    return new_date;
  }

  renderBtns() {
    return (
      <div className="filter-btns">
        <center className="btn-container">
          <button
            className="btn btn-md btn-success"
            onClick={this.handleSubmit}
          >
            Buscar
          </button>
          <button className="btn btn-md btn-info" onClick={this.clearAll}>
            Limpiar
          </button>
        </center>
      </div>
    );
  }

  render() {
    return (
      <div className="container my-4">
        <div className="card mb-4">
          <header className="card-header text-center container-title">
            <h4>Búsqueda con filtros</h4>
          </header>
          <center>
            A continuación puede buscar información con los filtros disponibles
          </center>
          <div className="d-flex w-75 mx-auto my-3">
            <div className="w-100">
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
          {this.renderProjectFilters()}
          {this.renderActivityFilters()}
          {this.renderPersonFilters()}
          {this.renderBudgetFilters()}
          {this.renderBtns()}
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
