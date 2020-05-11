import React, { Component } from "react";
import Select from "react-select";

export default class SimpleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true,
      isMulti: false,
    };

    //bind
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value, actionMeta) {
    //console.log(value);
    //console.log(actionMeta);
    if (actionMeta.action === "select-option" || actionMeta.action === "clear")
      this.props.onChange(value);
    if (
      actionMeta.action === "remove-value" ||
      actionMeta.action === "pop-value"
    )
      this.props.onRemove(value, actionMeta.removedValue);
  }

  render() {
    return (
      <Select
        className="select-auto"
        onChange={this.handleChange}
        options={this.props.options}
        value={this.props.value}
        {...this.state}
        {...this.props.config}
      />
    );
  }
}
