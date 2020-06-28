import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import EditCenter from "../Modal/EditCenter";
import CreateCenter from "../Modal/CreateCenter";
import { loading } from "./disable";

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
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getCenters = this.getCenters.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);

    //ref
    this.centerNameError = React.createRef();
  }

  componentDidMount() {
    this.getCenters();
    this.centerNameError.current.style.display = "none";
  }

  /**
   * * Función para obtener los centros
   * * Obtiene de la base los centros educativos previamente registradas
   */
  async getCenters() {
    this.loading();
    const res = await get_request(`center`);
    if (res.status) {
      const centerData = res.data;
      const centerList = centerData.map((center) => ({
        label: center.name,
        value: center.id_center,
        id: center.id_center,
        name: center.name,
      }));
      this.setState({ centerList, centerSelected: null });
      this.loading(false);
    }
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
        <div className="mr-2">
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
      <div className="my-2">
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
            <Select
              options={this.state.centerList}
              value={this.state.centerSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.centerNameError}
            ></div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger mr-2">Inactivar</button>
            {this.editButton()}
            <CreateCenter getCenters={this.getCenters} />
          </div>
        </div>
      </div>
    );
  }
}
