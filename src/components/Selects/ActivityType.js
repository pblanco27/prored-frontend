import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import EditActivityType from "../Modal/EditActivityType";
import CreateActivityType from "../Modal/CreateActivityType";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectActivityType extends Component {
  _isMounted = false;

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

  async componentDidMount() {
    this._isMounted = true;

    await this.getActivityType();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getActivityType() {
    this.loading();
    const res = await get_request(`activity/type`);
    if (res.status && this._isMounted) {
      const activityTypeData = res.data;
      const activityTypeList = activityTypeData.map((type) => ({
        label: `${!type.status ? "(Inactivado) " : ""}${type.name}`,
        value: type.id_acti_type,
        status: type.status,
      }));
      this.setState({
        activityTypeList,
        activityTypeSelected: this.props.value
          ? this.state.activityTypeSelected
          : null,
      });
      this.setValue(this.props.value);
      this.loading(false);
    }
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

  setValue(id) {
    const value = this.state.activityTypeList.find((a) => {
      return a.value === id;
    });
    this.setState({ activityTypeSelected: value ? value : null });
  }

  editButton() {
    if (!this.props.noEdit) {
      return (
        <div className="mr-2">
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
            status={
              this.state.activityTypeSelected
                ? this.state.activityTypeSelected.status
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
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          <label htmlFor={this.state.config.name}>{this.props.label}</label>
          <div className="mb-2">
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
          <div className="d-flex justify-content-center">
            {this.editButton()}
            <CreateActivityType getActivityType={this.getActivityType} />
          </div>
        </div>
      </div>
    );
  }
}
