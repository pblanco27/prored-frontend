import React, { Component } from "react";
import axios from "axios";
import { API } from "../../services/env";
import swal from "sweetalert";
import SelectStudent from "../Selects/Student";
import "./SearchStudent.css";
import { Switch, Route } from "react-router-dom";
import LinkedStudent from "../LinkedStudent/LinkedStudent";

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class SearchStudent extends Component {
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
    this.linkedStudent = React.createRef();
  }

  componentDidMount() {
    this.checkDni();

    //? listen route changes.
    // this.unlisten = this.props.history.listen(() => {
    //   this.checkDni();
    // });
  }

  componentWillUnmount() {
    // this.unlisten();
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
      if (this.state.personSelected) {
        if (this.state.personSelected.value !== data.student.dni) {
          console.log("cambio1");
          this.setState({
            personSelected: {
              label: `${data.student.name} ${data.student.lastname1} ${data.student.lastname2}`,
              value: data.student.dni,
            },
            show: true,
          });
        }
      } else {
        console.log("cambio3");
        this.setState({
          personSelected: {
            label: `${data.student.name} ${data.student.lastname1} ${data.student.lastname2}`,
            value: data.student.dni,
          },
          show: true,
        });
      }
    } else {
      await this.props.history.push(`/buscar-estudiante/`);
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
            window.location.reload();
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

  async handlePersonChange(value) {
    this.setState({
      show: false,
    });
    if (value) {
      await this.props.history.push(`/buscar-estudiante/${value.value}`);
      this.setState({
        personSelected: value,
        show: true,
      });
    } else {
      await this.props.history.push(`/buscar-estudiante/`);
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
                <SelectStudent
                  label="Buscar Estudiante"
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

        {/* <Switch>
          <Route
            path="/buscar-estudiante/:dni"
            render={(routeProps) => {
              return this.state.show ? (
                <LinkedStudent {...routeProps} ref={this.linkedStudent} />
              ) : null;
            }}
          />
        </Switch> */}
      </>
    );
  }
}
