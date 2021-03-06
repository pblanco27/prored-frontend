import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class ProjectStudent extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      studentSelected: null,
      config: {
        name: "selectProjectStudent",
        isMulti: this.props.isMulti ? true : false,
        isLoading: false,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getStudents = this.getStudents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getStudents() {
    this.loading();
    const res = await get_request(`project/students/${this.props.id_project}`);
    if (res.status && this._isMounted) {
      const studentData = res.data;
      const studentList = studentData.map((student) => ({
        label: `${student.name} ${student.lastname1} ${student.lastname2}`,
        value: student.rel_code,
      }));
      this.setState({ studentList, studentSelected: null });
      this.loading(false);
    }
  }

  handleChange(value) {
    this.setState({
      studentSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value, this.props.name);
    }
  }

  render() {
    return (
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="px-3">
          <div className="mb-2">
            <Select
              options={this.state.studentList}
              value={this.state.studentSelected}
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
