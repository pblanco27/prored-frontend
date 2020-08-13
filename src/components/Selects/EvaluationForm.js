import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectForm extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      formList: [],
      formSelected: null,
      config: {
        name: "selectForm",
        isMulti: false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getForms = this.getForms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getForms();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getForms() {
    this.loading();
    const res = await get_request(`evaluation_form/person/${this.props.dni}`);
    if (res.status && this._isMounted) {
      const formData = res.data;
      const formList = formData.map((form) => ({
        label: `${form.date_made} - ${form.filename}`,
        path: form.file_path,
        value: form.id_evaluation,
      }));
      this.setState({ formList, formSelected: null });
      this.loading(false); 
    }
  }

  handleChange(value) {
    this.setState({
      formSelected: value,
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
            {this.props.label}
            <Select
              options={this.state.formList}
              value={this.state.formSelected}
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
