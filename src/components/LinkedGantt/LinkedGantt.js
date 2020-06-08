import React, { Component } from "react";
import swal from "sweetalert";
import SelectStudent from "../Selects/ProjectPerson";
import ProjectStudent from "../Selects/ProjectStudent";
import Period from "../Selects/Period";
import GanttManager from "../GanttManager/GanttManager";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { API } from "../../services/env";
import axios from "axios";
import "./LinkedGantt.css";

const ganttExample = [
  [1, "Spridddng 2014", "spring", "2014-02-22", "2014-03-10"],
  [2, "Summer 2014", "summer", "2014-02-22", "2014-03-10"],
  [3, "Autumn 2014", "autumn", "2014-02-22", "2014-03-10"],
  [4, "Winter 2014", "winter", "2014-02-22", "2014-03-10"],
  [5, "Spring 2015", "spring", "2014-02-22", "2014-03-10"],
];

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class LinkedGantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager_key: 15,
      task_list: null,
      id_project: 1,
      id_period: null,
      student: null,
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkGanttExist = this.checkGanttExist.bind(this);
  }

  async handleSelectChange(event, name) {
    await this.handleChange({
      target: {
        name: name,
        value: event ? event.value : null,
      },
    });
    this.loadGantt();
  }

  async loadGantt() {
    if (this.showManager()) {
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
        await this.setState({ task_list, manager_key: this.state.manager_key + 1});
        console.log(this.state)
      } 
    }
  }

  async checkGanttExist() {
    const gantt = {
      dni: this.state.student.dni,
      id_project: this.state.id_project,
      id_period: this.state.id_period,
    };
    const res = await axios.post(`${API}/gantt_exist`, gantt);
    return res.data.ganttexists;
  }

  showManager() {
    return this.state.id_project && this.state.id_period && this.state.student;
  }

  render() {
    return (
      <div className="linkedGantt">
        <div className="my-container">
          <header>
            <h4>{this.props.title}</h4>
          </header>
          <center>{this.props.message}</center>
          <div className="linkedGantt__content">
            <div className="linkedGantt__content-select">
              <SelectStudent
                label="Proyecto"
                name="id_project"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.id_project}
              />
            </div>
            <div className="linkedGantt__content-select">
              <ProjectStudent
                label="Estudiante"
                name="student"
                id_project={this.state.id_project}
                handleChangeParent={this.handleSelectChange}
                selected={this.state.student ? this.state.student.code : null}
              />
            </div>
            <div className="linkedGantt__content-select">
              <Period
                label="Período"
                name="id_period"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.id_period}
              />
            </div>
          </div>
        </div>
        {this.showManager() && (
          <GanttManager
            key={this.state.manager_key}
            {...this.state}
            checkGanttExist={this.checkGanttExist}
          />
        )}
      </div>
    );
  }
}
