import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

//import Layout from "./components/Layout";
import Layout from './components/Layout';
import Inicio from './components/Inicio';
import Contactanos from './components/Contactanos';
import Datos from './components/Datos';
import Nosotros from './components/Nosotros';


function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Route exact path='/' component={Inicio} />
          <Route path='/datos/' component={Datos} />
          <Route path='/contactanos/' component={Contactanos} />
          <Route path='/nosotros/' component={Nosotros} />
        </Layout>
      </Router>
    </div>

  );
}

export default App;
