import React, { Component } from "react";
import { get_request } from "../../helpers/Request";

export default class Location extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      //Listas para cargar datos
      provinces: [],
      cantons: [],
      districts: [],

      //Valores seleccionados
      id_province: 0,
      id_canton: 0,
    };

    // bind
    this.getProvince = this.getProvince.bind(this);
    this.getCanton = this.getCanton.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    this.handleChangeProvince = this.handleChangeProvince.bind(this);
    this.handleChangeCanton = this.handleChangeCanton.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getProvince();
    if (this.props.direction) {
      this.loadDirection();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadDirection() {
    if (this._isMounted) {
      this.setState({
        id_canton: this.props.direction.id_canton,
        id_province: this.props.direction.id_province,
      });
      this.getCanton(this.props.direction.id_province);
      this.getDistrict(this.props.direction.id_canton);
    }
  }

  /**
   * * Función que obtiene todas las provincias de la base
   */
  async getProvince() {
    const res = await get_request(`province`);
    if (res.status && this._isMounted) {
      const provinceData = res.data;
      this.setState({ provinces: provinceData });
    }
  }

  /**
   * * Función que obtiene todos los cantones de la base
   */
  async getCanton(id_province) {
    const res = await get_request(`province/${id_province}/canton`);
    if (res.status) {
      const cantonData = res.data;
      this.setState({ cantons: cantonData });
    }
  }

  /**
   * * Función que obtiene todos los distritos de la base
   */
  async getDistrict(id_canton) {
    const res = await get_request(`canton/${id_canton}/district`);
    if (res.status) {
      const districtData = res.data;
      this.setState({ districts: districtData });
    }
  }

  /**
   * * Función que setea la nueva provincia seleccionada,
   * * además de actualizar la lista de cantones de dicha provincia
   */
  handleChangeProvince(event) {
    const id_province = event.target.value;
    this.setState({
      cantons: [],
      districts: [],
      id_province: id_province,
    });
    this.props.handleChange({ target: { name: "id_district", value: "" } });
    this.getCanton(id_province);
  }

  /**
   * * Función que setea el nuevo cantón seleccionado,
   * * además de actualizar la lista de distritos de dicho cantón
   */
  handleChangeCanton(event) {
    const id_canton = event.target.value;
    this.setState({ districts: [], id_canton: id_canton });
    this.props.handleChange({ target: { name: "id_district", value: "" } });
    this.getDistrict(id_canton);
  }

  render() {
    return (
      <>
        <b>Localización</b>
        <div className="form-group required mt-2 px-3">
          <select
            className="form-control"
            name="provinciaSelect"
            value={this.state.id_province}
            onChange={this.handleChangeProvince}
            disabled={this.props.disable}
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
        <div className="form-group required px-3">
          <select
            className="form-control"
            name="cantonSelect"
            value={this.state.id_canton}
            onChange={this.handleChangeCanton}
            disabled={this.props.disable}
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
        <div className="form-group required px-3">
          <select
            className="form-control"
            name="id_district"
            value={this.props.id_district}
            onChange={this.props.handleChange}
            disabled={this.props.disable}
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
            id="districtError"
          ></div>
        </div>
      </>
    );
  }
}
