import React from "react";
import Input from "../Input/Input";
import "./ProfileSection.css";

export default function ProfileSection(props) {
  
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
          value={props.profile}
          onChange={props.handleChange}
          options={props.profiles}
          disable={props.disable}
        />
      </div>
    </div>
  );
}
