import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectStudent extends Component {
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

    //ref
    this.selectStudentError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.getPeople();
      this.selectStudentError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getPeople() {
    this.loading();
    const res = await get_request(`student_basic`);
    if (res.status && this._isMounted) {
      const personData = res.data;
      const personList = personData.map((person) => ({
        label: person.name + " " + person.lastname1 + " " + person.lastname2,
        value: person.dni,
        //state: person.status,
      }));
      this.setState({ personList, personSelected: null });
      this.setValue(this.props.value);
      this.loading(false);
    }
  }

  setValue(id) {
    const value = this.state.personList.find((p) => {
      return p.value === id;
    });
    this.setState({ personSelected: value });
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
          {this.props.label ? (
            <label htmlFor={this.state.config.name}>{this.props.label}</label>
          ) : null}
          <div className="mb-2">
            <Select
              options={this.state.personList}
              value={
                this.props.selected
                  ? this.props.selected
                  : this.state.personSelected
              }
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.selectStudentError}
              id="selectStudentError"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
