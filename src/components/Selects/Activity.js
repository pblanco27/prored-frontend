import React, { Component } from "react";
import Select from "./Select";
import { get_request } from "../../helpers/Request";
import { loading } from "./disable";

export default class SelectActivity extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      activitySelected: null,
      config: {
        name: "selectActivity",
        isMulti: this.props.isMulti ? true : false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.loading = loading.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setActivity = this.setActivity.bind(this);

    //ref
    this.selectActivityError = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.getActivities();
      this.selectActivityError.current.style.display = "none";
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getActivities() {
    this.loading();
    const res = await get_request(`activity`);
    if (res.status && this._isMounted) {
      const activityData = res.data;
      const activityList = activityData.map((activity) => ({
        label: activity.name,
        value: activity.id_activity,
      }));
      this.setState({
        activityList,
      });
      if (this.props.value) {
        this.setValue(this.props.value);
      }
      this.loading(false);
    }
  }

  handleChange(value) {
    this.setState({
      activitySelected: value ? value : null,
    });
    if (this.props.handleChangeActivity) {
      this.props.handleChangeActivity(value);
    }
  }

  setActivity(activity) {
    this.setState({
      activitySelected: activity,
    });
  }

  setValue(id) {
    const value = this.state.activityList.find((p) => {
      return p.value === id;
    });
    this.setState({ activitySelected: value });
  }

  render() {
    return (
      <div className={`my-2 ${this.props.required ? "required" : ""}`}>
        <div className="px-3">
          {this.props.label ? (
            <label htmlFor={this.state.config.name}>{this.props.label}</label>
          ) : null}
          <div className="mb-2">
            <Select
              options={this.state.activityList}
              value={this.state.activitySelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
            <div
              className="alert alert-danger"
              style={{ fontSize: 12 }}
              ref={this.selectActivityError}
              id="selectActivityError2"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
