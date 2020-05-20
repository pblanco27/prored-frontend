import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import BusquedaNombre from "./components/BusquedaNombre/BusquedaNombre";
import ManageInfo from "./components/ManageInfo/ManageInfo";
import Footer from "./components/Footer/Footer";
import Linked from "./components/Linked/Linked";

function App() {
  return (
    <Fragment>
      <NavbarUned />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/verVinculado">
          <BusquedaNombre />
        </Route>

        <Route
          path={`/registrar-estudiante`}
          render={(routeProps) => {
            return <Linked {...routeProps} />;
          }}
        />

        <Route path="/gestion-informacion">
          <ManageInfo />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;
