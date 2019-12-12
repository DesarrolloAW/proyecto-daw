
import React from "react";
import '../../assets/css/login.css';
import {
    FormGroup,
    Form,
    Row,
    Label,
} from "reactstrap";
class FormUser extends React.Component {
    componentDidMount() {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;
    }
    render(){
        return(
            <main ref="main">
            <section className="section-shaped">
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
                <Form>
                    <h3 className="text-center colorTitle"><strong>Registro de Usuario</strong></h3>
                    <FormGroup>
                        <Row>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploNombre">Nombre</Label>
                                <input type="text" className="form-control" name="nombre" id="EjemploNombre" placeholder="Nombre" />
                                </FormGroup>
                            </div>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploApellido">Apellido</Label>
                                <input type="text" className="form-control" name="nombre" id="EjemploApellido" placeholder="Apellido" />   
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploOrganizacion">Organizacion</Label>
                                 <input type="text" className="form-control" name="nombre" id="EjemploOrganizacion" placeholder="Organizacion" />   
                                </FormGroup>
                            </div>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploTipo">Tipo de usuario</Label>
                                <input type="text" className="form-control" name="nombre" id="EjemploTipo" placeholder="Tipo de usuario" />   
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploLugar">Lugar</Label>
                                 <input type="text" className="form-control" name="nombre" id="EjemploLugar" placeholder="Lugar" />   
                                </FormGroup>
                            </div>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                <Label for="EjemploCorreo">Correo</Label>
                                <input type="text" className="form-control" name="nombre" id="EjemploCorreo" placeholder="Correo" />   
                                </FormGroup>
                            </div>
                        </Row>
                    </FormGroup>
                    
                    <p></p>
                    <p></p>
                    <p></p>
                </Form>
            </section>
        </main>



        )
    }
}
export default FormUser;