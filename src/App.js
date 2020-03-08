import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Registro from './components/Registro';

function App() {
  return (
    <div>
      <Navbar />
      <Menu />
      <Registro/>
      <Footer />
    </div>
  );
}

export default App;
