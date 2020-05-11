import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import EditCenter from "../Modal/EditCenter";
import CreateCenter from "../Modal/CreateCenter";
export default class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerList: [],
      centerSelected: null,
      hasEdit: true,
      config: {
        name: "selectPerson",
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

  handleChange(value) {
    this.setState({
      centerSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className="item">
        <label htmlFor={this.state.config.name}>Centros educativos</label>
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
          <div className="btn-crear">
            <CreateCenter getCenters={this.getCenters} />
          </div>
        </div>
      </div>
    );
  }
}
