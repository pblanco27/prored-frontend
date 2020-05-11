import React, { Component, Fragment } from "react";
import SelectNetwork from "../../Selects/Network";

export default class Networks extends Component {
  render() {
    return (
      <Fragment>
        <b>Información de redes</b>
        <SelectNetwork />
      </Fragment>
    );
  }
}
