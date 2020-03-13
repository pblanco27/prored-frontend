import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import RegistroVinculado from './components/RegistroVinculado/RegistroVinculado';
import EditarVinculado from './components/EditarVinculado/EditarVinculado';
import DesactivarVinculado from './components/DesactivarVinculado/DesactivarVinculado';
import Proyecto from './components/Proyecto/Proyecto';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/registroVinculado">
            <RegistroVinculado />
          </Route>
          <Route path="/editarVinculado">
            <EditarVinculado />
          </Route>
          <Route path="/desactivarVinculado">
            <DesactivarVinculado />
          </Route>
          <Route path="/registroProyecto">
            <Proyecto />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
