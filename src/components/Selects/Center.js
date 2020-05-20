import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCenter from "../Modal/EditCenter";
import CreateCenter from "../Modal/CreateCenter";

export default class SelectCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerList: [],
      centerSelected: null,
      config: {
        name: "selectCenter",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCenters = this.getCenters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.centerNameError = React.createRef();
  }

  componentDidMount() {
    this.getCenters();
    this.centerNameError.current.style.display = "none";
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
   * * Función para obtener los centros
   * * Obtiene de la base los centros educativos previamente registradas
   */
  async getCenters() {
    const res = await axios.get(`${API}/center`);
    const centerData = res.data;
    const centerList = centerData.map((center) => ({
      label: center.name,
      value: center.id_center,
      id: center.id_center,
      name: center.name,
    }));
    this.setState({ centerList, centerSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar el centro seleccionado
   */
  handleChange(value) {
    this.setState({
      centerSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditCenter
            id_center={
              this.state.centerSelected ? this.state.centerSelected.value : 0
            }
            center_name={
              this.state.centerSelected ? this.state.centerSelected.name : ""
            }
            getCenters={this.getCenters}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.centerList}
              value={this.state.centerSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.centerNameError}
            ></div>
          </div>
          {this.editButton()}
          <div className="btn-crear">
            <CreateCenter getCenters={this.getCenters}/>
          </div>
        </div>
      </div>
    );
  }
}
