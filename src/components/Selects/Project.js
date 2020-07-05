import React, { Component } from "react";
import Select from "./Select";
import { get_request } from "../../helpers/Request";
import { loading } from "./disable";

export default class SelectProject extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      projectSelected: null,
      config: {
        name: "selectProject",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.loading = loading.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setProject = this.setProject.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getProjects();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getProjects() {
    this.loading();
    const res = await get_request(`project`);
    if (res.status && this._isMounted) {
      const projectsData = res.data;
      const projectList = projectsData.map((project) => ({
        label: project.name,
        value: project.id_project,
      }));
      this.setState({ projectList });
      this.setValue(this.props.value);
      this.loading(false);
    }
  }

  handleChange(value) {
    this.setState({
      projectSelected: value ? value : null,
    });
    if (this.props.handleChangeProject) {
      this.props.handleChangeProject(value);
    }
  }

  setProject(project) {
    this.setState({
      projectSelected: project,
    });
  }

  setValue(id) {
    const value = this.state.projectList.find((p) => {
      return p.value === id;
    });
    this.setState({ projectSelected: value });
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
              options={this.state.projectList}
              value={this.state.projectSelected}
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
