import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";

export default class SelectLanguages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languagesList: [],
      languageSelected: null,
      config: {
        name: "selectLanguages",
        isMulti: true,
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione los idiomas",
        noOptionsMessage: () => `No hay opciones`,
      },
    };
    //bidn
    this.getLanguages = this.getLanguages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.languageError = React.createRef();
  }

  componentDidMount() {
    this.getLanguages();
    this.languageError.current.style.display = "none";
  }

  disable(isDisabled = true) {
    this.setState({
      config: {
        ...this.state.config,
        isLoading: isDisabled,
        isDisabled: isDisabled,
      },
    });
  }

  /**
   * * Función para obtener todos los lenguages de la base
   */
  async getLanguages() {
    const res = await axios.get(`${API}/language`);
    const languageData = res.data;
    const languagesList = languageData.map((language) => ({
      label: language.name,
      value: language.id_language,
      name: language.name,
    }));
    this.setState({ languagesList, languageSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar la red seleccionada
   */
  handleChange(value) {
    this.setState({
      languageSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.languagesList}
              value={this.state.languageSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.languageError}
              id="selectLanguageError"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
