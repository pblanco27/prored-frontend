import React, { Component } from "react";
import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";
import SelectActivity from "../Selects/Activity";
import { Link } from "react-router-dom";

/**
 * * Componente para visualización y edición de la info de los vinculados
 */
export default class SearchProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity_select_key: 1,
    };

    //bind
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.loadActivity = this.loadActivity.bind(this);

    //ref
    this.activitySelect = React.createRef();
  }

  componentDidMount() {
    if (this.props.match.params.id_activity) {
      this.loadActivity(this.props.match.params.id_activity);
    }
  }

  async loadActivity(id_activity) {
    const res = await axios.get(`${API}/activity/${id_activity}`);
    const activity = res.data;
    if (activity) {
      this.activitySelect.current.setActivity({
        label: activity.name,
        value: activity.id_activity,
      });
    } else {
      await this.props.history.push(`/buscar-actividad`);
    }
  }

  async handleActivityChange(activity) {
    if (activity) {
      await this.props.history.push(`/buscar-actividad/${activity.value}`);
    } else {
      await this.props.history.push(`/buscar-actividad/`);
    }
  }

  render() {
    return (
      <div className="searchProject">
        <div className="my-container">
          <header>
            <h4>Buscar Actividad</h4>
          </header>
          <center>
            A continuación puede buscar una actividad por su nombre
          </center>
          <div className="searchProject__content">
            <div className="searchProject__content-select">
              <SelectActivity
                handleChangeActivity={this.handleActivityChange}
                ref={this.activitySelect}
                key={this.state.activity_select_key}
              />
            </div>
            {this.props.match.params.id_activity && (
              <div className="searchProject__content-btns">
                <Link
                  className="btn btn-info"
                  to={`/ver-actividad/${this.props.match.params.id_activity}`}
                >
                  <i className="fas fa-search"></i>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
