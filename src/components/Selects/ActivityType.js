import React, { Component } from "react";
import axios from "axios";
import { API } from "../../services/env";
import EditActivityType from "../Modal/EditActivityType";
import CreateActivityType from "../Modal/CreateActivityType";
import Select from "./Select";
import { loading } from "./disable";
import swal from "sweetalert";
export default class SelectActivityType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTypeList: [],
      activityTypeSelected: this.props.value ? this.props.value : null,
      config: {
        name: "selectActivityType",
        isLoading: true,
        placeholder: "Seleccione una",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getActivityType = this.getActivityType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getActivityType();
  }

  async getActivityType() {
    this.loading();
    try {
      const res = await axios.get(`${API}/activity/type`);
      const activityTypeData = res.data;
      const activityTypeList = activityTypeData.map((type) => ({
        label: type.name,
        value: type.id_acti_type,
      }));
      this.setState({
        activityTypeList,
        activityTypeSelected: this.props.value
          ? this.state.activityTypeSelected
          : null,
      });
    } catch (error) {
      swal("¡Error!", "Hay problemas con el servidor.", "error");
    }
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      activityTypeSelected: value,
    });

    //Para enviar algo al padre si es necesario
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="btn-editar">
          <EditActivityType
            id_acti_type={
              this.state.activityTypeSelected
                ? this.state.activityTypeSelected.value
                : ""
            }
            name={
              this.state.activityTypeSelected
                ? this.state.activityTypeSelected.label
                : ""
            }
            getActivityType={this.getActivityType}
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
              options={this.state.activityTypeList}
              value={this.state.activityTypeSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12, display: "none" }}
              id="selectActivityTypeError"
            ></div>
          </div>
          {this.editButton()}
          <div className="btn-crear">
            <CreateActivityType getActivityType={this.getActivityType} />
          </div>
        </div>
      </div>
    );
  }
}
