import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";
import CreatePeriod from "../Modal/CreatePeriod";
import "../LinkedGantt/LinkedGantt.css";

export default class Period extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodList: [],
      periodSelected: null,
      config: {
        name: "selectPeriod",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getPeriods = this.getPeriods.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getPeriods();
  }

  async getPeriods() {
    this.loading();
    this.props.clearPeriod();
    const res = await axios.get(`${API}/period`);
    const periodData = res.data;
    const periodList = periodData.map((period) => ({
      label: period.name,
      value: period.id_period,
    }));
    this.setState({ periodList, periodSelected: null });
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      periodSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value, this.props.name);
    }
  }

  render() {
    return (
      <div className={`period ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="period-content">
          <div className="select-period">
            <Select
              options={this.state.periodList}
              value={this.state.periodSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
          </div>
          <div className="create-period-btn">
            <CreatePeriod
              getPeriods={this.getPeriods}
              disable={this.props.disable}
            />
          </div>
        </div>
      </div>
    );
  }
}
