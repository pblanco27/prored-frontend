import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";
import Input from "../Input/Input";

export default class TaskData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      endDate_key: 1,
      disable: this.props.disable,
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.lineInfoGantt) {
      const ganttData = this.props.lineInfoGantt;
      if (ganttData) {
        await this.onLoadInfo(ganttData);
      }
    }
  }

  // funcion para cargar la informacion
  async onLoadInfo(ganttData) {
    await this.setState({
      name: ganttData[1],
      description: ganttData[2],
      startDate: ganttData[3],
      endDate: ganttData[4],
    });
  }

  disable() {
    this.setState({ disable: !this.state.disable });
  }

  handleStartDateChange(event) {
    this.setState({ endDate: "", endDate_key: this.state.endDate_key + 1 });
    this.handleChange({
      target: {
        name: "startDate",
        value: event.target ? event.target.value : "",
      },
    });
  }

  getNextDate() {
    const date = new Date(this.state.startDate);
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().slice(0, 10);
    return newDate;
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-1">{this.props.idTask}</div>
        <div className="col-md-2">
          <Input
            type="text"
            idError={`taskNameError${this.props.idTask}`}
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            disable={this.state.disable}
          />
        </div>
        <div className="col-md-3">
          <Input
            type="textarea"
            idError={`taskDescriptionError${this.props.idTask}`}
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            disable={this.state.disable}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="date"
            name="startDate"
            min="1980-01-01"
            idError={`taskStartDateError${this.props.idTask}`}
            required={true}
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
            disable={this.state.disable}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="date"
            name="endDate"
            key={this.state.endDate_key}
            min={
              this.state.startDate !== "" ? this.getNextDate() : "1980-01-01"
            }
            idError={`taskEndDateError${this.props.idTask}`}
            required={true}
            value={this.state.endDate}
            onChange={this.handleChange}
            disable={
              this.state.disable
                ? this.state.disable
                : this.state.startDate === ""
            }
          />
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  }
}
