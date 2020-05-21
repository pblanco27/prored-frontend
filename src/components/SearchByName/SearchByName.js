import React, { Component } from "react";
import axios from "axios";
import { API } from "../../services/env";
//import swal from "sweetalert";
import SelectPerson from "../Selects/Person";
import "./SearchByName.css";
import { Switch, Route } from "react-router-dom";
import LinkedStudent from "../LinkedStudent/LinkedStudent";

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class SearchByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personSelected: null,
      show: false,
    };
    //bind
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.loadPerson = this.loadPerson.bind(this);
  }

  componentDidMount() {
    this.checkDni();

    //? listen route changes.
    this.unlisten = this.props.history.listen(() => {
      this.checkDni();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  checkDni() {
    if (this.props.match.params.dni) {
      this.loadPerson(this.props.match.params.dni);
    } else {
      this.setState({ personSelected: null });
    }
  }

  async loadPerson(dni) {
    const res = await axios.get(`${API}/student_all/${dni}`);
    const data = res.data;

    if (data.student) {
      this.setState({
        personSelected: {
          label: `${data.student.name} ${data.student.lastname1} ${data.student.lastname2}`,
          value: data.student.dni,
        },
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-vinculado/`);
      this.setState({
        personSelected: null,
        show: false,
      });
    }
  }

  async handlePersonChange(value) {
    this.setState({
      show: false,
    });
    if (value) {
      this.setState(
        {
          personSelected: value,
        },
        async () => {
          await this.props.history.push(`/buscar-vinculado/${value.value}`);
          this.loadPerson(value.value);
        }
      );
    } else {
      await this.props.history.push(`/buscar-vinculado/`);
      this.setState({
        personSelected: null,
        show: false,
      });
    }
  }

  render() {
    return (
      <>
        <div className="searchByName">
          <div className="my-container">
            <header>
              <h4>Buscar vinculado</h4>
            </header>
            <center>
              A continuación puede buscar una persona por su nombre
            </center>
            <div className="searchByName__content">
              <div className="searchByName__content-select">
                <SelectPerson
                  label="Buscar Vinculado"
                  handleChangeParent={this.handlePersonChange}
                  selected={this.state.personSelected}
                />
              </div>

              <div className="searchByName__content-btns">
                <button className="btn btn-success">
                  <i className="fas fa-edit"></i>
                </button>

                <button className="btn btn-danger">Desactivar</button>
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route
            path="/buscar-vinculado/:dni"
            render={(routeProps) => {
              return this.state.show ? <LinkedStudent {...routeProps} /> : null;
            }}
          />
        </Switch>
      </>
    );
  }
}
