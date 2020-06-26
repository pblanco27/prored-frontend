import React, { Component } from "react";
import { API, axiosHeader } from "../../services/env";
import axios from "axios";
import SelectPerson from "../Selects/Person";

/**
 * * Componente para el manejo de la lista de vinculados
 * * a una determinada actividad
 */
export default class LinkedToActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedList: [],
      personList: [],
      personSelected: null,
      addPerson: false,
    };
    // bind
    this.personChange = this.personChange.bind(this);
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
   * * Esta es llamada cuando se está en la pantalla de crear actividad
   */
  async getPeopleToCreate() {
    const res = await axios.get(`${API}/person/basic`, axiosHeader());
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: `${person.name} ${person.lastname1} ${person.lastname2} (${person.person_type})`,
      fullName: `${person.name} ${person.lastname1} ${person.lastname2}`,
      value: person.dni,
    }));
    return personList;
  }

  /**
   * * Obtiene las personas de la base datos y las carga en la lista
   * * Esta es llamada cuando se está en la pantalla de editar actividad
   */
  async getPeopleToEdit() {
    const res = await axios.get(
      `${API}/activity/persons/not/${this.props.id_activity}`,
      axiosHeader()
    );
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: `${person.name} ${person.lastname1} ${person.lastname2} (${person.person_type})`,
      fullName: `${person.name} ${person.lastname1} ${person.lastname2}`,
      value: person.dni,
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

    this.setState({
      personList,
      personSelected: null,
    });
    this.personSelect.current.loading(false);
  }

  personChange(person) {
    this.setState({
      personSelected: person,
    });
  }

  handleAddLinked(event) {
    if (this.state.personSelected) {
      const linked = {
        ...this.state.personSelected,
      };
      const linked_list = [...this.props.linked_list, linked];

      this.setState((state) => {
        const personList = state.personList.filter(
          (person) => person.value !== linked.value
        );
        return {
          personSelected: null,
          personList,
        };
      });
      this.props.handleLinkedList(linked_list);
    }
  }

  render() {
    const linkedList = this.props.linked_list.map((linked, i) => {
      return (
        <li key={i}>
          <span>{`${linked.fullName}`}</span>
        </li>
      );
    });
    return (
      <>
        <div className="form-group">
          <SelectPerson
            label=""
            ref={this.personSelect}
            options={this.state.personList}
            value={this.state.personSelected}
            handleChangeParent={this.personChange}
            disable={this.props.disable}
          />
          {this.state.personSelected && (
            <button
              className="btn btn-primary ml-3"
              onClick={this.handleAddLinked}
            >
              Vincular
            </button>
          )}
        </div>
        <b>Lista de vinculados:</b>
        <ul>{linkedList}</ul>
      </>
    );
  }
}
