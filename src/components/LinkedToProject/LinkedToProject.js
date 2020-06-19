import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import SelectPerson from "../Selects/Person";

/**
 * * Componente para el manejo de la lista de vinculados
 * * a un determinado proyecto
 */
export default class LinkedToProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedList: [],
      personList: [],
      personSelected: null,
      researcher: false,
      co_researcher: false,
      student: false,
    };
    // bind
    this.personChange = this.personChange.bind(this);
    this.displayButtons = this.displayButtons.bind(this);
    this.handleAddLinked = this.handleAddLinked.bind(this);
    this.getPeople = this.getPeople.bind(this);

    // ref
    this.personSelect = React.createRef();
  }

  componentDidMount() {
    this.getPeople();
  }

  /**
   * * Obtiene las personas de la base datos y las carga en la lista
   * * Esta es llamada cuando se está en la pantalla de crear proyecto
   */
  async getPeopleToCreate() {
    const res = await axios.get(`${API}/person/basic`);
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: `${person.name} ${person.lastname1} ${person.lastname2} (${person.person_type})`,
      fullName: `${person.name} ${person.lastname1} ${person.lastname2}`,
      value: person.dni,
      type: person.person_type,
      rol: "sin_relacion",
    }));
    return personList;
  }

  /**
   * * Obtiene las personas de la base datos y las carga en la lista
   * * Esta es llamada cuando se está en la pantalla de editar proyecto
   */
  async getPeopleToEdit() {
    const res = await axios.get(
      `${API}/project_persons_not_in/${this.props.id_project}`
    );
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: `${person.name} ${person.lastname1} ${person.lastname2} (${person.person_type})`,
      fullName: `${person.name} ${person.lastname1} ${person.lastname2}`,
      value: person.dni,
      type: person.person_type,
      rol: "sin_relacion",
    }));
    return personList;
  }
  
  async getPeople() {
    this.personSelect.current.loading();

    let personList = [];

    if (this.props.edit) {
      personList = await this.getPeopleToEdit();
    } else {
      personList = await this.getPeopleToCreate();
    }

    this.setState(
      {
        personList,
        personSelected: null,
      },
      () => {
        this.displayButtons();
      }
    );
    this.personSelect.current.loading(false);
  }

  personChange(person) {
    this.setState(
      {
        personSelected: person,
      },
      () => {
        this.displayButtons(this.props.project_type);
      }
    );
  }

  displayButtons(project_type) {
    this.setState({ researcher: false, co_researcher: false, student: false });
    if (this.state.personSelected) {
      if (project_type === "Normal") {
        if (this.state.personSelected.type === "Investigador") {
          this.setState({ researcher: true, co_researcher: true });
        } else {
          this.setState({ co_researcher: true, student: true });
        }
      } else {
        if (this.state.personSelected.type === "Investigador") {
          this.setState({ co_researcher: true });
        } else {
          this.setState({ researcher: true, student: true });
        }
      }
    }
  }

  handleAddLinked(event) {
    const { value } = event.target;
    if (this.state.personSelected) {
      const linked = {
        ...this.state.personSelected,
        rol: value,
      };
      const linked_list = [...this.props.linked_list, linked];

      this.setState(
        (state) => {
          const personList = state.personList.filter(
            (person) => person.value !== linked.value
          );
          return {
            personSelected: null,
            personList,
          };
        },
        () => {
          this.displayButtons();
        }
      );
      this.props.handleLinkedList(linked_list);
    }
  }

  render() {
    const linkedList = this.props.linked_list.map((linked, i) => {
      return (
        <li key={i}>
          <span>{`${linked.fullName} - ${linked.rol}`}</span>
        </li>
      );
    });
    return (
      <div>
        <div className="select-section form-group">
          <SelectPerson
            label=""
            ref={this.personSelect}
            options={this.state.personList}
            value={this.state.personSelected}
            handleChangeParent={this.personChange}
            disable={this.props.disable}
          />
          {this.state.personSelected && (
            <div>
              <b>Agregar como:</b>
            </div>
          )}
          {this.state.researcher && (
            <button
              className="btn btn-primary linked-btn"
              value="Investigador"
              onClick={this.handleAddLinked}
            >
              Investigador
            </button>
          )}
          {this.state.co_researcher && (
            <button
              className="btn btn-primary linked-btn"
              value="Co Investigador"
              onClick={this.handleAddLinked}
            >
              Co-investigador
            </button>
          )}
          {this.state.student && (
            <button
              className="btn btn-primary linked-btn"
              value="Asistente Vinculado"
              onClick={this.handleAddLinked}
            >
              Asistente
            </button>
          )}
        </div>
        <b>Lista de vinculados:</b>
        <ul>{linkedList}</ul>
      </div>
    );
  }
}
