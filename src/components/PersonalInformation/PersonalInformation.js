import React, { Component } from "react";
import Input from "../Input/Input";
import Location from "../Location/Location";
import SelectCountry from "../Selects/Country";
import { marital_status } from "../../helpers/Enums";
import "./PersonalInformation.css";

export default class PersonalInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableDNI: this.props.disable ? true : false,
    };

    // bind
    this.handleChangeResident = this.handleChangeResident.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleChangeResident(event) {
    const { name } = event.target;
    this.props.handleChange({
      target: {
        name: name,
        value: !this.props.resident,
      },
    });
    if (this.props.direction) {
      if (!this.props.resident) {
        this.props.handleChange({
          target: {
            name: "id_district",
            value: this.props.direction.id_district,
          },
        });
      }
    }
  }

  handleCountryChange(value) {
    this.props.handleChange({
      target: {
        name: "nationality",
        value: value ? value.value : "",
      },
    });
  }

  showLocations() {
    if (this.props.resident) {
      return (
        <Location
          id_district={this.props.id_district}
          handleChange={this.props.handleChange}
          direction={this.props.direction}
          disable={this.props.disable}
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
            <b>Información personal</b>
            <Input
              label="Nombre"
              type="text"
              name="name"
              onChange={this.props.handleChange}
              value={this.props.name}
              idError="studentNameError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Primer Apellido"
              type="text"
              name="lastname1"
              value={this.props.lastname1}
              onChange={this.props.handleChange}
              idError="studentLastName1Error"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Segundo Apellido"
              type="text"
              name="lastname2"
              value={this.props.lastname2}
              onChange={this.props.handleChange}
              idError="studentLastName2Error"
              required={true}
              disable={this.props.disable}
            />


            <Input
              label="Cédula de identificación"
              type="text"
              name="dni"
              value={this.props.dni}
              onChange={this.props.handleChange}
              idError="studentDniError"
              required={true}
              disable={this.state.disableDNI}
            />
            
            <Input
              label="Fecha de nacimiento"
              type="date"
              name="born_dates"
              value={this.props.born_dates}
              onChange={this.props.handleChange}
              idError="studentDateError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Estado civil"
              type="select"
              name="marital_status"
              value={this.props.marital_status}
              onChange={this.props.handleChange}
              options={marital_status}
              disable={this.props.disable}
            />
            
            <div className="form-group">
              <SelectCountry
                handleChangeParent={this.handleCountryChange}
                required={true}
                value={this.props.country_selected}
                disable={this.props.disable}
              />
            </div>
          </div>
          <div className="column">
            <b>Información de contacto</b>
            <Input
              label="Correo electrónico"
              type="text"
              name="email"
              value={this.props.email}
              onChange={this.props.handleChange}
              idError="studentEmailError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Número de teléfono"
              type="text"
              name="phone_number"
              value={this.props.phone_number}
              onChange={this.props.handleChange}
              idError="studentPhoneError"
              required={true}
              disable={this.props.disable}
            />

            <Input
              label="Número de emergencia"
              type="text"
              name="emergency_contact"
              value={this.props.emergency_contact}
              onChange={this.props.handleChange}
              idError="studentEmergencyError"
              required={true}
              disable={this.props.disable}
            />
            <b>Información de residencia</b>
            <Input
              label="Residencia en Costa Rica"
              type="checkbox"
              name="resident"
              checked={this.props.resident}
              onChange={this.handleChangeResident}
              disable={this.props.disable}
            />

            {this.showLocations()}

            <Input
              label="Dirección exacta"
              type="textarea"
              name="address"
              rows="3"
              value={this.props.address}
              onChange={this.props.handleChange}
              idError="addressError"
              disable={this.props.disable}
            />
          </div>
        </div>
      </div>
    );
  }
}
