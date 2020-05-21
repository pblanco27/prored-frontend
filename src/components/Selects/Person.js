import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { disable } from "./disable";
export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personSelected: null,
      config: {
        name: "selectPerson",
        isLoading: true,
        isDisabled: true,
        placeholder: "Vinculados",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getPeople = this.getPeople.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = disable.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  async getPeople() {
    const res = await axios.get(`${API}/student_all`);
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: person.name + " " + person.lastname1 + " " + person.lastname2,
      value: person.dni,
      //state: person.status,
    }));

    this.setState({ personList, personSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar el campus seleccionado
   */
  handleChange(value) {
    //console.log(value)
    this.setState({
      personSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }
  render() {
    return (
      <div className={`item ${this.props.required ? "required" : ""}`}>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.personList}
              value={this.props.selected}
              onChange={this.handleChange}
              config={this.state.config}
            />
          </div>
        </div>
      </div>
    );
  }
}
