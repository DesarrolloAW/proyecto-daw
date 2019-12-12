import React from "react";
import ReactDatetime from "react-datetime";
import classnames from 'classnames';
// reactstrap components
import {
  UncontrolledDropdown, 
  DropdownToggle,  
  DropdownMenu, 
  DropdownItem,
  Container,
  Row,
  Col,
  Input,
  InputGroupAddon,
  FormGroup,
  InputGroupText,
  InputGroup,

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
						
					</div>


					{/* SVG separator */}
					<div className="separator separator-bottom separator-skew zindex-100">
						<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
							<polygon className="fill-white" points="2560 0 2560 100 0 100" />
						</svg>
					</div>  
				</section>
				<section>
					<div className="mx-auto row">
					<Container>
					<Row>
						<Col xs="auto">Fecha de Observacion</Col>
						</Row>
						<Row>
						<Col xs="auto">
							<FormGroup>
                                <InputGroup className={classnames("input-group-alternative", { focused: this.state.fechaInicioFocused })}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                             <i className="ni ni-calendar-grid-30" />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                            <ReactDatetime
                                                inputProps={{ placeholder: "Date Picker Here" }}
                                                timeFormat={false}
                                                renderDay={(props, currentDate, selectedDate) => {
                                                let classes = props.className;
                                                if (this.state.startDate && this.state.endDate && this.state.startDate._d + "" === currentDate._d + "") {
                                                    classes += " start-date";
                                                } else if (this.state.startDate && this.state.endDate && new Date(this.state.startDate._d + "") < new Date(currentDate._d + "") && new Date(this.state.endDate._d + "") > new Date(currentDate._d + "")) {
                                                    classes += " middle-date";
                                                } else if (this.state.endDate && this.state.endDate._d + "" === currentDate._d + "") {
                                                    classes += " end-date";
                                                }
                                                return (
                                                    <td {...props} className={classes}>
                                                    	{currentDate.date()}
                                                    </td>
                                                );
                                                }}
                                            	onChange={e => this.setState({ startDate: e })}
                                                onFocus={e => this.setState({ fechaInicioFocused: true })}
                                                onBlur={e => this.setState({ fechaInicioFocused: false })}
                                                />
                                 </InputGroup>
                            </FormGroup>
						</Col>
						</Row>
						<Row>
						<Col  xs="3">Ubicación</Col>
						</Row>
						<Row>
						<Col  xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga Provincia</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Esmeraldas</DropdownItem>
						<DropdownItem>El Oro</DropdownItem>
						<DropdownItem>Guayas</DropdownItem>
						<DropdownItem>Manabí</DropdownItem>
						<DropdownItem>Santa Elena</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col  xs="auto"><UncontrolledDropdown>
						<DropdownToggle caret>Escoga Canton</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Guayaquil</DropdownItem>
						<DropdownItem>Durán</DropdownItem>
						<DropdownItem>Milagro</DropdownItem>
						<DropdownItem>Santa Elena</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col  xs="auto"><UncontrolledDropdown>
							<DropdownToggle caret>Escoga Ciudad</DropdownToggle>
							<DropdownMenu>
							<DropdownItem>Guayaquil</DropdownItem>
							<DropdownItem>Durán</DropdownItem>
							<DropdownItem>Milagro</DropdownItem>
							<DropdownItem>Santa Elena</DropdownItem>
							</DropdownMenu>
							</UncontrolledDropdown>
						</Col>
						</Row>
						<Row>
						<Col xs="auto">Estación</Col>
						</Row>
						<Row>
						<Col xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga una Estacion</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Estación 1</DropdownItem>
						<DropdownItem>Estación 2</DropdownItem>
						<DropdownItem>Estación 3</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						</Row>
						<Row>
						<Col xs="3">Temporada</Col>
						</Row>
						<Row>
						<Col xs="auto">
						<UncontrolledDropdown>
						<DropdownToggle caret>Escoga Fase Lunar</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Sicigia</DropdownItem>
						<DropdownItem>Cuadratura</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						<Col xs="auto"><UncontrolledDropdown>
						<DropdownToggle caret>Escoga epoca</DropdownToggle>
						<DropdownMenu>
						<DropdownItem>Invierno</DropdownItem>
						<DropdownItem>Verano</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
						</Col>
						</Row>
						
						<br/>
					</Container>
					</div>
				</section>
			</main>
		)
    }
}

export default Observacion;