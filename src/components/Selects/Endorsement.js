import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectEndorsement extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      endorsementList: [],
      endorsementSelected: null,
      config: {
        name: "selectEndorsement",
        isMulti: false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getEndorsements = this.getEndorsements.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getEndorsements();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getEndorsements() {
    this.loading();
    const res = await get_request(`endorsement/project/${this.props.id_project}`);
    if (res.status && this._isMounted) {
      const endorsementData = res.data;
      const endorsementList = endorsementData.map((endorsement) => ({
        label: `${endorsement.type} - ${endorsement.filename}`,
        value: endorsement.id_endorsement,
      }));
      this.setState({ endorsementList, endorsementSelected: null });
      this.loading(false); 
    }
  }

  handleChange(value) {
    this.setState({
      endorsementSelected: value,
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
              options={this.state.endorsementList}
              value={this.state.endorsementSelected}
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
