import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import ManageInfo from "./components/ManageInfo/ManageInfo";
import Footer from "./components/Footer/Footer";
import LinkedStudent from "./components/LinkedStudent/LinkedStudent";
import SearchByName from "./components/SearchByName/SearchByName";
import Project from "./components/Project/Project";
import SearchProject from "./components/SearchProject/SearchProject";

import ScrollTop from "./components/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

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
          path={`/buscar-vinculado/:dni?`}
          render={(routeProps) => {
            return <SearchByName {...routeProps} />;
          }}
        />

        <Route
          path={`/registrar-estudiante`}
          render={(routeProps) => {
            return <LinkedStudent {...routeProps} />;
          }}
        />

        <Route
          path={`/buscar-proyecto/:id_project?`}
          render={(routeProps) => {
            return <SearchProject {...routeProps} />;
          }}
        />

        <Route
          path={`/crear-proyecto`}
          render={(routeProps) => {
            return <Project {...routeProps} />;
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
