import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languagesList: [],
      languageSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectLanguages",
        isMulti: true,
        isLoading: true,
        placeholder: "Seleccione los idiomas",
        noOptionsMessage: () => `No hay opciones`,
      },
    };
    //bidn
    this.getLanguages = this.getLanguages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.languageError = React.createRef();
  }

  componentDidMount() {
    this.getLanguages();
    this.languageError.current.style.display = "none";
  }

  /**
   * * Función para obtener todos los lenguages de la base
   */
  async getLanguages() {
    this.loading();
    const res = await axios.get(`${API}/language`);
    const languageData = res.data;
    const languagesList = languageData.map((language) => ({
      label: language.name,
      value: language.id_language,
      name: language.name,
    }));
    this.setState({
      languagesList,
      languageSelected: this.props.value ? this.state.languageSelected : null,
    });
    this.loading(false);
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
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
            <Select
              options={this.state.languagesList}
              value={this.state.languageSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
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
