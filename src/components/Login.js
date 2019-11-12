import React from "react";

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
  Col
} from "reactstrap";


class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <hr/>
        <Container>
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
                            <CardHeader className="bg-white pb-5">
                                <div className="text-muted text-center mb-3">
                                    <h3>Inicio de sesion</h3>
                                </div>  
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email" type="email" />
                                    </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="off"
                                        />
                                    </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id=" customCheckLogin"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor=" customCheckLogin"
                                    >
                                        <span>Recuerdame</span>
                                    </label>
                                    </div>
                                    <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                    >
                                        Inicio
                                    </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Forgot password?</small>
                            </a>
                            </Col>
                            <Col className="text-right" xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Create new account</small>
                            </a>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    </Container>
                </section>
            </main>
        </Container>
      </>
    );
  }
}

export default Login;