import React, { Component } from "react";
import { get_request } from "../../helpers/Request";

export default class UserLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logsList: [],
    };
  }

  componentDidMount() {
    this.getLogs();
  }

  async getLogs() {
    const res = await get_request(`logs`);
    if (res.status) {
      this.setState({ logsList: res.data });
    }
  }

  render() {
    const rows = this.state.logsList.map((r) => {
      return (
        <tr key={r.id_log}>
          <td>{r.date_made}</td>
          <td>{`${r.name} ${r.lastname1} ${r.lastname2}`}</td>
          <td>{r.email}</td>
          <td>{r.action}</td>
        </tr>
      );
    });
    return (
      <div className="container my-4">
        <div className="card">
          <header className="card-header text-center container-title">
            <h4>Bitácoras</h4>
          </header>
          <div className="card-body px-4 overflow-auto">
            <hr />
            <table style={{ width: "90%" }} className="mx-auto table">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
