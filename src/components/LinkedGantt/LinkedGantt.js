import React, { Component } from "react";
import Project from "../Selects/Project";
import ProjectStudent from "../Selects/ProjectStudent";
import Period from "../Selects/Period";
import GanttManager from "../GanttManager/GanttManager";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { get_request, post_request } from "../../helpers/Request";

/**
 * * Componente para la vinculación de diagramas gantt
 * * a proyectos, estudiantes y períodos distintos
 */
export default class LinkedGantt extends Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      showManager: false,
      manager_key: 1,
      project_student_key: 1,
      task_list: null,
      id_project: null,
      id_period: null,
      student_code: null,
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.checkGanttExist = this.checkGanttExist.bind(this);
    this.clearPeriod = this.clearPeriod.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loadGantt = this.loadGantt.bind(this);
    // ref
    this.ProjectStudent = React.createRef();
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async handleChangeProject(event) {
    await this.handleChangeSelect(event, "id_project");
    if (this.state.id_project) {
      this.ProjectStudent.current.getStudents();
    } else {
      this.setState({
        project_student_key: this.state.project_student_key + 1,
        student_code: null,
      });
    }
  }

  async handleChangeSelect(event, name) {
    await this.handleChange({
      target: {
        name: name,
        value: event ? event.value : null,
      },
    });
    await this.loadGantt();
  }

  async clearPeriod() {
    await this.setState({
      task_list: null,
      showManager: false,
      id_period: null,
    });
  }

  /**
   * * Función que carga un gantt de la base de datos
   * * si este existe, dado su id
   */
  async loadGantt() {
    await this.setState({
      task_list: null,
      showManager: false,
    });
    if (this.isFull()) {
      const id_gantt = await this.checkGanttExist();
      if (id_gantt !== null) {
        if (id_gantt) {
          const res = await get_request(`gantt_task/${id_gantt}`);
          if (res.status) {
            const task_objects = res.data;
            let task_list = [
              task_objects.map((task) => {
                return [
                  task.id_task,
                  task.task_name,
                  task.description,
                  task.start_date,
                  task.end_date,
                ];
              }),
            ];
            await this.setState({ task_list });
          }
        }
        await this.setState({ showManager: true });
      }
    }
  }

  /**
   * * Función que verifica si un determinado gantt existe
   * * Si existe, devuelve su id
   */
  async checkGanttExist() {
    const gantt = {
      rel_code: this.state.student_code,
      id_period: this.state.id_period,
    };
    const res = await post_request(`gantt_exist/`, gantt);
    if (res.status) {
      return res.data.ganttexists;
    } else {
      return null;
    }
  }

  isFull() {
    return (
      this.state.id_project && this.state.id_period && this.state.student_code
    );
  }

  refresh() {
    this.setState({ manager_key: this.state.manager_key + 1 });
  }

  render() {
    return (
      <div className="container my-4">
        <div className="card mb-4">
          <header className="card-header text-center container-title">
            <h4>Buscar Gantt</h4>
          </header>
          <center>A continuación puede buscar los gantt asociados</center>
          <div className="d-lg-flex card-body px-4 d-md-block">
            <div className="w-100">
              <Project
                label="Proyecto"
                name="id_project"
                handleChangeProject={this.handleChangeProject}
                selected={this.state.id_project}
              />
            </div>
            <div className="w-100">
              <ProjectStudent
                key={this.state.project_student_key}
                ref={this.ProjectStudent}
                label="Estudiante"
                name="student_code"
                disable={!this.state.id_project}
                id_project={this.state.id_project}
                handleChangeParent={this.handleChangeSelect}
                selected={this.state.student_code}
              />
            </div>
            <div className="w-100">
              <Period
                label="Período"
                name="id_period"
                clearPeriod={this.clearPeriod}
                handleChangeParent={this.handleChangeSelect}
                selected={this.state.id_period}
              />
            </div>
          </div>
        </div>
        {this.state.showManager && (
          <GanttManager
            {...this.state}
            key={this.state.manager_key}
            refresh={this.refresh}
            loadGantt={this.loadGantt}
            checkGanttExist={this.checkGanttExist}
          />
        )}
      </div>
    );
  }
}
