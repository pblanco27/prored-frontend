import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";
import CreateInvesUnit from "../Modal/CreateInvestigationUnit";
import EditInvestUnit from "../Modal/EditInvestigationUnit";

export default class SelectInvestigationUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invesUnitList: [],
      invesUnitSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectInvesUnit",
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };
    //bind
    this.getInvestigationUnit = this.getInvestigationUnit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getInvestigationUnit();
  }

  async getInvestigationUnit() {
    this.loading();
    const res = await axios.get(`${API}/investigation_unit`);
    const investigation_unitData = res.data;
    const invesUnitList = investigation_unitData.map((inv) => ({
      label: <span title={inv.description}>{inv.name}</span>,
      name: inv.name,
      value: inv.id_inv_unit,
      description: inv.description,
    }));
    this.setState({
      invesUnitList,
      invesUnitSelected: this.props.value ? this.state.invesUnitSelected : null,
    });
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      invesUnitSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditInvestUnit
            id_inv_unit={
              this.state.invesUnitSelected
                ? this.state.invesUnitSelected.value
                : ""
            }
            name={
              this.state.invesUnitSelected
                ? this.state.invesUnitSelected.name
                : ""
            }
            description={
              this.state.invesUnitSelected
                ? this.state.invesUnitSelected.description
                : ""
            }
            getInvestUnit={this.getInvestigationUnit}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={`item ${this.props.required ? "required" : ""}`}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.invesUnitList}
              value={this.state.invesUnitSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12, display: "none" }}
              id="selectInvestigationUnit"
            ></div>
          </div>
          {this.editButton()}
          <div className="btn-crear">
            <CreateInvesUnit getInvestUnit={this.getInvestigationUnit} />
          </div>
        </div>
      </div>
    );
  }
}
