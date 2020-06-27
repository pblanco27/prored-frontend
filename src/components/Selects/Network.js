import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditNetwork from "../Modal/EditNetwork";
import CreateNetwork from "../Modal/CreateNetwork";
import { loading } from "./disable";

export default class SelectNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkList: [],
      networkSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectNetwork",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getNetworks = this.getNetworks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.networkNameError = React.createRef();
  }

  componentDidMount() {
    this.getNetworks();
    this.networkNameError.current.style.display = "none";
  }

  /**
   * * Función para obtener las carreras
   * * Obtiene de la base las carreras previamente registradas
   */
  async getNetworks() {
    this.loading();
    const res = await get_request(`network`);
    if (res.status) {
      const networkData = res.data;
      const networkList = networkData.map((network) => ({
        label: network.name,
        value: network.id_network,
        name: network.name,
        type: network.network_type,
      }));
      this.setState({
        networkList,
        networkSelected: this.props.value ? this.state.networkSelected : null,
      });
      this.loading(false);
    } 
  }

  /**
   * * Función para asignar la red seleccionada
   */
  handleChange(value) {
    this.setState({
      networkSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="mr-2">
          <EditNetwork
            id_network={
              this.state.networkSelected ? this.state.networkSelected.value : 0
            }
            network_name={
              this.state.networkSelected ? this.state.networkSelected.name : ""
            }
            network_type={
              this.state.networkSelected ? this.state.networkSelected.type : ""
            }
            getNetworks={this.getNetworks}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="my-2">
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
            <Select
              options={this.state.networkList}
              value={this.state.networkSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.networkNameError}
            ></div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger mr-2">Inactivar</button>
            {this.editButton()}
            <CreateNetwork getNetworks={this.getNetworks} />
          </div>
        </div>
      </div>
    );
  }
}
