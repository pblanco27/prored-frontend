import React, { Component } from "react";
import SelectResearcher from "../Selects/Researcher";
import Researcher from "../Researcher/Researcher";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { API } from "../../services/env";
import swal from "sweetalert";

export default class SearchResearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personSelected: null,
      show: false,
      btnEditColor: "btn-info",
    };
    //bind
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.loadPerson = this.loadPerson.bind(this);
    this.reloadBtnEdit = this.reloadBtnEdit.bind(this);

    //ref
    this.researcher = React.createRef();
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

  reloadBtnEdit() {
    this.setState({
      btnEditColor: "btn-info",
    });
  }

  async loadPerson(dni) {
    this.reloadBtnEdit();
    const res = await axios.get(`${API}/researcher/${dni}`);
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
      this.setState({
        personSelected: null,
        show: false,
      });
    }
  }

  handleClickEdit(event) {
    if (this.state.show) {
      this.researcher.current.toggleEdit();
      if (this.researcher.current.state.disable) {
        this.setState({
          btnEditColor: "btn-danger",
        });
      } else {
        swal({
          title: "¡Atención!",
          text: "Una vez ejecutado se eliminarán los cambios hechos",
          icon: "info",
          buttons: ["Cancelar", "Aceptar"],
        }).then((willConfirm) => {
          if (willConfirm) {
            this.setState({
              btnEditColor: "btn-info",
            });

            window.location.reload();
          } else {
            this.researcher.current.toggleEdit();
            swal("Los cambios siguen intactos, continue la edición", {
              title: "¡Atención!",
              icon: "info",
            });
          }
        });
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
          this.loadPerson(value.value);
        }
      );
    } else {
      await this.props.history.push(`/buscar-investigador/`);

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
              <h4>Buscar Estudiante</h4>
            </header>
            <center>
              A continuación puede buscar una persona por nombre o número de
              cédula
            </center>
            <div className="searchByName__content">
              <div className="searchByName__content-select">
                <SelectResearcher
                  label="Buscar Investigador"
                  handleChangeParent={this.handlePersonChange}
                  selected={this.state.personSelected}
                />
              </div>

              {this.state.show && (
                <div className="searchByName__content-btns">
                  <button
                    className={`btn ${this.state.btnEditColor}`}
                    onClick={this.handleClickEdit}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Switch>
          <Route
            path="/buscar-investigador/:dni"
            render={(routeProps) => {
              return this.state.show ? (
                <Researcher {...routeProps} ref={this.researcher} />
              ) : // <LinkedStudent {...routeProps} ref={this.linkedStudent} />
              null;
            }}
          />
        </Switch>
      </>
    );
  }
}
