import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import SelectActivity from "../Selects/Activity";
import { Link } from "react-router-dom";

/**
 * * Componente para la búsqueda de una determinada actividad
 */
export default class SearchProject extends Component {
  _isMounted = false;

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
    this._isMounted = true;

    if (this.props.match.params.id_activity) {
      this.loadActivity(this.props.match.params.id_activity);
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async loadActivity(id_activity) {
    const res = await get_request(`activity/${id_activity}`);
    if (res.status) {
      const activity = res.data;
      if (activity && this._isMounted) {
        this.activitySelect.current.setActivity({
          label: activity.name,
          value: activity.id_activity,
        });
      } else {
        await this.props.history.push(`/buscar-actividad`);
      }
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
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Buscar Actividad</h4>
          </header>
          <center>
            A continuación puede buscar una actividad por su nombre
          </center>
          <div className="d-flex card-body px-4 justify-content-center align-items-center">
            <div className="w-75">
              <SelectActivity
                handleChangeActivity={this.handleActivityChange}
                ref={this.activitySelect}
                key={this.state.activity_select_key}
              />
            </div>
            {this.props.match.params.id_activity && (
              <Link
                className="btn btn-info"
                to={`/ver-actividad/${this.props.match.params.id_activity}`}
              >
                <i className="fas fa-search"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
