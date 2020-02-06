import React from 'react'
// reactstrap components
import { Card, Container, Row, Col, Button, Table, Pagination, PaginationItem, PaginationLink,} from "reactstrap";
import perfil from '../../assets/img/team-4-800x800.jpg'
import DeleteIcon from '@material-ui/icons/Delete';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            observaciones : {},
            nombre: '',
            apellido: '',
            idUser: 0,
            email: '',
            institucion: '',
            provincia: '',
        }
        this.deleteObs = this.deleteObs.bind(this);
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

        let url = 'http://127.0.0.1:8000/misobs/?username='+this.props.match.params.userName
        fetch(url)
        .then(res => res.text())
        .then(res =>  {
            let resp = JSON.parse(res)
            this.setState({observaciones: resp})
        })
        .catch(() => this.setState({ observaciones: {} }));

        fetch('http://127.0.0.1:8000/get_usuario/?username='+this.props.match.params.userName)
        .then(res => res.json())
        .then(
            res => {
                this.setState(
                { nombre: res.nombre,
                apellido: res.apellido, 
                email:res.email,
                user:res.user,
                idUser:res.id,
                institucion:res.institucion
                })
            
        
        })
        .catch(() => this.setState({}));
       
        this.setState({
            provincia: 'Guayas'
        })
    }
    
    deleteObs(idObservacion){
        const username = this.props.match.params.userName;
        var result = window.confirm("Desea eliminar esta observación?");
        if(result){
            fetch("http://localhost:8000/borrar_observacion/",
            {
                method: 'DELETE',
                body: JSON.stringify(
                    {id: idObservacion,
                     username:this.props.match.params.userName,    
                    })
            })
            .then(res => res.text())
            .then(res => window.location.replace("http://localhost:3000/profile/"+this.props.match.params.userName));
        }
    }

    render(){
        const username = this.props.match.params.userName;
        const { observaciones, nombre, apellido, idUser, email, institucion, provincia } = this.state;

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
                                        {idUser} | {nombre} {apellido} | {username}
                                    </h3>
                                    <div className="h6 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        {provincia}
                                    </div>
                                    <div className="h6 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        {email}
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        {institucion}
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
                                                    <th scope="col" className="text-center">Revisión</th>
                                                    <th scope="col" className="text-right">Delete</th>
                                                    </tr>
                                                </thead>

                                                <tbody id="tabla">
                                                    { Object.keys(observaciones).map(k => {
                                                        return(     <tr key={"row" + k}>
                                                                        <th scope="row">{parseInt(k,10)}</th>
                                                                        <td>{observaciones[k].observador}</td>
                                                                        <td>{observaciones[k].fase_lunar}</td>
                                                                        <td>{observaciones[k].epoca}</td>
                                                                        <td>{observaciones[k].estacion.nombre}</td>
                                                                        <td className="text-center">{observaciones[k].mediciones.length}</td>
                                                                        <td className="text-center">{observaciones[k].estado}</td>
                                                                        <td className="text-right"> 
                                                                            <Button size="sm" onClick={() => this.deleteObs(parseInt(k,10))} value={parseInt(k,10)} >
                                                                                <DeleteIcon/>
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                            )
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