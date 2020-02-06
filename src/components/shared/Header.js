import React from 'react';
import { Link } from "react-router-dom";
//import SearchIcon from '@material-ui/icons/Search';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from '../../assets/img/logos/barco6x6.svg';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";


import auth from "../../auth";

import {
    //Button,
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    //UncontrolledTooltip,
  } from "reactstrap";


class Header extends React.Component{
    constructor(props){
        super(props);
        this.logoutAction = this.logoutAction.bind(this);
    }

    componentDidMount() {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    }

    logoutAction(e){
        console.log('cerrar sesión');
        auth.logout();
        this.props.reciveState('','');
    }

    //componentWillReceiveProps(next_props) {
    //    this.setState({ loading: true });
    //}

    render() {
        const admin = this.props.typeUser;
        const authUser = this.props.logueado;
        const username = localStorage.getItem('userName');

        return (
          <>
            <header className="header-global">
              <Navbar className="navbar-main navbar-transparent navbar-light headroom" expand="lg" id="navbar-main" >
                <Container>
                  <NavbarBrand className="mr-lg-5" id="contenedorlogoHeader" to="/" tag={Link}>
                    <img alt="logo" src={logo} id="logoHeader" />
                  </NavbarBrand>
                  
                  <button className="navbar-toggler" id="navbar_global">
                    <span className="navbar-toggler-icon" />
                  </button>
                  
                  <UncontrolledCollapse navbar toggler="#navbar_global">
                    <div className="navbar-collapse-header">
                        <Row>
                            {/* Imagen */}
                            <Col className="collapse-brand" xs="6">
                                <Link to="/">
                                    <img alt="Logo" src={logo} id="logoSubHeader" />
                                </Link>
                            </Col>
                            
                            {/* Boton de cerrado */}
                            <Col className="collapse-close" xs="6">
                                <button className="navbar-toggler" id="navbar_global">
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>

                    <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                        {/* Opciones del encabezado */}
                        <NavItem>
                            <NavLink tag={Link} to="/"  >
                                <i className="fa fa-home d-lg-none mr-1" />
                                <span className="nav-link-inner--text ">Inicio</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/datos/" className="Datos">
                                <i className="fa fa-line-chart d-lg-none mr-1" />
                                <span className="nav-link-inner--text">Datos</span>
                            </NavLink>
                        </NavItem>
                        { authUser &&
                            <NavItem>
                                <NavLink tag={Link} to="/observacion/" className="Observaciones">
                                    <i className="fa fa-sticky-note d-lg-none mr-1" />
                                    <span className="nav-link-inner--text">Observación</span>
                                </NavLink>
                            </NavItem>
                        }
                        <NavItem>
                            <NavLink tag={Link} to="/contactanos/" className="Contactanos">
                                <i className="fa fa-address-card d-lg-none mr-1" />
                                <span className="nav-link-inner--text">Contáctanos</span>
                            </NavLink>
                        </NavItem>
                        {/* Opciones de desplegables */}
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav caret className="Desplegable">
                                <i className="ni ni-circle-08" />
                            </DropdownToggle>
                            <DropdownMenu>
                                { authUser &&
                                    <DropdownItem to={`/profile/${username}`} tag={Link}>
                                        {username}
                                    </DropdownItem>
                                }
                                { !authUser && 
                                    <DropdownItem to="/login/" tag={Link}>
                                        Iniciar sesión
                                    </DropdownItem>
                                }
                                { !authUser && 
                                    <DropdownItem to="/register/" tag={Link}>
                                        Registrarse
                                    </DropdownItem>
                                }
                                { admin && 
                                    <DropdownItem to="/admin/" tag={Link}>
                                        DashBoard
                                    </DropdownItem>
                                }
                                { authUser &&
                                    <>
                                        <DropdownItem divider />
                                        <DropdownItem to="/" tag={Link} onClick={this.logoutAction}>
                                            Cerrar sesión
                                        </DropdownItem>
                                    </>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                
                </UncontrolledCollapse>
                </Container>
              </Navbar>
            </header>
          </>
        );
    }
}

export default Header;