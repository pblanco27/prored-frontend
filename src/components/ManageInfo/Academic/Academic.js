import React, { Component, Fragment } from "react";
import SelectCampus from "../../Selects/Campus";
import SelectCareer from "../../Selects/Career";

export default class Academic extends Component {
  render() {
    return (
      <Fragment>
        <b>Información académica (UNED)</b>
        <SelectCampus noEdit={this.props.noEdit} />
        <SelectCareer noEdit={this.props.noEdit} />
      </Fragment>
    );
  }
}
