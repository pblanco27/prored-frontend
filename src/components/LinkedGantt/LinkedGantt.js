import React, { Component } from "react";
import swal from "sweetalert";
import SelectStudent from "../Selects/ProjectPerson";
import Period from "../Selects/Period";
import "./LinkedGantt.css";
import GanttManager from "../GanttManager/GanttManager";
import { handleSimpleInputChange } from "../../helpers/Handles";

const listaEjemplo = [
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
      project: null,
      student: null,
      period: null,
    };
    // bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event, name) {
    this.handleChange({
      target: {
        name: name,
        value: event ? event.value : null,
      },
    });
  }

  showManager() {
    return this.state.project && this.state.student && this.state.period;
  }

  print = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="linkedGantt">
        <div className="my-container">
          <header>
            <h4>Agregar Gantt</h4>
          </header>
          <center>
            A continuación puede seleccionar donde agregar el gantt
          </center>
          <div className="linkedGantt__content">
            <div className="linkedGantt__content-select">
              <SelectStudent
                label="Proyecto"
                name="project"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.project}
              />
            </div>
            <div className="linkedGantt__content-select">
              <SelectStudent
                label="Estudiante"
                name="student"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.student}
              />
            </div>
            <div className="linkedGantt__content-select">
              <Period
                label="Período"
                name="period"
                handleChangeParent={this.handleSelectChange}
                selected={this.state.period}
              />
            </div>
          </div>
          <center>
            <div>
              <button className={`btn btn-md btn-primary`} onClick={this.print}>
                Print state
              </button>
            </div>
          </center>
        </div>
        {this.showManager() && <GanttManager task_list={listaEjemplo} />}
      </div>
    );
  }
}
