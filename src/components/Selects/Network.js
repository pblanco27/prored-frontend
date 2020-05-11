import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditNetwork from "../Modal/EditNetwork";
import CreateNetwork from "../Modal/CreateNetwork";

export default class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkList: [],
      networkSelected: null,
      hasEdit: true,
      config: {
        name: "selectNetwork",
        isLoading: true,
        isDisabled: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getNetworks = this.getNetworks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disable = this.disable.bind(this);

    //ref
    this.networkNameError = React.createRef();
  }

  componentDidMount() {
    this.getNetworks();
    this.networkNameError.current.style.display = "none";
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
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getNetworks() {
    const res = await axios.get(`${API}/network`);
    const networkData = res.data;
    const networkList = networkData.map((network) => ({
      label: network.name,
      value: network.id_network,
      name: network.name,
      type: network.network_type
    }));
    this.setState({ networkList, networkSelected: null });
    this.disable(false);
  }

  /**
   * * Función para asignar la red seleccionada
   */
  handleChange(value) {
    this.setState({
      networkSelected: value,
    });
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>Redes asociadas</label>
        <div className="item-content">
          <div className="select">
            <Select
              onDisable={this.disable}
              options={this.state.networkList}
              value={this.state.networkSelected}
              onChange={this.handleChange}
              config={this.state.config}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.networkNameError}
            ></div>
          </div>
          <div className="btn-editar">
            <EditNetwork
              id_network={
                this.state.networkSelected
                  ? this.state.networkSelected.value
                  : 0
              }
              network_name={
                this.state.networkSelected
                  ? this.state.networkSelected.name
                  : ""
              }
              network_type={
                this.state.networkSelected
                  ? this.state.networkSelected.type
                  : ""
              }
              getNetworks={this.getNetworks}
            />
          </div>
          <div className="btn-crear">
            <CreateNetwork getNetworks={this.getNetworks} />
          </div>
        </div>
      </div>
    );
  }
}
