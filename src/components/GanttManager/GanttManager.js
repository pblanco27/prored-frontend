import React, { Component } from "react";
import TaskData from "../GanttManager/TaskData";
import { Chart } from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { handleSimpleInputChange } from "../../helpers/Handles";
import "./GanttManager.css";

const formatGantt = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

/**
 * * Componente para registrar la información
 * * de un determinado gantt de un proyecto
 */
export default class GanttManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_project: 1,
      task_number: 1,
      showGantt: false,
      create: false,
      disable: false,

      dataTable: [], // lista de tareas para creacion de tabla de tareas
      refsDataTable: [], // referencias a los task data
      ganttData: [], // lista final de informacion para el Componente Chart

      createTasksBtn: "Crear",
      createTasksBtnStyle: "btn-success",
      createGanttBtn: "Generar gantt",
      createGanttBtnStyle: "btn-success",
      editGanttBtn: "Editar gantt",
      editGanttBtnStyle: "btn-primary",
    };

    //bind
    this.onChange = handleSimpleInputChange.bind(this);
    this.onClickCreateTasks = this.onClickCreateTasks.bind(this);
    this.onClickEditGantt = this.onClickEditGantt.bind(this);
    this.onClickGenerate = this.onClickGenerate.bind(this);
  }

  async componentDidMount() {
    if (this.props.task_list) {
      await this.setState({
        task_number: this.props.task_list.length,
        disable: true,
      });
      this.onClickCreateTasks();
    }
  }

  // funcion para la creacion de tareas y renderizacion de las mismas
  onClickCreateTasks() {
    this.createTable();
    this.setState({
      create: true,
      createTasksBtn: "Modificar",
      createTasksBtnStyle: "btn-info",
    });
  }

  // funcion para manejo de la edicion del gantt
  onClickEditGantt() {
    for (let i = 0; i < this.state.task_number; i++) {
      var ganttLine = this.state.refsDataTable[i].current;
      ganttLine.disable();
    }
    this.setState({
      disable: !this.state.disable,
      editGanttBtn: this.state.disable ? "Desactivar Edición" : "Editar Gantt",
      editGanttBtnStyle: this.state.disable ? "btn-warning" : "btn-primary",
    });
  }

  // funcion para renderizar el gantt en pantalla
  async onClickGenerate() {
    await this.setState({ showGantt: false });
    let dataLines = [formatGantt];
    for (let i = 0; i < this.state.task_number; i++) {
      const task = this.state.refsDataTable[i].current;
      const ganttLine = [
        task.state.id,
        task.state.name,
        task.state.description,
        new Date(task.state.startDate),
        new Date(task.state.endDate),
        null,
        0,
        null,
      ];
      dataLines.push(ganttLine);
    }
    this.setState({ ganttData: dataLines });
    if (!this.state.showGantt) {
      this.setState({
        showGantt: true,
        createGanttBtn: "Volver a generar",
        createGanttBtnStyle: "btn-info",
      });
    }
  }

  // funcion para crear la tabla de tareas a base del componente TaskData
  async createTable() {
    let table = [];
    let references = [];
    // if (this.props.task_list) {
    //   await this.setState({ task_number: this.props.task_list.length });
    // }
    console.log(this.state.task_number);
    for (let i = 1; i <= this.state.task_number; i++) {
      const ref = React.createRef();
      const task = (
        <TaskData
          key={i}
          idTask={i}
          ref={ref}
          lineInfoGantt={
            this.props.task_list ? this.props.task_list[i - 1] : null
          }
          disable={this.state.disable}
        />
      );
      table.push(task);
      references.push(ref);
    }
    this.setState({
      dataTable: table,
      refsDataTable: references,
    });
  }

  // funcion para guardar el Gantt cuando se guarde la información del proyecto
  saveGantt() {
    const taskList = this.state.ganttData;
    for (let i = 1; i < this.state.task_number; i++) {
      // se inicia en la pos 1 porque hay que brincarse el formato del chart que es el primer elemento
      const ganttLine = taskList[i];
      const task_to_save = {
        id_task: ganttLine[0],
        nameTask: ganttLine[1],
        descripTask: ganttLine[2],
        startDate: ganttLine[3],
        endDate: ganttLine[4],
      };
      console.log(task_to_save);
      // se llama al procedimiento para guarda a la base
    }
  }

  // funcion para convertir el gantt en pdf
  printDocument() {
    window.scrollTo(0, 0);
    const input = document.getElementById("diagram");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      var pdf = new jsPDF("l");
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div className="ganttManager">
        <div className="my-container">
          <header>
            <h4>Diagrama Gantt</h4>
          </header>
          <center>A continuación puede generar un Diagrama de Gantt</center>
          <div className="ganttManager__content">
            <div className="ganttManager__content-select">
              Seleccione la cantidad de tareas
              <input
                className="form-control"
                type="number"
                id="task_number"
                name="task_number"
                min="1"
                max="100"
                value={this.state.task_number}
                disabled={this.state.disable}
                onChange={this.onChange}
              ></input>
            </div>
            <div className="ganttManager__content-btns">
              <button
                className={`btn btn-md ${this.state.createTasksBtnStyle}`}
                onClick={this.onClickCreateTasks}
              >
                {this.state.createTasksBtn}
              </button>
              {this.props.task_list ? (
                <center>
                  <button
                    className={`btn btn-md ${this.state.editGanttBtnStyle}`}
                    onClick={this.onClickEditGantt}
                  >
                    {this.state.editGanttBtn}
                  </button>
                </center>
              ) : null}
            </div>
          </div>

          {this.state.create ? (
            <>
              <br></br>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-1">
                  <b>Código</b>
                </div>
                <div className="col-md-2">
                  <b>Nombre</b>
                </div>
                <div className="col-md-3">
                  <b>Descripción</b>
                </div>
                <div className="col-md-2">
                  <b>Inicio</b>
                </div>
                <div className="col-md-2">
                  <b>Finalización</b>
                </div>
              </div>
              <br></br>
              {this.state.dataTable}
              <center>
                <button
                  className={`btn btn-md ${this.state.createGanttBtnStyle}`}
                  onClick={this.onClickGenerate}
                >
                  {this.state.createGanttBtn}
                </button>
              </center>
              <br></br>
              <br></br>
            </>
          ) : null}

          {this.state.showGantt ? (
            <>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8" id="diagram">
                  <center>
                    <h5>
                      <b>Diagrama de Gantt</b>
                    </h5>
                  </center>
                  <br></br>
                  <Chart
                    width={"100%"}
                    height={this.state.ganttData.length * 41 + 30}
                    chartType="Gantt"
                    loader={<center>Generando diagrama...</center>}
                    data={this.state.ganttData}
                    options={{
                      height: this.state.ganttData.length * 41 + 30,
                      gantt: {
                        trackHeight: 30,
                      },
                    }}
                  />
                </div>
                <div className="col-md-2"></div>
              </div>
              <center>
                <button
                  className="btn btn-md btn-success"
                  onClick={this.printDocument}
                >
                  Descargar PDF
                </button>
              </center>
              <br></br>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
