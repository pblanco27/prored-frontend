import React, { Component } from "react";
import Select from "./Select";
import { API } from "../../services/env";
import axios from "axios";
import { loading } from "./disable";

export default class SelectActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      activitySelected: null,
      config: {
        name: "selectActivity",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.loading = loading.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setActivity = this.setActivity.bind(this);
  }

  componentDidMount() {
    this.getActivities();
  }

  async getActivities() {
    this.loading();
    const res = await axios.get(`${API}/activity`);
    const activityData = res.data;
    const activityList = activityData.map((activity) => ({
      label: activity.name,
      value: activity.id_activity,
    }));
    this.setState({
      activityList,
    });
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      activitySelected: value ? value : null,
    });
    if (this.props.handleChangeActivity) {
      this.props.handleChangeActivity(value);
    }
  }

  setActivity(activity) {
    this.setState({
      activitySelected: activity,
    });
  }

  render() {
    return (
      <div className="my-2">
        {this.props.label ? (
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
        ) : null}
        <div className="px-3">
          <div className="mb-2">
            <Select
              options={this.state.activityList}
              value={this.state.activitySelected}
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
