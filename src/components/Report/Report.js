import React, { Component } from "react";
import Input from "../Input/Input";
import { handleSimpleInputChange } from "../../helpers/Handles";
import { report_type } from "../../helpers/Enums";
import { post_request } from "../../helpers/Request";
import { CSVLink } from "react-csv";
import swal from "sweetalert";
import $ from "jquery";

function verifyString(string) {
  return string !== "" ? string : null;
}

function isEmpty(list) {
  return JSON.stringify(list) === JSON.stringify([]);
}

/**
 * * Componente que muestra la ventana y elementos correspondientes
 * * para la creación de los reportes del sistema
 */
export default class Report extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      type: "Estudiante",
      start_date: "",
      end_date: "",
      end_date_key: 1,
      report_csv: "",
    };

    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.generateReport = this.generateReport.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async handleStartDateChange(event) {
    await this.handleChange({
      target: {
        name: "start_date",
        value: event.target ? event.target.value : "",
      },
    });
    this.setState({
      end_date: "",
      end_date_key: this.state.end_date_key + 1,
    });
  }

  getNextDate() {
    const date = new Date(this.state.start_date);
    date.setDate(date.getDate() + 1);
    const new_date = date.toISOString().slice(0, 10);
    return new_date;
  }

  async generateReport() {
    const filters = {
      startDate: verifyString(this.state.start_date),
      endDate: verifyString(this.state.end_date),
    };
    if (this.state.type === "Estudiante") {
      await this.generateStudentReport(filters);
    } else {
      //generateProjectReport(filters);
    }
  }

  async generateStudentReport(filters) {
    const res = await post_request(`report/students`, filters);
    if (res.status) {
      const report_data = res.data;
      let report_csv = report_data.map((row) => {
        return {
          Subpartida: row.subunitname,
          "Nombre completo": row.personname,          
          "Monto total": row.sum,
        };
      });
      if (!isEmpty(report_csv)) {
        this.setState({ report_csv });
        $("#download")[0].click();
      } else {
        swal(
          "¡Atención!",
          "No existen datos para el reporte solicitado.",
          "info"
        );
      }
    }
  }

  render() {
    return (
      <>
        <div className="container my-4">
          <div className="card mx-auto w-100 login">
            <header className="card-header text-center container-title">
              <h4>Crear reporte</h4>
            </header>
            <center>A continuación puede filtrar el reporte por fecha</center>
            <div className="d-lg-flex card-body px-4 d-md-block">
              <div className="w-100">
                <Input
                  label="Tipo de reporte"
                  type="select"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  options={report_type}
                />
                <Input
                  label="Fecha inicio"
                  type="date"
                  name="start_date"
                  min="1980-01-01"
                  value={this.state.start_date}
                  onChange={this.handleStartDateChange}
                />
                <Input
                  label="Fecha final"
                  type="date"
                  name="end_date"
                  key={this.state.end_date_key}
                  min={
                    this.state.start_date !== ""
                      ? this.getNextDate()
                      : "1980-01-01"
                  }
                  value={this.state.end_date}
                  onChange={this.handleChange}
                  disable={this.state.start_date === ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1 mb-3">
          <button
            type="submit"
            className="btn btn-lg btn-success"
            onClick={this.generateReport}
          >
            Crear
          </button>

          <CSVLink
            id="download"
            data={this.state.report_csv}
            className="d-none"
            filename="Reporte_Estudiantes.csv"
          >
            Descargar CSV
          </CSVLink>
        </div>
      </>
    );
  }
}
