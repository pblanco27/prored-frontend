import React, { Component } from "react";
import axios from "axios";
import { API } from "../../services/env";
import swal from "sweetalert";
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
      btnEditColor: "btn-info",
      btnStatusColor: "btn-danger",
      btnStatusText: "Desactivar Estudiante",
    };
    //bind
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
    this.loadPerson = this.loadPerson.bind(this);
    this.reloadBtnEdit = this.reloadBtnEdit.bind(this);

    //ref
    this.linkedStudent = React.createRef();
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
      
      if (data.student.status) {
        this.setState({
          btnStatusColor: "btn-danger",
          btnStatusText: "Desactivar Estudiante",
        });
      } else {
        this.setState({
          btnStatusColor: "btn-success",
          btnStatusText: "Activar Estudiante",
        });
      }
    } else {
      await this.props.history.push(`/buscar-vinculado/`);
      this.setState({
        personSelected: null,
        show: false,
        btnStatusColor: "btn-danger",
        btnStatusText: "Desactivar Estudiante",
      });
    }
  }

  handleClickEdit(event) {
    if (this.state.show) {
      this.linkedStudent.current.toggleEdit();
      if (this.linkedStudent.current.state.disable) {
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
            this.props.history.push(
              `/buscar-vinculado/${this.props.match.params.dni}`
            );
          } else {
            this.linkedStudent.current.toggleEdit();
            swal("Los cambios siguen intactos, continue la edición", {
              title: "¡Atención!",
              icon: "info",
            });
          }
        });
      }
    }
  }

  handleToggleStatus(event) {
    if (this.state.show) {
      let confirmMsg =
        "Una vez ejecutado activará al vinculado en todo el sistema";
      if (this.linkedStudent.current.state.status) {
        confirmMsg =
          "Una vez ejecutado desactivará al vinculado en todo el sistema";
      }

      swal({
        title: "¡Atención!",
        text: confirmMsg,
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((willConfirm) => {
        if (willConfirm) {
          if (this.linkedStudent.current.state.status) {
            this.setState({
              btnStatusColor: "btn-success",
              btnStatusText: "Activar Estudiante",
            });
          } else {
            this.setState({
              btnStatusColor: "btn-danger",
              btnStatusText: "Desactivar Estudiante",
            });
          }
          this.linkedStudent.current.toggleDisable();
        } else {
          swal("El estado del vinculado se mantendrá igual", {
            title: "¡Atención!",
            icon: "info",
          });
        }
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
              A continuación puede buscar una persona por nombre o número de
              cédula
            </center>
            <div className="searchByName__content">
              <div className="searchByName__content-select">
                <SelectPerson
                  label="Buscar Vinculado"
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

                  <button
                    className={`btn ${this.state.btnStatusColor}`}
                    onClick={this.handleToggleStatus}
                  >
                    {this.state.btnStatusText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Switch>
          <Route
            path="/buscar-vinculado/:dni"
            render={(routeProps) => {
              return this.state.show ? (
                <LinkedStudent {...routeProps} ref={this.linkedStudent} />
              ) : null;
            }}
          />
        </Switch>
      </>
    );
  }
}
