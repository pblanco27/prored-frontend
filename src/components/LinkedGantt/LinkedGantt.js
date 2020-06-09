import React, { Component } from "react";
// import SelectStudent from "../Selects/ProjectPerson";
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
      task_list: null,
      id_project: 1,
      id_period: null,
      student_code: null,
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkGanttExist = this.checkGanttExist.bind(this);
    this.clearPeriod = this.clearPeriod.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loadGantt = this.loadGantt.bind(this);
  }

  async handleSelectChange(event, name) {
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
        console.log(task_list)
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
            {/* <div className="linkedGantt__content-select">
              <SelectStudent
                label="Proyecto"
                name="id_project"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.id_project}
              />
            </div> */}
            <div className="linkedGantt__content-select">
              <ProjectStudent
                label="Estudiante"
                name="student_code"
                id_project={this.state.id_project}
                handleChangeParent={this.handleSelectChange}
                selected={this.state.student_code}
              />
            </div>
            <div className="linkedGantt__content-select">
              <Period
                label="Período"
                name="id_period"
                clearPeriod={this.clearPeriod}
                handleChangeParent={this.handleSelectChange}
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
