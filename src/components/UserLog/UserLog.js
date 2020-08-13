import React, { Component } from "react";
import { get_request } from "../../helpers/Request";
import $ from "jquery";

require("../../helpers/Pagination");

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
    $("#log_body").pageMe({
      pagerSelector: "#log_pager",
      showPrevNext: true,
      hidePageNumbers: false,
      perPage: 100,
    });
  }

  render() {
    const rows = this.state.logsList.map((r) => {
      return (
        <tr key={r.id_log}>
          <td>{r.date_made}</td>
          <td>{`${r.name} ${r.lastname1} ${r.lastname2}`}</td>
          <td>{r.email}</td>
          <td>{r.action}</td>
          <td>{r.table_name}</td>
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
            <div className="col-md-12 text-center">
              <ul
                className="pagination pagination-lg pager"
                id="log_pager"
              ></ul>
            </div>
            <table
              style={{ width: "95%" }}
              className="mx-auto table"
              id="myTable"
            >
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                  <th>Tabla</th>
                </tr>
              </thead>
              <tbody id="log_body">{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
