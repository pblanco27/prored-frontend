import React, { Component } from "react";
import Endorsement from "../Selects/Endorsement";
import Article from "../Selects/Article";
import Paper from "../Selects/Paper";
import "./Document.css";

export default class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endorsement_selected: null,
      article_selected: null,
      paper_selected: null,
    };

    //bind
    this.handleEndorsementChange = this.handleEndorsementChange.bind(this);
    this.handleArticleChange = this.handleArticleChange.bind(this);
    this.handlePaperChange = this.handlePaperChange.bind(this);
  }

  handleEndorsementChange(event) {
    if (event) {
      const id_endorsement = event.value;
      this.setState({ endorsement_selected: id_endorsement });
    }
  }

  handleArticleChange(event) {
    if (event) {
      const id_article = event.value;
      this.setState({ article_selected: id_article });
    }
  }

  handlePaperChange(event) {
    if (event) {
      const id_paper = event.value;
      this.setState({ paper_selected: id_paper });
    }
  }

  render() {
    return (
      <div className="my-container">
        <header>
          <h4>Documentos</h4>
        </header>
        <center>Documentación asociada al proyecto</center>

        <div className="document__content">
          <div className="document__content-select">
            {this.props.project_type === "student" && (
              <Endorsement
                label="Aval (es)"
                handleChangeParent={this.handleEndorsementChange}
                disable={this.props.disable}
              />
            )}
            <Article
              label="Artículo (s)"
              handleChangeParent={this.handleArticleChange}
              disable={this.props.disable}
            />
            <Paper
              label="Ponencia (s)"
              handleChangeParent={this.handlePaperChange}
              disable={this.props.disable}
            />
          </div>
        </div>
      </div>
    );
  }
}
