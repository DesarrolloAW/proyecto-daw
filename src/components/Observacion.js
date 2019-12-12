import React from "react";
// reactstrap components
import {
  UncontrolledDropdown, 
  DropdownToggle,  
  DropdownMenu, 
  DropdownItem,
  Container,
  Row,
  Col,
  Input
} from "reactstrap";

class Observacion extends React.Component{
	constructor(args){
        super(args);
        this.state = {}
    }


    render(){
    	return(
			<main ref="main">
				<section className="section section-lg bg-gradient-default">
					<div className="container">
						<h3 className="text-light">Observaciones</h3>
						<Container>
						<Row>
						<Col  xs="3">Provincia</Col>
						<Col  xs="3">Canton</Col>
						<Col  xs="1">Parroquia</Col>
						</Row>
						<Row>
						<Col  xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga Provincia</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Provincia1</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col  xs="auto"><UncontrolledDropdown>
						<DropdownToggle caret>Escoga Canton</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Canton1</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col  xs="auto"><UncontrolledDropdown>
							<DropdownToggle caret>Escoga Ciudad</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>Ciudad1</DropdownItem>
							</DropdownMenu>
							</UncontrolledDropdown>
						</Col>
						</Row>
						<Row>
						<Col xs="auto">Estacion</Col>
						</Row>
						<Row>
						<Col xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga una Estacion</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Estacion1</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						</Row>
						<Row>
						<Col xs="3">Fase Lunar</Col>
						<Col xs="3">Epoca</Col>
						</Row>
						<Row>
						<Col xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga Fase Lunar</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Fase Lunar1</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col xs="auto"><UncontrolledDropdown>
						<DropdownToggle caret>Escoga epoca</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Canton1</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						</Row>
						<Row>
						<Col xs="auto">Fecha de Observacion</Col>
						</Row>
						<Row>
						<Col xs="auto">
						<Input type="Fecha" name="fecha" id="Fecha" placeholder="Ingrese la fecha" />
						</Col>
						</Row>
						<br/>
					</Container>
					</div>

					{/* SVG separator */}
					<div className="separator separator-bottom separator-skew zindex-100">
						<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
							<polygon className="fill-white" points="2560 0 2560 100 0 100" />
						</svg>
					</div>  
				</section>
			</main>
		)
    }
}

export default Observacion;