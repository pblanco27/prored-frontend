import React, { Component } from "react";

export default class Location extends Component {
  constructor(){
    super();
  }
  
  render() {
    return (
      <>
        <div className="form-group required">
          <label htmlFor="province">Localización</label>
          <select className="form-control" name="provinciaSelect">
            <option
              className="select-cs"
              value=""
              label="Seleccione la provincia"
              defaultValue
            >
              Seleccione la provincia
            </option>
          </select>
        </div>
        <div className="form-group required">
          <select className="form-control" name="cantonSelect">
            <option
              className="select-cs"
              value=""
              label="Seleccione el cantón"
              defaultValue
            >
              Seleccione el cantón
            </option>
          </select>
        </div>
        <div className="form-group required">
          <select
            className="form-control"
            name="id_district"
            value={this.props.id_district}
            onChange={this.props.handleChange}
          >
            <option
              className="select-cs"
              value=""
              label="Seleccione el distrito"
              defaultValue
            >
              Seleccione el distrito
            </option>
            <option value="1">Santa Ana</option>
            <option value="2">Pavas</option>
          </select>
          <div
            className="alert alert-danger"
            style={{ display: "none", fontSize: 12 }}
            id="personDistrictError"
          ></div>
        </div>
      </>
    );
  }
}
