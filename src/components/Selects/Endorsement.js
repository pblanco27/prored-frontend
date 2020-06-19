import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectEndorsement extends Component {
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
    this.getEndorsements();
  }

  async getEndorsements() {
    this.loading();
    // Cambiar esto para que se traiga los avales del proyecto
    const res = await axios.get(
      `${API}/endorsement/project/${this.props.id_project}`
    );
    const endorsementData = res.data;
    const endorsementList = endorsementData.map((endorsement) => ({
      label: `${endorsement.type} - ${endorsement.filename}`,
      value: endorsement.id_endorsement,
    }));
    this.setState({ endorsementList, endorsementSelected: null });
    this.loading(false);
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
