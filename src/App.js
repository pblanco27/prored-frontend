import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import RegistroVinculado from './components/RegistroVinculado/RegistroVinculado';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Menu />
      <RegistroVinculado />
      <Footer />
    </div>
  );
}

export default App;
