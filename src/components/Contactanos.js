import React from 'react'
import '../assets/css/contactanos.css'
import logo from '../assets/img/logos/barco6x6.svg'
import classnames from 'classnames';
import auth from "../auth";
//import { SnackbarProvider, useSnackbar } from 'notistack';

import {
  Input,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  FormGroup,
  Button,
  CardBody,
  Card,
  Col,
  Row,
} from "reactstrap";

class Contactanos extends React.Component {
    constructor(args){
        super(args);
        this.state = {name: '', lastname: '', mail: '', subject: ''}

        this.nameChange = this.nameChange.bind(this);
        this.lastnameChange = this.lastnameChange.bind(this);
        this.subjectChange = this.subjectChange.bind(this);
        this.mailChange = this.mailChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    nameChange(e) {
      this.setState({name: e.target.value});
    }
    lastnameChange(e) {
      this.setState({lastname: e.target.value});
    }
    subjectChange(e) {
      this.setState({subject: e.target.value});
    }
    mailChange(e) {
      this.setState({mail: e.target.value});
    }
    
    //http://127.0.0.1:8000/sendEmail/
    sendEmail(e) {
      e.preventDefault();
      const data = new URLSearchParams("nombres="+this.state.name+" "+this.state.lastname);
      data.append('correo', this.state.mail);
      data.append('mensaje', this.state.subject);
      let currentComponent = this;
      
      fetch('http://127.0.0.1:8000/sendEmail/', {
        method: 'POST', // or 'PUT'
        body: data, // data can be `string` or {object}!
      }).then(function(response) {
        console.log(response.status)
        if(response.ok && response.status === 201 ) {
            console.log('OK')
            return response.text()
        } else {
            throw "Error en la llamada Ajax";
        }
      }).then(function(texto) {
          console.log(texto);

          auth.login(() => {
            currentComponent.props.history.push("/");
          });
      }).catch(function(err) {
          console.log(err);
      });
      //useSnackbar('This is a success message!', 'success');
      /*
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — check it out!
        </Alert>
      */
    }

    componentWillUnmount() {
      console.log('Desmontandos')
    }

    render(){
        return(
          <main ref="main">
            <section className="section section-lg bg-gradient-default">
              <div className="container">
                <h3 className="text-light">Contáctanos</h3>
                <Card className="bg-gradient-secondary shadow">
                  <Row>
                    <Col lg="6">
                      <CardBody className="p-lg-5">
                        <img className="mx-auto d-block" id="logologin" src={logo} alt="logo"/>
                        <p className="text-justify">Gracias por preferirnos estaremos gustosos de atender sus dudas y sugerencias.</p>
                      </CardBody>
                    </Col>

                    <Col lg="6">
                        <CardBody className="p-lg-5">
                          <FormGroup className={classnames("col-12", { focused: this.state.nameFocused })}>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-user-run" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Nombre" type="text" onFocus={e => this.setState({ nameFocused: true })} onBlur={e => this.setState({ nameFocused: false })} 
                              onChange={this.nameChange}/>
                            </InputGroup>
                          </FormGroup>

                          <FormGroup className={classnames("col-12", { focused: this.state.lastnameFocused })}>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-user-run" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Apellido" type="text" onFocus={e => this.setState({ lastnameFocused: true })} onBlur={e => this.setState({ lastnameFocused: false })} 
                              onChange={this.lastnameChange}/>
                            </InputGroup>
                          </FormGroup>

                          <FormGroup className={classnames("col-12", {focused: this.state.emailFocused})}>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Correo" type="email" onFocus={e => this.setState({ emailFocused: true })} onBlur={e => this.setState({ emailFocused: false })}
                              onChange={this.mailChange}/>
                            </InputGroup>
                          </FormGroup>

                          <FormGroup className={classnames( "col-12", {focused: this.state.placeFocused})}>
                            <InputGroup className="input-group-alternative">
                              
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-map-big" />
                                </InputGroupText>
                              </InputGroupAddon>

                              {/* 
                                <Input placeholder="Lugar de origen" type="text" 
                                onFocus={e => this.setState({ placeFocused: true })} 
                                onBlur={e => this.setState({ placeFocused: false })} 
                                valid/> 
                              */}
                              
                              <Input placeholder="Lugar de origen" type="select" name="select" onFocus={e => this.setState({ placeFocused: true })} onBlur={e => this.setState({ placeFocused: false })}>
                                <option value="">Lugar de origen</option>
                                <option>Ambato</option>
                                <option>Babahoyo</option>
                                <option>Chimborazo</option>
                                <option>Cuenca</option>
                                <option>Duran</option>
                                <option>Guayaquil</option>
                                <option>Milagro</option>
                                <option>Quito</option>
                                <option>Riobamba</option>
                                <option>Salinas</option>
                              </Input>

                            </InputGroup>
                          </FormGroup>

                          <FormGroup className="mb-4, col-12">
                            <Input className="form-control-alternative" cols="80" name="subject" placeholder="Detalle..." rows="4" type="textarea" 
                            onChange={this.subjectChange}/>
                          </FormGroup>
                          
                          <div className="col-12">
                            <Button block size="lg" type="button" onClick={this.sendEmail}>
                              Enviar
                            </Button>
                          </div>
                        </CardBody>
                    </Col>
                    
                    
                  </Row>
                </Card>
                  
                  {/*
                <SnackbarProvider maxSnack={3}>
                  
                </SnackbarProvider>
                */
                }

              </div>

              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew zindex-100">
                  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
                      <polygon className="fill-white" points="2560 0 2560 100 0 100" />
                  </svg>
              </div>   
            </section>
          </main>
        );
    }
}

export default Contactanos;