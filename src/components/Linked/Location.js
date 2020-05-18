import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";

export default class Location extends Component {
  constructor() {
    super();
    this.state = {
      //Listas para cargar datos
      provinces: [],
      cantons: [],
      districts: [],
    };

    // bind
    this.getProvince = this.getProvince.bind(this);
    this.getCanton = this.getCanton.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    this.handleChangeProvince = this.handleChangeProvince.bind(this);
    this.handleChangeCanton = this.handleChangeCanton.bind(this);
  }

  componentDidMount() {
    this.getProvince();
  }

  /**
   * * Función que obtiene todas las provincias de la base
   */
  async getProvince() {
    const res = await axios.get(`${API}/province`);
    const provinceData = res.data;
    this.setState({ provinces: provinceData });
  }

  /**
   * * Función que obtiene todos los cantones de la base
   */
  async getCanton(id_province) {
    const res = await axios.get(`${API}/province/${id_province}/canton`);
    const cantonData = res.data;
    this.setState({ cantons: cantonData });
  }

  /**
   * * Función que obtiene todos los distritos de la base
   */
  async getDistrict(id_canton) {
    const res = await axios.get(`${API}/canton/${id_canton}/district`);
    const districtData = res.data;
    this.setState({ districts: districtData });
  }

  /**
   * * Función que setea la nueva provincia seleccionada,
   * * además de actualizar la lista de cantones de dicha provincia
   */
  handleChangeProvince(event) {
    this.setState({
      cantons: [],
      districts: [],
    });
    const id_province = event.target.value;
    this.getCanton(id_province);
  }

  /**
   * * Función que setea el nuevo cantón seleccionado,
   * * además de actualizar la lista de distritos de dicho cantón
   */
  handleChangeCanton(event) {
    this.setState({ districts: [] });
    const id_canton = event.target.value;
    this.getDistrict(id_canton);
  }

  render() {
    return (
      <>
        <div className="form-group required">
          <label htmlFor="province">Localización</label>
          <select
            className="form-control"
            name="provinciaSelect"
            value={this.props.id_province}
            onChange={this.handleChangeProvince}
          >
            <option
              className="select-cs"
              value=""
              label="Seleccione la provincia"
              defaultValue
            >
              Seleccione la provincia
            </option>
            {this.state.provinces.map((province) => (
              <option key={province.id_province} value={province.id_province}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group required">
          <select
            className="form-control"
            name="cantonSelect"
            value={this.props.id_canton}
            onChange={this.handleChangeCanton}
          >
            <option
              className="select-cs"
              value=""
              label="Seleccione el cantón"
              defaultValue
            >
              Seleccione el cantón
            </option>
            {this.state.cantons.map((canton) => (
              <option key={canton.id_canton} value={canton.id_canton}>
                {canton.name}
              </option>
            ))}
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
            {this.state.districts.map((district) => (
              <option key={district.id_district} value={district.id_district}>
                {district.name}
              </option>
            ))}
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
