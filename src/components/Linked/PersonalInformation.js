import React, { Component } from "react";
import SelectCountry from "../Selects/Country";
import Location from "./Location";
import './PersonalInformation.css'
export default class PersonalInformation extends Component {
  constructor() {
    super();

    // bind
    this.handleChangeResident = this.handleChangeResident.bind(this);
  }

  handleChangeResident(event) {
    const { name } = event.target;
    this.props.handleChange({
      target: {
        name: name,
        value: !this.props.resident,
      },
    });
  }

  showLocations() {
    if (this.props.resident) {
      return (
        <Location
          id_district={this.props.id_district}
          handleChange={this.props.handleChange}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Información personal</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <br></br>
        <div className="two-columns">
          <div className="column">
            <div className="form-group required">
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.props.name}
                onChange={this.props.handleChange}
              />
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personNameError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="lastname1">Primer Apellido</label>
              <input
                className="form-control"
                type="text"
                name="lastname1"
                value={this.props.lastname1}
                onChange={this.props.handleChange}
              />
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personLastName1Error"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="lastname2">Segundo Apellido</label>
              <input
                className="form-control"
                type="text"
                name="lastname2"
                value={this.props.lastname2}
                onChange={this.props.handleChange}
              />
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personLastName2Error"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="born_date">Fecha de nacimiento</label>
              <input
                className="form-control"
                type="date"
                name="born_date"
                min="1917-01-01"
                value={this.props.born_date}
                onChange={this.props.handleChange}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personDateError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="dni">Cédula de identificación</label>
              <input
                className="form-control"
                type="text"
                name="dni"
                value={this.props.dni}
                onChange={this.props.handleChange}
              ></input>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personDniError"
              ></div>
            </div>
            <div className="form-group required">
              <label htmlFor="marital_status">Estado civil</label>
              <select
                className="form-control"
                name="marital_status"
                value={this.props.marital_status}
                onChange={this.props.handleChange}
              >
                <option className="select-cs" value="" defaultValue>
                  Seleccione estado civil
                </option>
                <option value="Soltero">Soltero (a)</option>
                <option value="Casado">Casado (a)</option>
                <option value="Viudo">Viudo (a)</option>
                <option value="Divorciado">Divorciado (a)</option>
              </select>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personCivilStateError"
              ></div>
            </div>
          </div>
          <div className="column">
            <div className="form-group">
              <SelectCountry />
            </div>
            <div className="form-group">
              <label htmlFor="resident">Residencia en Costa Rica</label>
              <input
                type="checkbox"
                name="resident"
                checked={this.props.resident}
                onChange={this.handleChangeResident}
              />
            </div>

            {this.showLocations()}

            <div className="form-group required">
              <label htmlFor="address">Dirección exacta</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={this.props.address}
                onChange={this.props.handleChange}
              ></textarea>
              <div
                className="alert alert-danger"
                style={{ display: "none", fontSize: 12 }}
                id="personAddressError"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
