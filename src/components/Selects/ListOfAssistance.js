import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectListAssistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assistanceList: [],
      assistanceSelected: null,
      config: {
        name: "selectAssistance",
        isMulti: false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getListAssistances = this.getListAssistances.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getListAssistances();
  }

  async getListAssistances() {
    this.loading();
    //
    const res = await get_request(`list/activity/${this.props.id_activity}`);
    if (res.status) {
      const listAssisData = res.data;
      const assistanceList = listAssisData.map((list) => ({
        label: `(${list.date_passed}) - ${list.filename}`,
        value: list.id_list,
      }));
      this.setState({ assistanceList, assistanceSelected: null });
      this.loading(false);
    } 
  }

  handleChange(value) {
    this.setState({
      assistanceSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className="my-2">
        <div className="px-3">
          <div className="mb-2">
            <Select
              options={this.state.assistanceList}
              value={this.state.assistanceSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
          </div>
        </div>
      </div>
    );
  }
}
