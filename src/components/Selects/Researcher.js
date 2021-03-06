import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectResearcher extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personSelected: null,
      config: {
        name: "selectPerson",
        isLoading: true,
        placeholder: "Vinculados",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getPeople = this.getPeople.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getPeople();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getPeople() {
    this.loading();
    const res = await get_request(`researcher_basic`);
    if (res.status && this._isMounted) {
      const personData = res.data;
      const personList = personData.map((person) => ({
        label: person.name + " " + person.lastname1 + " " + person.lastname2,
        value: person.dni,
        //state: person.status,
      }));
      this.setState({ personList, personSelected: null });
      this.loading(false);
    }
  }

  /**
   * * Función para asignar el campus seleccionado
   */
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
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <div className="mb-2">
            <Select
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
