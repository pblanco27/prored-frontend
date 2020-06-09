import React, { Component } from "react";
import Select from "./Select";
import { countries } from "../../helpers/Enums";
import { loading } from "./disable";
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
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

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
    this.loading();
    const countryList = countries.map((country) => ({
      label: `${countryToFlag(country.code)} ${country.label} (${
        country.code
      })`,
      value: country.code,
    }));
    this.setState({
      countryList,
    });
    this.loading(false);
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
        <label htmlFor={this.state.config.name}>
          {this.props.label ? this.props.label : "País de nacimiento"}
        </label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.countryList}
              value={this.state.countrySelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.countryError}
              id={
                this.props.idError ? this.props.idError : "countrySelectError"
              }
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
