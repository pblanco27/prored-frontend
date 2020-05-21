import React, { Component } from "react";
import Select from "./Select";
import { countries } from "../../helpers/Enums";
import { disable } from "./disable";
export default class SelectCountry extends Component {
  constructor(props) {
      super(props);
      this.state = {
      countryList: [],
      countrySelected: this.props.value ? this.props.value : null,
      hasEdit: true,
      config: {
        name: "nationality",
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.handleChange = this.handleChange.bind(this);
    this.disable = disable.bind(this);

    //ref
    this.countryError = React.createRef();
  }

  componentDidMount() {
    this.formatCountries();
    this.countryError.current.style.display = "none";
  }

  /**
   * * Función para obtener los países del JSON y darles
   * * el formato adecuado para utilizarse con React-Select
   */
  formatCountries() {
    const countryList = countries.map((country) => ({
      label: `${countryToFlag(country.code)} ${country.label} (${
        country.code
      })`,
      value: country.code,
    }));
    this.setState({
      countryList,
    });
    this.disable(false);
  }

  /**
   * * Función para asignar el país seleccionado
   */
  handleChange(value) {
    this.setState({
      countrySelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className={`item ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>País de nacimiento</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.countryList}
              value={this.state.countrySelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.countryError}
              id="countrySelectError"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * * Función que obtiene la bandera del país dado su código
 */
export function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}
