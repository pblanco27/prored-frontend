import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import SelectStudent from "../Selects/Student";
import { Link } from "react-router-dom";

/**
 * * Componente para la búsqueda de un determinado estudiante
 */
export default class SearchStudent extends Component {
  _isMounted = false;

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
    this._isMounted = true;

    if (this.props.match.params.dni) {
      this.loadPerson(this.props.match.params.dni);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async loadPerson(dni) {
    const res = await get_request(`student_all/${dni}`);
    if (res.status) {
      const data = res.data;
      if (!this.props.match.params.dni) {
        data.student = null;
      }
      if (data.student && this._isMounted) {
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
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Buscar Estudiante</h4>
          </header>
          <center>
            A continuación puede buscar una persona por nombre o número de
            cédula
          </center>
          <div className="d-flex card-body px-4 justify-content-center align-items-center">
            <div className="w-75">
              <SelectStudent
                key={this.state.person_select_key}
                handleChangeParent={this.handlePersonChange}
                selected={this.state.personSelected}
              />
            </div>

            {this.state.show && (
              <Link
                className="btn btn-info"
                to={`/ver-estudiante/${this.props.match.params.dni}`}
              >
                <i className="fas fa-search"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
