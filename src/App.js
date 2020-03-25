import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import MenuApp from './components/Menu/MenuApp';
import Home from './components/Home/Home';
import VerVinculado from './components/VerVinculado/VerVinculado'
import RegistroVinculado from './components/RegistroVinculado/RegistroVinculado';
import InfoGestion from './components/InfoGestion/InfoGestion'
// import RegistroProyecto from './components/RegistroProyecto/RegistroProyecto';
// import EditarProyecto from './components/EditarProyecto/EditarProyecto';
// import AgregarEvidenciaProyecto from './components/AgregarEvidenciaProyecto/AgregarEvidenciaProyecto'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
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
          {/* <Route path="/registroProyecto">
            <RegistroProyecto />
          </Route>
          <Route path="/editarProyecto">
            <EditarProyecto />
          </Route>
          <Route path="/agregarEvidenciaProyecto">
            <AgregarEvidenciaProyecto />
          </Route> */}
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
