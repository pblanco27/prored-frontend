import React from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import BusquedaNombre from './components/BusquedaNombre/BusquedaNombre'
import RegistroVinculado from "./components/RegistroVinculado/RegistroVinculado";
import InfoGestion from "./components/InfoGestion/InfoGestion";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <NavbarUned />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/verVinculado">
          <BusquedaNombre />
        </Route>
        <Route path="/registroVinculado">
          <RegistroVinculado />
        </Route>
        <Route path="/gestionInformacion">
          <InfoGestion />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
