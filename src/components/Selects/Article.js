import React, { Component } from "react";
import { API } from "../../services/env";
import axios from "axios";
import Select from "./Select";
import { loading } from "./disable";

export default class SelectArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      articleSelected: null,
      config: {
        name: "selectArticle",
        isMulti: false,
        isLoading: true,
        placeholder: "Seleccione uno",
        noOptionsMessage: () => `No hay opciones`,
      },
    };

    //bind
    this.getArticles = this.getArticles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loading = loading.bind(this);
  }

  componentDidMount() {
    this.getArticles();
  }

  async getArticles() {
    this.loading();
    const res = await axios.get(`${API}/article/project/${this.props.id_project}`);
    const articleData = res.data;
    const articleList = articleData.map((article) => ({
      label: article.title ,
      value: article.id_article,
    }));
    this.setState({ articleList, articleSelected: null });
    this.loading(false);
  }

  handleChange(value) {
    this.setState({
      articleSelected: value,
    });
    if (this.props.handleChangeParent) {
      this.props.handleChangeParent(value);
    }
  }

  render() {
    return (
      <div className="item">
        <div className="item-content">
          <div className="select">
            <Select
              options={this.state.articleList}
              value={this.state.articleSelected}
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
