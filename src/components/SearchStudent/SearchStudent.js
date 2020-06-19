import React, { Component } from "react";
import axios from "axios";
import { API } from "../../services/env";
import SelectStudent from "../Selects/Student";
import "./SearchStudent.css";
import { Link } from "react-router-dom";

/**
 * * Componente para la búsqueda de un determinado estudiante
 */
export default class SearchStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personSelected: null,
      person_select_key: 1,
      show: false,
      btnEditColor: "btn-info",
    };
    //bind
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.loadPerson = this.loadPerson.bind(this);

    //ref
    this.linkedStudent = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.dni) {
      this.loadPerson(this.props.match.params.dni);
    }
  }

  async loadPerson(dni) {
    const res = await axios.get(`${API}/student_all/${dni}`);
    const data = res.data;
    if (!this.props.match.params.dni) {
      data.student = null;
    }
    if (data.student) {
      this.setState({
        personSelected: {
          label: `${data.student.name} ${data.student.lastname1} ${data.student.lastname2}`,
          value: data.student.dni,
        },
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-estudiante/`);
    }
  }

  async handlePersonChange(value) {
    this.setState({
      show: false,
    });
    if (value) {
      this.props.history.push(`/buscar-estudiante/${value.value}`);
      this.setState({
        personSelected: value,
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-estudiante/`);
      this.setState({
        personSelected: null,
      });
    }
  }

  render() {
    return (
      <div className="searchByName">
        <div className="my-container">
          <header>
            <h4>Buscar Estudiante</h4>
          </header>
          <center>
            A continuación puede buscar una persona por nombre o número de
            cédula
          </center>
          <div className="searchByName__content">
            <div className="searchByName__content-select">
              <SelectStudent
                label="Buscar Estudiante"
                key={this.state.person_select_key}
                handleChangeParent={this.handlePersonChange}
                selected={this.state.personSelected}
              />
            </div>

            {this.state.show && (
              <div className="searchByName__content-btns">
                <Link
                  className="btn btn-info"
                  to={`/ver-estudiante/${this.props.match.params.dni}`}
                >
                  <i className="fas fa-search"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
