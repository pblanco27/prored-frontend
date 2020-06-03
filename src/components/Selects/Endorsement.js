import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";
import CreateEndorsement from "../Modal/CreateEndorsement";

export default class Endoresement extends Component {
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
    const res = await axios.get(`${API}/student_all`);
    const personData = res.data;
    const endorsementList = personData.map((person) => ({
      label: person.name + " " + person.lastname1 + " " + person.lastname2,
      value: person.dni,
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
      <div className={"item"}>
        <label htmlFor={this.state.config.name}>{this.props.label}</label>
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.endorsementList}
              value={this.state.endorsementSelected}
              onChange={this.handleChange}
              config={this.state.config}
              isDisabled={this.props.disable ? true : false}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger"
            // onClick={}
            disabled={this.props.disable}
          >
            <i className="fas fa-trash"></i>
          </button>
          <CreateEndorsement disable={this.props.disable} />
        </div>
      </div>
    );
  }
}
