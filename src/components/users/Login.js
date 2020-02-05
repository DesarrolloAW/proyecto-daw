import React from "react";
import logo from '../../assets/img/logos/barco6x6.svg';
import FaceIcon from '@material-ui/icons/Face';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import '../../assets/css/login.css';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import auth from "../../auth";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavLink,
} from "reactstrap";

class Login extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            user: '', 
            pass: '',
            anyUser: false,
            anyPass: false,
            passWrong: false,
            loading: false,
        };
        this.loginAction = this.loginAction.bind(this);
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    userChange(e){
        this.setState({user: e.target.value, passWrong: false});
    }

    passwordChange(e){
        this.setState({pass: e.target.value, passWrong: false});
    }

    loginAction(e){
        e.preventDefault();

        if(this.state.user === '' || this.state.pass === ''){
            this.state.user === '' ? this.setState({anyUser: true}) : this.setState({anyUser: false});
            this.state.pass  === '' ? this.setState({anyPass: true})  : this.setState({anyPass: false});
        }
        else{
            this.setState({anyUser: false, anyPass: false, loading: true});

            let currentComponent = this;
            let url = new URL("http://127.0.0.1:8000/login/");
            //http://127.0.0.1:8000/login/?user=female&pass=US
            //const params = {user: this.state.user, pass: this.state.pass};
            // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            /*
            fetch(url, {method: 'GET'}).then(function(response) {
                console.log(response)
                
                if(response.ok) {
                    console.log('OK')
                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                } 
            })
            .then(function(texto) {
                console.log(texto);
            })
            .catch(function(err) {
                console.log(err);
            });
            */
            
            fetch(url, {
                credentials: "include",
                method: 'POST', // or 'PUT'
                body: JSON.stringify({username:this.state.user, password:this.state.pass}),// data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                console.log(response.status, response.status === 201 )
                if(response.ok) {
                    console.log('OK')
                    //currentComponent.setState({redirect:true})

                    return response.text()
                } else {
                    throw "Error en la llamada Ajax";
                }
            }).then(function(texto) {
                console.log(texto);
                var jsonText = JSON.parse(texto);
                Cookies.set("tokenId", jsonText['tokenId'], { expires: 1});
                Cookies.set("typeUser", jsonText['typeUser'], { expires: 1});
                localStorage.setItem('typeUser', jsonText['typeUser']);

                

                currentComponent.props.reciveState(jsonText['username'], jsonText['typeUser']);

                auth.login(() => {
                    currentComponent.props.history.push("/");
                });
            }).catch(function(err) {
                console.log(err);
                currentComponent.setState({loading: false, passWrong: true})

            });
        }
    }
    

    render() {
        //if(this.state.redirect)
            //return <Redirect to='/'/>
        return (
            <main ref="main">
                <section className="section section-shaped section-lg">
                    <div className="shape shape-style-1 bg-gradient-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>

                    <Container className="pt-lg-md">
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-white pb-1">
                                        <div className="text-muted text-center mb-3">
                                            <h3 className="colorTitle">Inicio de sesión</h3>
                                            <img id="logologin" src={logo} alt="logo"/>
                                        </div>  
                                    </CardHeader>
                                    <CardBody className="px-lg-4 py-lg-5">
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText className="loginCuadro">
                                                            <FaceIcon/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Usuario" type="user" className="loginCuadro" onChange={this.userChange}/>
                                                </InputGroup>
                                                { this.state.anyUser &&
                                                    <div className="font-italic text-left">
                                                        <small>
                                                            <span className="text-failed font-weight-700">
                                                                Ingrese usuario.
                                                            </span>
                                                        </small>
                                                    </div>
                                                }
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText className="loginCuadro">
                                                            <HttpsOutlinedIcon/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Contraseña" type="password" autoComplete="off"className="loginCuadro" onChange={this.passwordChange}/>
                                                </InputGroup>
                                                { this.state.anyPass &&
                                                    <div className="font-italic text-left">
                                                        <small>
                                                            <span className="text-failed font-weight-700">
                                                                Ingrese contraseña.
                                                            </span>
                                                        </small>
                                                    </div>
                                                }
                                                { this.state.passWrong &&
                                                    <div className="font-italic text-left">
                                                        <small>
                                                            <span className="text-failed font-weight-700">
                                                            Contraseña incorrecta
                                                            </span>
                                                        </small>
                                                    </div>
                                                }
                                            </FormGroup>
                                            <div className="custom-control custom-control-alternative custom-checkbox text-left">
                                                <input className="custom-control-input" id="customCheckLogin" type="checkbox"/>
                                                <label className="custom-control-label" htmlFor="customCheckLogin">
                                                    <span>Recuerdame</span>
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <Button className="mt-3" type="button" onClick={this.loginAction} disabled={this.state.loading}>
                                                    Iniciar
                                                </Button>
                                            </div>         
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Row className="mt-3">
                                    <Col className="text-left" xs="6">
                                        <NavLink tag={Link} to="/recuperarcontrasena/" className="text-light"><small>Olvidó su contraseña?</small></NavLink>
                                    </Col>
                                    <Col className="text-right" xs="6">
                                        <NavLink tag={Link} to="/register/" className="text-light"><small>Crear nueva cuenta</small></NavLink>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <br/>
                    </Container>
                </section>
            </main>
    );
  }
}

export default Login;