import React, { Component } from "react";
import { profile } from "../../../helpers/Enums";
import "./ProfileSection.css";
import Input from "../PersonalInformation/Inputs/Input";
export default class LinkedSection extends Component {
  // async handleProfile(event) {
  //   await this.props.handleChange(event);
  //   this.props.handleProfileChange();
  // }
  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Sección de vinculación</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>
        <div className="profile-section">
          <Input
            label="Perfil del estudiante: "
            type="select"
            name="profile"
            value={this.props.profile}
            onChange={this.props.handleProfileChange}
            options={profile}
          />
        </div>
      </div>
    );
  }
}
