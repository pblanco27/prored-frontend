import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personSelected: null,
      config: {
        name: "selectPerson",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getPeople = this.getPeople.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  async getPeople() {
    this.loading();
    const res = await axios.get(`${API}/student_all`);
    const personData = res.data;
    const personList = personData.map((person) => ({
      label: person.name + " " + person.lastname1 + " " + person.lastname2,
      value: person.dni
    }));
    this.setState({ personList, personSelected: null });
    this.loading(false);
  }

  handleChange(value) {
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
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.personList}
              value={this.state.personSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
          </div>
        </div>
      </div>
    );
  }
}
