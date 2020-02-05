import React, { Component } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import '../assets/css/inicio.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import auth from "../auth.js";
import Inicio from './Inicio';
import Contactanos from './Contactanos';
import Datos from './Datos';
import Nosotros from './Nosotros';
import Login from './users/Login';
import Register from './users/Register';
import Profile from './users/Profile'
import Desarrolladores from './Desarrolladores';
import Observacion from './Observacion';
import Admin from './admin/Admin';
import ProtectedRoute from '../protectedRoute';

class Layout extends Component {
  //static displayName = Layout.name;
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {
      logueado: false,
      typeAdmin: false,
      userName: '',
      firstName: '',
      lastName: '',
      type: '',
      tokenId: ''
    }
  }

  callBackLogin(reciveUserName, reciveType) {
    // the event context comes from the Child
    this.setState({userName: reciveUserName, tipo: reciveType, logueado: true})
    if(reciveType === 'admin')
      this.setState({typeAdmin: true})
  }

  callBackLogout(reciveUserName, reciveType) {
    // the event context comes from the Child
    this.setState({userName: reciveUserName, tipo: reciveType, logueado: false, typeAdmin: false})
  }

  componentDidMount() {
    if(auth.isAuthenticated())
      this.setState({logueado: true})

    if(localStorage.getItem('typeUser') === 'admin')
      this.setState({typeAdmin: true})    
  }

  render () {
    return (
      <>
        <Router>
          {/* Los link en Header y Footer obligan a tener todo dentro de Router */}
          <Header logueado = {this.state.logueado} typeUser = {this.state.typeAdmin} reciveState = {this.callBackLogout.bind(this)}/>
            {/* Y Router obliga a tener todos los Route dentro de una sola componente o grupo en este caso sección  */}
            {/* En otro caso podria estar todo esto en en index.js excepto header y footer, así la componente se 
            recibia por props como {this.props.children} */}
            <section>
              <Route exact path='/' component={Inicio}/>
              <Route path='/datos' component={Datos} />
              <Route path='/contactanos' component={Contactanos} />
              <Route path='/nosotros' component={Nosotros} />
              <Route exact path='/login' render = {(props) => <Login {...props} reciveState = {this.callBackLogin.bind(this)}/>}/>
              <Route path='/register' component={Register}/>
              <Route path='/desarrolladores' component={Desarrolladores}/>

              <ProtectedRoute exact path='/observacion' component={Observacion} />
              <ProtectedRoute exact path='/profile/' component={Profile}/>
              <ProtectedRoute exact path="/admin" component={Admin} />
              
              <Route path="/error" component={() => "404 NOT FOUND"} />
            </section>
          
          <Footer/>
        </Router>
      </>
    );
  }
}

export default Layout;