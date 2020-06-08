import React, { Component } from "react";
import TaskData from "../GanttManager/TaskData";
import { Chart } from "react-google-charts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { handleSimpleInputChange } from "../../helpers/Handles";
import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";
import "./GanttManager.css";

const formatGantt = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "BBBBB" },
  { type: "date", label: "CCCCC" },
  { type: "date", label: "FFFFF" },
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
      disable: false,

      dataTable: [], // lista de tareas para creacion de tabla de tareas
      refsDataTable: [], // referencias a los task data
      ganttData: [], // lista final de informacion para el Componente Chart

      btnViewText: "Visualizar",
      btnEditColor: "btn-primary",
    };

    //bind
    this.onChange = handleSimpleInputChange.bind(this);
    this.handleTaskNumberChange = this.handleTaskNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickEditGantt = this.onClickEditGantt.bind(this);
    this.onClickGenerate = this.onClickGenerate.bind(this);
  }

  async componentDidMount() {
    console.log(this)
    console.log(this.props.task_list)
    if (this.props.task_list) {
      await this.setState({
        task_number: this.props.task_list.length,
        disable: true,
      });      
    }
    this.createTable();
  }

  async handleTaskNumberChange(event) {
    const task_number = event.target.value;
    await this.setState({ task_number });
    this.createTable();
  }

  // funcion para crear la tabla de tareas a base del componente TaskData
  createTable() {
    let table = [];
    let references = [];
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

  // funcion para manejo de la edicion del gantt
  onClickEditGantt() {
    for (let i = 0; i < this.state.task_number; i++) {
      var ganttLine = this.state.refsDataTable[i].current;
      ganttLine.disable();
    }
    this.setState({
      disable: !this.state.disable,
      btnEditColor: this.state.disable ? "btn-danger" : "btn-info",
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
        btnViewText: "Refrescar",
      });
    }
  }

  handleSubmit() {
    if (this.props.task_list) {
      console.log("editar")
    } else {
      this.createGantt();
    }
  }

  // funcion para guardar el Gantt cuando se guarde la información del proyecto
  async createGantt() {
    const gantt_exists = this.props.checkGanttExist();
    if (!gantt_exists) {
      const gantt = {
        rel_code: this.props.student.rel_code,
        id_period: this.props.id_period,
      };
      const res = await axios.post(`${API}/gantt`, gantt);
      const id_gantt = res.data.id_gantt;
      const gantt_list = [];
      for (let i = 1; i < this.state.task_number; i++) {
        // se inicia en la pos 1 porque hay que brincarse el formato del chart que es el primer elemento
        const ganttLine = this.state.ganttData[i];
        const task_to_save = {
          id_gantt: id_gantt,
          task_name: ganttLine[1],
          description: ganttLine[2],
          start_date: ganttLine[3],
          end_date: ganttLine[4],
        };
        gantt_list.push(task_to_save);
      }
      await axios.post(`${API}/gantt_task/`, { gantt_list });
      swal("¡Listo!", "Se creó el nuevo gantt exitosamente.", "success");
    } else {
      swal(
        "¡Atención!",
        "Esta persona ya tiene un gantt asociado para este período.",
        "warning"
      );
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
      <>
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
                  onChange={this.handleTaskNumberChange}
                ></input>
              </div>
              <div className="ganttManager__content-btns">
                {this.props.task_list ? (
                  <center>
                    <button
                      className={`btn btn-md ${this.state.btnEditColor}`}
                      onClick={this.onClickEditGantt}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </center>
                ) : null}
              </div>
            </div>

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
                className={`btn btn-md btn-info`}
                onClick={this.onClickGenerate}
              >
                {this.state.btnViewText}
              </button>
            </center>
            <br></br>
            <br></br>

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
                      height={this.state.ganttData.length * 32 + 30}
                      chartType="Gantt"
                      chartLanguage="es"
                      loader={<center>Generando diagrama...</center>}
                      data={this.state.ganttData}
                      options={{
                        height: this.state.ganttData.length * 32 + 30,
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
                    className="btn btn-md btn-info"
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
        <div className="gantt__submit">
          {!this.state.disable && (
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              {this.props.task_list ? "Guardar Cambios" : "Crear"}
            </button>
          )}
        </div>
      </>
    );
  }
}