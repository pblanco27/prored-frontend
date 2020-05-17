import React, { Component } from "react";
import LinkedSection from "./LinkedSection";
import { Switch, Route } from "react-router-dom";
import { handleSimpleInputChange } from "../../helpers/Handles";
import PersonalInformation from "./PersonalInformation";
import AcademicInformation from "./AcademicInformation";
export default class Linked extends Component {
  constructor() {
    super();
    this.state = {
      linkedType: "",
      profile: "",
      resident: true,
      dni: "",
      name: "",
      lastname1: "",
      lastname2: "",
      born_date: "",
      id_district: "",
      marital_status: "",
      campus_code: "",
      address: "",
      nationality: "",
      careers: [],
      languages: [],
      networks: [],
      associated_careers: [],
    };
    this.handleChange = handleSimpleInputChange.bind(this);
  }

  render() {
    let { path } = this.props.match;

    return (
      <div>
        <LinkedSection
          handleChange={this.handleChange}
          history={this.props.history}
          match={this.props.match}
        />
        <Switch>
          <Route path={`${path}/investigador`}>
            <h1>Investigador</h1>
          </Route>
          <Route path={`${path}/estudiante`}>
            {this.state.profile !== "" && (
              <>
                <PersonalInformation
                  handleChange={this.handleChange}
                  {...this.state}
                />
                <AcademicInformation {...this.state} />
              </>
            )}
          </Route>
        </Switch>
      </div>
    );
  }
}
