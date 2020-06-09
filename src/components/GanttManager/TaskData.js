import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";

export default class TaskData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      disable: this.props.disable,
    };
    //bind
    this.handleChange = handleSimpleInputChange.bind(this);
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">
            {this.props.idTask}
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              disabled={this.state.disable}
            ></input>
          </div>
          <div className="col-md-3">
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="1"
              value={this.state.description}
              onChange={this.handleChange}
              disabled={this.state.disable}
            ></textarea>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="date"
              id="startDate"
              name="startDate"
              min="1917-01-01"
              value={this.state.startDate}
              onChange={this.handleChange}
              disabled={this.state.disable}
            ></input>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="date"
              id="endDate"
              name="endDate"
              min="1917-01-01"
              value={this.state.endDate}
              onChange={this.handleChange}
              disabled={this.state.disable}
            ></input>
          </div>
          <div className="col-md-2"></div>
        </div>
        <br></br>
      </div>
    );
  }
}
