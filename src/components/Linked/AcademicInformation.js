import React, { Component } from "react";
import Academic from "../ManageInfo/Academic/Academic";

export default class AcademicInformation extends Component {
  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Información Académica</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <div className="academic-info">
          <div className="select-section">
            <Academic noEdit={true}/>
          </div>
          <div className="select-section">

          </div>
        </div>
      </div>
    );
  }
}
