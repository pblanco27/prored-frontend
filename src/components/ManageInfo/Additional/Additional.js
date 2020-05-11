import React, { Component, Fragment } from "react";
import SelectCenter from "../../Selects/Center";
import SelectAssoCareer from "../../Selects/AssoCareers";

export default class Additional extends Component {
  constructor(props) {
    super(props);

    //bind
    this.handleChangeCenter = this.handleChangeCenter.bind(this);

    //ref
    this.selectAssoCareer = React.createRef();
  }

  async handleChangeCenter(value) {
    if (value) {
      await this.selectAssoCareer.current.saveIdCenter(value.value);
    } else {
      await this.selectAssoCareer.current.saveIdCenter(0);
    }
    this.selectAssoCareer.current.getAssoCareers();
  }

  render() {
    return (
      <Fragment>
        <b>Información adicional</b>
        <SelectCenter handleChangeParent={this.handleChangeCenter} />
        <SelectAssoCareer ref={this.selectAssoCareer} />
      </Fragment>
    );
  }
}
