import React, { Component } from "react";
import Input from "../Input/Input";
import SelectActivityType from "../Selects/ActivityType";
import { handleSimpleInputChange } from "../../helpers/Handles";
import SelectProject from "../Selects/Project";
import { createActivityObject, validateActivity } from "./functions";
import swal from "sweetalert";
import LinkedToActivity from "../LinkedToActivity/LinkedToActivity";
import { createActivity } from "./createFunctions";
import { API } from "../../services/env";
import axios from "axios";
import { editActivity } from "./editFunctions";

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id_acti_type: "",
      id_project: null,
      linked_list: [],
      linked_listDefault: [],
      edit: props.match.params.id_activity ? true : false,
      disable: props.match.params.id_activity ? true : false,
      id_activity: props.match.params.id_activity,
      btnEditColor: "btn-info",
    };

    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.createActivityObject = createActivityObject.bind(this);
    this.handleLinkedList = this.handleLinkedList.bind(this);
    this.resetLinked = this.resetLinked.bind(this);
    this.createActivity = createActivity.bind(this);
    this.editActivity = editActivity.bind(this);
    this.handleDisable = this.handleDisable.bind(this);

    //ref
    this.linkedToActivity = React.createRef();
    this.selectProject = React.createRef();
    this.selectActivity = React.createRef();
  }

  componentDidMount() {
    if (this.state.edit) {
      this.loadActivity(this.props.match.params.id_activity);
    }
  }

  loadActivity(id_activity) {
    axios.get(`${API}/activity/${id_activity}`).then(async (res) => {
      if (res.data.id_project) {
        const resProject = await axios.get(
          `${API}/project/${res.data.id_project}`
        );
        const project = {
          label: resProject.data.name,
          value: resProject.data.id_project,
        };
        this.selectProject.current.setProject(project);
      }
      this.selectActivity.current.setValue(res.data.id_acti_type);

      const data = await axios.get(`${API}/activity/persons/${id_activity}`);
      const linked_listData = data.data;
      const linked_list = linked_listData.map((person) => ({
        fullName: `${person.name} ${person.lastname1} ${person.lastname2} `,
      }));
      this.setState({
        ...res.data,
        linked_list,
        linked_listDefault: linked_list,
      });
    });
  }

  handleChangeType(type) {
    if (type) {
      this.setState({ id_acti_type: type.value });
    } else {
      this.setState({ id_acti_type: "" });
    }
  }

  handleChangeProject(project) {
    if (project) {
      this.setState({ id_project: project.value });
    } else {
      this.setState({ id_project: null });
    }
  }

  preCreate() {
    const activity = this.createActivityObject();

    if (validateActivity(activity)) {
      this.createActivity(activity);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  preEdit() {
    const activity = this.createActivityObject();

    if (validateActivity(activity)) {
      this.editActivity(activity);
    } else {
      swal(
        "¡Atención!",
        "Hay campos que no cumplen con el formato adecuado.",
        "warning"
      );
    }
  }

  handleSubmit() {
    if (this.state.edit) {
      this.preEdit();
    } else {
      this.preCreate();
    }
  }

  handleLinkedList(linked_list) {
    this.setState({ linked_list });
  }

  resetLinked() {
    this.linkedToActivity.current.getPeople();
    this.handleLinkedList(this.state.linked_listDefault);
  }

  handleDisable() {
    if (this.state.disable) {
      this.setState({ disable: false, btnEditColor: "btn-danger" });
    } else {
      swal({
        title: "¡Atención!",
        text: "Una vez ejecutado se eliminarán los cambios hechos",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((willConfirm) => {
        if (willConfirm) {
          // this.setState({ disable: true, btnEditColor: "btn-info" });
          // this.loadActivity(this.props.match.params.id_activity);
          window.location.reload();
        } else {
          swal("Los cambios siguen intactos, continue la edición", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    }
  }

  render() {
    return (
      <>
        <div className="my-container">
          <header>
            <h4>Actividad</h4>
          </header>
          <center>
            Los campos marcados con <span>*</span> son requeridos
          </center>
          {this.props.match.params.id_activity && (
            <div className="text-center">
              <button
                className={`btn ${this.state.btnEditColor}`}
                onClick={this.handleDisable}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          )}
          <div className="two-columns">
            <div className="column">
              <b>Información General</b>

              <Input
                label="Nombre"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                idError="activityNameError"
                required={true}
                disable={this.state.disable}
              />
              <div className="select-section form-group">
                <SelectActivityType
                  label="Tipo de actividad"
                  noEdit={true}
                  required={true}
                  disable={this.state.disable}
                  handleChangeParent={this.handleChangeType}
                  ref={this.selectActivity}
                />
              </div>

              <div className="select-section form-group">
                <SelectProject
                  ref={this.selectProject}
                  label="Proyecto"
                  handleChangeProject={this.handleChangeProject}
                  disable={this.state.disable}
                />
              </div>
            </div>

            <div className="column">
              <b>Vinculados</b>

              <LinkedToActivity
                linked_list={this.state.linked_list}
                handleLinkedList={this.handleLinkedList}
                ref={this.linkedToActivity}
                id_activity={this.state.id_activity}
                edit={this.state.edit}
                disable={this.state.disable}
              />
              {this.state.linked_list.length >
                this.state.linked_listDefault.length && (
                <div className="clear-btn">
                  <button
                    className="btn  btn-danger "
                    onClick={this.resetLinked}
                    disabled={this.props.disable}
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="project__submit">
          {!this.state.disable && (
            <button
              type="submit"
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}
            >
              {this.props.match.params.id_activity
                ? "Guardar Cambios"
                : "Crear"}
            </button>
          )}
        </div>
      </>
    );
  }
}
