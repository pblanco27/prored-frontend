import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import ManageInfo from "./components/ManageInfo/ManageInfo";
import Footer from "./components/Footer/Footer";
import LinkedStudent from "./components/LinkedStudent/LinkedStudent";
import SearchStudent from "./components/SearchStudent/SearchStudent";
import Project from "./components/Project/Project";
import SearchProject from "./components/SearchProject/SearchProject";
import LinkedGantt from "./components/LinkedGantt/LinkedGantt";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Researcher from "./components/Researcher/Researcher";
import SearchResearcher from "./components/SearchResearcher/SearchResearcher";

import ProjectDocument from "./components/ProjectDocument/ProjectDocument";
import Activity from "./components/Activity/Activity";
import SearchActivity from "./components/SearchActivity/SearchActivity";

function App(props) {
  return (
    <Fragment>
      <NavbarUned />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route
          path={`/registrar-estudiante`}
          render={(routeProps) => {
            return <LinkedStudent {...routeProps} />;
          }}
        />
        <Route
          path={`/buscar-estudiante/:dni?`}
          render={(routeProps) => {
            return <SearchStudent {...routeProps} />;
          }}
        />

        <Route
          path={`/registrar-investigador`}
          render={(routeProps) => {
            return <Researcher {...routeProps} />;
          }}
        />
        <Route
          path={`/buscar-investigador/:dni?`}
          render={(routeProps) => {
            return <SearchResearcher {...routeProps} />;
          }}
        />

        <Route
          path={`/crear-proyecto`}
          render={(routeProps) => {
            return <Project {...routeProps} />;
          }}
        />

        <Route
          path={`/buscar-proyecto/:id_project?`}
          render={(routeProps) => {
            return <SearchProject {...routeProps} />;
          }}
        />

        <Route
          path={`/documentos-proyecto/:type/:id_project`}
          render={(routeProps) => {
            return <ProjectDocument {...routeProps} />;
          }}
        />
        <Route path={`/gantt`}>
          <LinkedGantt />
        </Route>

        <Route
          path={`/crear-actividad`}
          render={(routeProps) => {
            return <Activity {...routeProps} key={1} />;
          }}
        />

        <Route
          path={`/ver-actividad/:id_activity`}
          render={(routeProps) => {
            return <Activity {...routeProps} key={2} />;
          }}
        />

        <Route
          path={`/buscar-actividad/:id_activity?`}
          render={(routeProps) => {
            return <SearchActivity {...routeProps} />;
          }}
        />

        <Route path="/gestion-informacion">
          <ManageInfo />
        </Route>
      </Switch>
      <Footer />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="Ir arriba">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}

export default App;
