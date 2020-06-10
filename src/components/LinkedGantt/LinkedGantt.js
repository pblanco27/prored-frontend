import React, { Component } from "react";
import Project from "../Selects/Project";
import ProjectStudent from "../Selects/ProjectStudent";
import Period from "../Selects/Period";
import GanttManager from "../GanttManager/GanttManager";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { API } from "../../services/env";
import axios from "axios";
import "./LinkedGantt.css";

/**
 * * Componente para la vinculación de diagramas gantt
 */
export default class LinkedGantt extends Component {
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
    console.log(this.state);
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

  async loadGantt() {
    await this.setState({
      task_list: null,
      showManager: false,
    });
    if (this.isFull()) {
      const id_gantt = await this.checkGanttExist();
      if (id_gantt) {
        const res = await axios.get(`${API}/gantt_task/${id_gantt}`);
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
        console.log(task_list);
      }
      await this.setState({ showManager: true });
    }
  }

  async checkGanttExist() {
    const gantt = {
      rel_code: this.state.student_code,
      id_period: this.state.id_period,
    };
    const res = await axios.post(`${API}/gantt_exist`, gantt);
    return res.data.ganttexists;
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
      <div className="linkedGantt">
        <div className="my-container">
          <header>
            <h4>Buscar Gantt</h4>
          </header>
          <center>A continuación puede buscar los gantt asociados</center>
          <div className="linkedGantt__content">
            <div className="linkedGantt__content-select">
              <Project
                label="Proyecto"
                name="id_project"
                handleChangeProject={this.handleChangeProject}
                selected={this.state.id_project}
              />
            </div>
            <div className="linkedGantt__content-select">
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
            <div className="linkedGantt__content-select">
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
