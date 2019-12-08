import React from 'react'
// reactstrap components
import { Card, Container, Row, Col, Button, Table, Pagination, PaginationItem, PaginationLink,} from "reactstrap";
import perfil from '../../assets/img/team-4-800x800.jpg'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {observaciones : {},}
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

        fetch('https://cip-rrd.herokuapp.com/observaciones')
        .then(res => res.json())
        .then(res => this.setState({observaciones: res}))
        .catch(() => this.setState({ observaciones: {} }));
        
    }

    render(){
        let observaciones = this.state.observaciones;
        const id = this.props.id;
        const nombre = this.props.nombre;
        const apellido = this.props.apellido;

        return(
            <main className="profile-page" ref="main">
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    {/* SVG separator */}
                    <div className="separator separator-bottom separator-skew">
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
                            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </section>
                
                <section className="section">
                    <Container>
                        <Card className="card-profile shadow mt--300">
                            <div className="px-4">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="6">
                                        <div className="card-profile-image">
                                            <a href="#ssam" onClick={e => e.preventDefault()}>
                                                <img alt="perfil" className="rounded-circle" src={perfil} />
                                            </a>
                                        </div>
                                    </Col>
                                    <Col className="order-lg-3 text-lg-right align-self-lg-center" lg="10" >
                                        <div className="card-profile-actions py-5 mt-lg-0">
                                            <Button className="float-right"  href="#ssam" onClick={e => e.preventDefault()} size="sm" >
                                                Editar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                
                                <div className="text-center mt-5">
                                    <h3>
                                        {id} | {nombre} {apellido}
                                    </h3>
                                    <div className="h6 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        Ciudad, Pais
                                    </div>
                                    <div className="h6 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        Email
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        Institución
                                    </div>
                                </div>
                                
                                <div className="mt-5 py-5 border-top text-center">
                                    <Row className="justify-content-center">
                                        <Col lg="10">
                                            <h6 className="colorTitle">Observaciones</h6>
                                            <Table responsive hover size="sm">
                                                <thead className="thead-dark">
                                                    <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Observador</th>
                                                    <th scope="col">Fase Lunar</th>
                                                    <th scope="col">Época</th>
                                                    <th scope="col">Estación</th>
                                                    <th scope="col" className="text-center">Cant. mediciones</th>
                                                    <th scope="col" className="text-right">Revisión</th>
                                                    </tr>
                                                </thead>

                                                <tbody id="tabla">
                                                    { Object.keys(observaciones).map(k => {
                                                        if(observaciones[k].observador.localeCompare('Steven Araujo') === 0)
                                                            return(  <tr key={"row" + k}>
                                                                        <th scope="row">{parseInt(k,10)+1}</th>
                                                                        <td>{observaciones[k].observador}</td>
                                                                        <td>{observaciones[k].fase_lunar}</td>
                                                                        <td>{'Verano'}</td>
                                                                        <td>{observaciones[k].estacion.nombre}</td>
                                                                        <td className="text-center">{observaciones[k].mediciones.length}</td>
                                                                        <td className="text-right">{parseInt(k,10)%2 === 0 ? 'True': 'False'}</td>
                                                                    </tr>
                                                            )
                                                        else
                                                            return ''
                                                    })
                                                    }
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
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Container>
                </section>
            </main>
        );
    }
}

export default Profile;