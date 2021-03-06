import React, { Component } from "react";
import SelectResearcher from "../Selects/Researcher";
import { Link } from "react-router-dom";
import { get_request } from "../../helpers/Request";

/**
 * * Componente para la búsqueda de un determinado investigador
 */
export default class SearchResearcher extends Component {
  _isMounted = false;

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
    this._isMounted = true;
    
    if (this.props.match.params.dni) {
      this.loadPerson(this.props.match.params.dni);
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async loadPerson(dni) {
    const res = await get_request(`researcher_all/${dni}`);
    if (res.status) {
      let researcher = res.data;
      if (!this.props.match.params.dni) {
        researcher = null;
      }
      if (researcher && this._isMounted) {
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
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Buscar Investigador</h4>
          </header>
          <center>
            A continuación puede buscar una persona por nombre o número de
            cédula
          </center>
          <div className="d-flex card-body px-4 justify-content-center align-items-center">
            <div className="w-75">
              <SelectResearcher
                label="Buscar Investigador"
                key={this.state.person_select_key}
                handleChangeParent={this.handlePersonChange}
                selected={this.state.personSelected}
              />
            </div>

            {this.state.show && (
              <Link
                className="btn btn-info"
                to={`/ver-investigador/${this.props.match.params.dni}`}
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
