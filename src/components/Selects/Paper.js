import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperList: [],
      paperSelected: null,
      config: {
        name: "selectPaper",
        isMulti: false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getPapers = this.getPapers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getPapers();
  }

  async getPapers() {
    this.loading();
    const res = await axios.get(`${API}/paper/project/${this.props.id_project}`);
    const papers = res.data;
    const paperList = papers.map((paper) => ({
      label: `${paper.paper_name} (${paper.speaker})`,
      value: paper.id_paper,
    }));
    this.setState({ paperList, paperSelected: null });
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      paperSelected: value,
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
              options={this.state.paperList}
              value={this.state.paperSelected}
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
