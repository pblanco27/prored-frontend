import React, { Component } from "react";

export default class LinkedSection extends Component {
  constructor() {
    super();
    this.state = {
      student: false,
      profile: 0,
    };

    // bind
    this.onChangeLinkedType = this.onChangeLinkedType.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
  }

  onChangeProfile(event) {
    this.setState({
      profile: event.target.value,
    });
    this.props.history.push(`${this.props.match.url}/estudiante`);
    this.props.handleChange(event);
  }

  onChangeLinkedType(event) {
    //console.log(event.target.value);
    //console.log(this.props.match.url);
    if (event.target.value === "investigador") {
      this.setState({
        student: false,
        profile: 0,
      });
      this.props.history.push(`${this.props.match.url}/${event.target.value}`);
      this.props.handleChange({
        target: {
          name: "profile",
          value: "",
        },
      });
    } else {
      this.setState({
        student: true,
      });
      this.props.history.push(`${this.props.match.url}`);
    }
    this.props.handleChange(event);
  }

  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Sección de vinculación</h4>
        </header>
        <center>Los campos marcados con * son requeridos</center>

        <div className="academic-info">
          <div className="select-section">
            <div className="item">
              <label htmlFor="linkedType">Tipo de vinculado: </label>
              <div className="item-content select">
                <select
                  className="form-control"
                  name="linkedType"
                  onChange={this.onChangeLinkedType}
                >
                  <option className="select-cs" value="" defaultValue>
                    Seleccione el tipo de vinculado
                  </option>
                  <option value="estudiante">Estudiante</option>
                  <option value="investigador">Investigador</option>
                </select>
              </div>
            </div>
          </div>
          <div className="select-section">
            <div className="item">
              <label htmlFor="profile">Perfil del estudiante: </label>
              <div className="item-content select">
                <select
                  className="form-control"
                  name="profile"
                  disabled={!this.state.student}
                  onChange={this.onChangeProfile}
                  value={this.state.profile}
                >
                  <option className="select-cs" value="0" defaultValue>
                    Seleccione el perfil del estudiante
                  </option>
                  <option value="Invitado">Invitado</option>
                  <option value="Básico">Básico</option>
                  <option value="Medio">Medio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
