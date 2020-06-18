import React, { Component } from "react";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      config: {
        name: "selectPerson",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.loading = loading.bind(this);
  }


  render() {
    return (
      <div className={`item ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.props.options}
              value={this.props.value}
              onChange={this.props.handleChangeParent}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12, display: "none" }}
              id="selectPersonError"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
