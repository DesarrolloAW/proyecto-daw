import React from 'react';

import classnames from 'classnames'
import {Container, Col, Row, Card, CardBody, TabContent, TabPane, PaginationItem, PaginationLink, Pagination, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Table} from 'reactstrap';
import Estacion from './Estacion';
import StepperUsuario from './StepperUsuario';

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';


class Admin extends React.Component{
    constructor(args){
        super(args);
        this.state = {
            stepsEnabled: false, // para que comience de arranque
            initialStep: 0,
            steps: [
                {
                    element: '#tituloAdmin',
                    intro: 'Panel de control de admin permitirá algunas caracteristicas.',
                },
                {
                    element: '#tituloUsuariosAdmin',
                    intro: 'Aquí se podrá modificar el tipo de usuario de cada uno de los registrados.',
                },
                {
                    element: '#ModificarEstacionAdmin',
                    intro: 'Aqui se realiza las modificaciónes a las estaciones previamente creadas.',
                },
                {
                    element: '#RegistarEstacionAdmin',
                    intro: 'Aquí se permite registrar una nueva estación.',
                },
                {
                    element: '#ResumenesAdmin',
                    intro: 'Se presenta graficas estadisticas de usos de la página.',
                },
            ],
            hintsEnabled: true,
            hints: [
                {
                element: '#tituloAdmin',
                hint: 'Panel de control de admin permitirá algunas caracteristicas.',
                hintPosition: 'middle-right',
                }
            ],
            tabs: 1,
        };
    }

    onExit(e){
        this.setState(() => ({ stepsEnabled: false }));
    };
    intro(e){
        this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }) );
    };

    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            tabs: index
        });
    };

    render(){
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;

        return(
            <>
                <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={this.onExit.bind(this)}
                />
                <Hints
                enabled={hintsEnabled}
                hints={hints}
                />

                <div className="position-relative">
                    <section className="section pb-0 bg-gradient-warning">
                        {/* Circles background */}
                        <Container>
                            <Row className="row-grid align-items-center mt-5">
                                {/* Panel Izquierdo */}
                                <Col className="order-lg-1" lg="3" md="4">
                                    <div className="d-flex px-3" id="tituloAdmin">
                                        <div>
                                            <div className="icon icon-md icon-shape bg-gradient-white shadow rounded-circle text-primary">
                                                <i className="ni ni-building colorTitle" />
                                            </div>
                                        </div>

                                        <div className="d-flex pl-2">
                                            <h5 className="display-5 colorTitle">Panel de Control</h5>
                                            <i className="fa fa-question-circle fa-lg ml-2 colorTitle" onClick={this.intro.bind(this)} aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <Card className="shadow shadow-lg--hover mt-2 cardLeft">
                                        <CardBody id="tituloUsuariosAdmin">
                                            <div className="d-flex px-0">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                                        <i className="ni ni-badge" />
                                                    </div>
                                                </div>

                                                <div className="pl-2">
                                                    <a className="text-success" href="#pablo" onClick={e => this.toggleNavs(e, 1)} role="tab">
                                                    Modificar Usuarios
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>

                                        <CardBody id="ModificarEstacionAdmin">
                                            <div className="d-flex px-0">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                                        <i className="ni ni-ui-04" />
                                                    </div>
                                                </div>
                                                
                                                <div className="pl-2">
                                                    <a className="text-primary" href="#pablo" onClick={e => this.toggleNavs(e, 3)}>
                                                        Modificar Estación
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>

                                        <CardBody id="RegistarEstacionAdmin">
                                            <div className="d-flex px-0">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                                        <i className="ni ni-active-40" />
                                                    </div>
                                                </div>
                                                
                                                <div className="pl-2">
                                                    <a className="text-warning" href="#pablo" onClick={e => this.toggleNavs(e, 2)}>
                                                        Registrar Estación
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>

                                        <CardBody id="ResumenesAdmin">
                                            <div className="d-flex px-0">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                                                        <i className="ni ni-chart-pie-35" />
                                                    </div>
                                                </div>
                                                
                                                <div className="pl-2">
                                                    <a className="text-info" href="#pablo" onClick={e => this.toggleNavs(e, 4)}>
                                                        Resumenes
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            
                                {/* Panel Derecho */}
                                <Col className="order-lg-2 ml-lg-auto" lg="9" md="8">
                                    <div className="position-relative pl-lg-5">
                                        <TabContent activeTab={"tabs" + this.state.tabs}>
                                            {/* Modificar Usuarios */}
                                            <TabPane tabId="tabs1">
                                                <StepperUsuario/>
                                            </TabPane>
                                            
                                            {/* Resgistrar estacion */}
                                            <TabPane tabId="tabs2">
                                                <Estacion/>
                                            </TabPane>
                                            
                                            {/* Modificar estaciones */}
                                            <TabPane tabId="tabs3">
                                                <div id="cuadroEstaciones">
                                                    <FormGroup>
                                                        <InputGroup className={classnames( "input-group-alternative mb-4", {focused: this.state.searchFocused})}>
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="fa fa-search" aria-hidden="true"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input className="form-control-alternative" placeholder="Buscar usuarios" type="text"
                                                            onFocus={e => this.setState({ searchFocused: true })}  
                                                            onBlur={e => this.setState({ searchFocused: false })}
                                                            
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>

                                                    <Table responsive hover size="sm">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th scope="col">Id</th>
                                                                <th scope="col">Nombre</th>
                                                                <th scope="col">Latitud</th>
                                                                <th scope="col">Longitud</th>
                                                                <th scope="col" className="text-center">Ver</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody id="tabla" style={{background: 'white'}}>
                                                            <tr key={"row"}>
                                                                <th scope="row">{parseInt('1',10)}</th>
                                                                <td>Estación 1 (Olón)</td>
                                                                <td>-0.23213</td>
                                                                <td>11.23123</td>
                                                                <td className="text-center"><i className="fa fa-eye" aria-hidden="true"></i></td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                    <p id="total"/>
                                                    
                                                    <nav aria-label="Page navigation example">
                                                        <Pagination className="pagination justify-content-center" listClassName="justify-content-center" >
                                                            <PaginationItem className="disabled">
                                                                <PaginationLink href="/" onClick={e => e.preventDefault()} tabIndex="-1" >
                                                                    <i className="fa fa-angle-left" />
                                                                    <span className="sr-only">Previous</span>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                            
                                                            <PaginationItem className="active">
                                                                <PaginationLink href="#/" onClick={e => e.preventDefault()}>
                                                                    1
                                                                </PaginationLink>
                                                            </PaginationItem>

                                                            <PaginationItem>
                                                                <PaginationLink href="/" onClick={e => e.preventDefault()}>
                                                                    2
                                                                </PaginationLink>
                                                            </PaginationItem>

                                                            <PaginationItem>
                                                                <PaginationLink href="/" onClick={e => e.preventDefault()}>
                                                                    <i className="fa fa-angle-right" />
                                                                    <span className="sr-only">Next</span>
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        </Pagination>
                                                    </nav>
                                                </div>
                                            </TabPane>
                                        
                                            <TabPane tabId="tabs4">
                                                <div className="row" >
                                                    Cuarto
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </Col>

                            </Row>
                        </Container>

                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew ">
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
                                <polygon className="fill-white" points="2560 0 0 100 0 100" />
                            </svg>
                        </div>   
                    </section>
                </div>
                
            </>
        );
    }
}

export default Admin;