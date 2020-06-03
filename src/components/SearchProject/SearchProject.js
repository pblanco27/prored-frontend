import React, { Component } from "react";
import swal from "sweetalert";
import SelectPerson from "../Selects/Person";
import "./SearchProject.css";
import { Switch, Route } from "react-router-dom";
import Project from "../Project/Project";

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class SearchByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectSelected: null,
      show: false,
      btnEditColor: "btn-info",
      btnStatusColor: "btn-danger",
    };
    //bind
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.loadProject = this.loadProject.bind(this);
    this.reloadBtnEdit = this.reloadBtnEdit.bind(this);

    //ref
    this.project = React.createRef();
  }

  componentDidMount() {
    this.checkProject();

    //? listen route changes.
    this.unlisten = this.props.history.listen(() => {
      this.checkProject();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  checkProject() {
    if (this.props.match.params.id_project) {
      this.loadProject(this.props.match.params.id_project);
    } else {
      this.setState({ projectSelected: null });
    }
  }

  reloadBtnEdit() {
    this.setState({
      btnEditColor: "btn-info",
    });
  }

  async loadProject(id_project) {
    this.reloadBtnEdit();
    this.setState({ show: true });
  }

  handleClickEdit(event) {
    if (this.state.show) {
      this.project.current.toggleEdit();
      if (this.project.current.state.disable) {
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
            // this.props.history.push(
            //   `/buscar-proyecto/${this.props.match.params.id_project}`
            // );
          } else {
            this.project.current.toggleEdit();
            swal("Los cambios siguen intactos, continue la edición", {
              title: "¡Atención!",
              icon: "info",
            });
          }
        });
      }
    }
  }

  async handleProjectChange(value) {
    this.setState({
      show: false,
    });
    if (value) {
      this.setState(
        {
          projectSelected: value,
        },
        async () => {
          await this.props.history.push(`/buscar-proyecto/${value.value}`);
          this.loadProject(value.value);
        }
      );
    } else {
      await this.props.history.push(`/buscar-vinculado/`);

      this.setState({
        projectSelected: null,
        show: false,
      });
    }
  }

  render() {
    return (
      <>
        <div className="searchProject">
          <div className="my-container">
            <header>
              <h4>Buscar proyecto</h4>
            </header>
            <center>
              A continuación puede buscar un proyecto por su nombre
            </center>
            <div className="searchProject__content">
              <div className="searchProject__content-select">
                <SelectPerson
                  label="Buscar proyecto"
                  handleChangeParent={this.handleProjectChange}
                  selected={this.state.projectSelected}
                />
              </div>

              {this.state.show && (
                <div className="searchProject__content-btns">
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
            path="/buscar-proyecto/:id_project"
            render={(routeProps) => {
              return this.state.show ? (
                <Project {...routeProps} ref={this.project} />
              ) : null;
            }}
          />
        </Switch>
      </>
    );
  }
}
