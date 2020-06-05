import React, { Component } from "react";
import { handleSimpleInputChange } from "../../helpers/Handles";

export default class TaskData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.idTask,
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      disable: this.props.disable,
    };
    //bind
    this.onChange = handleSimpleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.lineInfoGantt) {
      this.onLoadInfo();
    }
  }

  // funcion para cargar la informacion
  onLoadInfo() {
    this.setState({
      id: this.props.lineInfoGantt[0],
      name: this.props.lineInfoGantt[1],
      description: this.props.lineInfoGantt[2],
      startDate: this.props.lineInfoGantt[3],
      endDate: this.props.lineInfoGantt[4],
    });
  }

  disable() {
    this.setState({ disable: !this.state.disable});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-1">{this.state.id}</div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              disabled={this.state.disable}
              required
            ></input>
          </div>
          <div className="col-md-3">
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="1"
              value={this.state.description}
              onChange={this.onChange}
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
              onChange={this.onChange}
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
              onChange={this.onChange}
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
