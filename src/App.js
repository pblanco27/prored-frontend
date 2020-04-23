import React from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import MenuApp from "./components/Menu/MenuApp";
import Home from "./components/Home/Home";
import VerVinculado from "./components/VerVinculado/VerVinculado";
import RegistroVinculado from "./components/RegistroVinculado/RegistroVinculado";
import InfoGestion from "./components/InfoGestion/InfoGestion";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <NavbarUned />
      <MenuApp />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/verVinculado">
          <VerVinculado />
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
