import React, { Component } from "react";
import SelectResearcher from "../Selects/Researcher";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../services/env";

export default class SearchResearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personSelected: null,
      person_select_key: 1,
      show: false,
    };
    //bind
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.loadPerson = this.loadPerson.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.dni) {
      this.loadPerson(this.props.match.params.dni);
    }
  }

  async loadPerson(dni) {
    const res = await axios.get(`${API}/researcher_all/${dni}`);
    let researcher = res.data;
    if (!this.props.match.params.dni) {
      researcher = null;
    }
    if (researcher) {
      this.setState({
        personSelected: {
          label: `${researcher.name} ${researcher.lastname1} ${researcher.lastname2}`,
          value: researcher.dni,
        },
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-investigador/`);
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
          await this.props.history.push(`/buscar-investigador/${value.value}`);
          this.setState({ show: true });
        }
      );
    } else {
      await this.props.history.push(`/buscar-investigador/`);
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
            <h4>Buscar Investigador</h4>
          </header>
          <center>
            A continuación puede buscar una persona por nombre o número de
            cédula
          </center>
          <div className="searchByName__content">
            <div className="searchByName__content-select">
              <SelectResearcher
                label="Buscar Investigador"
                key={this.state.person_select_key}
                handleChangeParent={this.handlePersonChange}
                selected={this.state.personSelected}
              />
            </div>

            {this.state.show && (
              <div className="searchByName__content-btns">
                <Link
                  className="btn btn-info"
                  to={`/ver-investigador/${this.props.match.params.dni}`}
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
