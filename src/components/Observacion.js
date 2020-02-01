import React, { createRef } from "react";
import ReactDatetime from "react-datetime";
import classnames from 'classnames';
import "../assets/css/obs.css";
// reactstrap components
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu, 
	DropdownItem,
	Container,
	Row,
	Col,
	InputGroupAddon,
	FormGroup,
	InputGroupText,
	InputGroup,

} from "reactstrap";

class Observacion extends React.Component {
	constructor(args) {
		super(args);
		this.avarege=this.avarege.bind(this);
		this.avaregePeriodo=this.avaregePeriodo.bind(this);
		this.calcularVelocidad=this.calcularVelocidad.bind(this);
		this.calcularOrientacion=this.calcularOrientacion.bind(this);

		this.id1 = React.createRef();
		this.id2 = React.createRef();
		this.id3 = React.createRef();
		this.id4 = React.createRef();
		this.id5 = React.createRef();
		this.id6 = React.createRef();
		this.id7 = React.createRef();
		this.id8 = React.createRef();
		this.id9 = React.createRef();
		this.id10 =React.createRef();
		this.promedio =React.createRef();
		this.tiempoTranscurrido = React.createRef();
		this.periodoPromedio = React.createRef();

		this.espacio = React.createRef();
		this.tiempo = React.createRef();
		this.velocidad = React.createRef();

		this.orientacion = React.createRef();
		this.ortogonal = React.createRef();
		this.angulo = React.createRef();

		
 //(orientacion-90)-ort
		this.state = {
			array: [this.id1,this.id2,this.id3,this.id4,this.id5,this.id6,this.id7,this.id8,this.id9,this.id10],
		}
	}


	avarege(){
		var cont =0;
		var val =0;
		for(var i in this.state.array){
			var id = this.state.array[i];
			if(id.current.value!=''){
				cont ++;
				val += parseInt(id.current.value);
				console.log(id.current.value);

			}
		}
		var prom = val/cont;
		this.promedio.current.value=prom;
		console.log(prom);
		console.log(this.state.array);
	}

	avaregePeriodo(){
		if(this.tiempoTranscurrido.current.value!=''){
			var promedio = parseFloat(this.tiempoTranscurrido.current.value)/10.0;
			this.periodoPromedio.current.value=promedio;
		}
	}

	calcularVelocidad(){
		if(this.espacio.current.value!='' &&  this.tiempo.current.value!=''){
			var velocidad = parseFloat(this.espacio.current.value)/parseFloat(this.tiempo.current.value);
			this.velocidad.current.value=velocidad;
		}

	}


	calcularOrientacion(){
		if(this.orientacion.current.value!='' &&  this.ortogonal.current.value!=''){
			var  angulo = 	(parseFloat(this.orientacion.current.value)-90)-parseFloat(this.ortogonal.current.value);
			this.angulo.current.value=angulo;
		}
	}
	


	render() {
		return (
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
								<Col xs="auto">Fecha de Observación</Col>
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
								<Col xs="3">Ubicación</Col>
							</Row>
							<Row>
								<Col xs="auto">
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
								<Col xs="auto"><UncontrolledDropdown>
									<DropdownToggle caret>Escoga Cantón</DropdownToggle>
									<DropdownMenu>
										<DropdownItem>Guayaquil</DropdownItem>
										<DropdownItem>Durán</DropdownItem>
										<DropdownItem>Milagro</DropdownItem>
										<DropdownItem>Santa Elena</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
								</Col>
								<Col xs="auto"><UncontrolledDropdown>
									<DropdownToggle caret>Escoga Parroquia</DropdownToggle>
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
										<DropdownToggle caret>Escoga una Estación</DropdownToggle>
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
									<DropdownToggle caret>Escoga época</DropdownToggle>
									<DropdownMenu>
										<DropdownItem>Invierno</DropdownItem>
										<DropdownItem>Verano</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
								</Col>
							</Row>
							<br />
						</Container>
					</div>
				</section>
				<section id="panel12">
				<div class="item" id="1">
						<div class="accordion" id="n1">
							<div class="row mx-auto">
								<div class="col">
									<label class="med" id="title-med">Medicion</label>
									<label class="med" id="period"></label>
								</div>
								<div class="col text-right">
									<img height="20" id="delete" src="https://image.flaticon.com/icons/svg/149/149343.svg" />
								</div>
							</div>
						</div>
						<div class="panel" id="p1">
							<form id="medicionform" method="POST" novalidate="">
								<input name="csrfmiddlewaretoken" type="hidden" value="gNZOO9YB7Y5VN5jdXwH26qSNxvbodd7MQQDs3ByGxEdNxmJhcJybp39CTAT4PL0x" />
								<div class="row">
									<div class="col-md-3">
										<div class="col-md-15"><strong><label for="id_horario">Horario*:</label></strong></div>
										<div class="col-md-15"> <select name="horario" class="form-control" id="id_horario">
											<option value="0"></option>
											<option value="1">07:00:00</option>
											<option value="2">07:30:00</option>
											<option value="3">08:00:00</option>
											<option value="4">08:30:00</option>
											<option value="5">09:00:00</option>
											<option value="6">09:30:00</option>
											<option value="7">10:00:00</option>
											<option value="8">10:30:00</option>
											<option value="9">11:00:00</option>
											<option value="10">11:30:00</option>
											<option value="11">12:00:00</option>
											<option value="12">12:30:00</option>
											<option value="13">13:00:00</option>
											<option value="14">13:30:00</option>
											<option value="15">14:00:00</option>
											<option value="16">14:30:00</option>
											<option value="17">15:00:00</option>
											<option value="18">15:30:00</option>
											<option value="19">16:00:00</option>
											<option value="20">16:30:00</option>
											<option value="21">17:00:00</option>
											<option value="22">17:30:00</option>
											<option value="23">18:00:00</option>
											<option value="24">18:30:00</option>
										</select></div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_tmp">Temperatura(°C):</label></strong></div>
										<div class="col-md-15"> <input name="tmp" class="form-control" id="id_tmp" type="number" step="any" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_latitude">Latitud*:</label></strong></div>
										<div class="col-md-15"><input name="latitude" class="form-control" id="id_latitude" required="" type="number" step="1e-17" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_longitude">Longitud*:</label></strong></div>
										<div class="col-md-15"><input name="longitude" class="form-control" id="id_longitude" required="" type="number" step="1e-17"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15 d-none d-xl-block"><strong><label><br /></label></strong></div>
										<div class="col-md-15 d-xl-none"><p></p></div>
										<div class="col-md-15">
											<button class="btn btn-secondary" id="show" type="button">
												<span>
													<img width="30" src="https://image.flaticon.com/icons/svg/854/854878.svg" />
												</span>
											</button>
										</div>
										<div class="col-md-15 d-xl-none"><p></p></div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-3">
										<div class="map" id="map_content"></div>
									</div>
								</div>

								<li class="data"><span>Corriente del litoral</span></li>
								<div class="row">
									<div class="col-md-3">
										<div class="col-md-15"><strong><label for="id_cs_space">Espacio(m)*:</label></strong></div>
										<div class="col-md-15"> <input ref = {this.espacio} onChange={()=>this.calcularVelocidad()} name="cs_space" class="form-control" id="id_cs_space" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_cs_time">Tiempo(s)*:</label></strong></div>
										<div class="col-md-15"> <input ref = {this.tiempo} onChange={()=>this.calcularVelocidad()} name="cs_time" class="form-control" id="id_cs_time" required="" type="number" step="1"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_cs_direc">Dirección*:</label></strong></div>
										<div class="col-md-15"><select name="cs_direc" class="form-control" id="id_cs_direc">
											<option value="0"></option>
											<option value="1">D</option>
											<option value="2">I</option>
										</select>
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_cs_speed">Velocidad(m/s):</label></strong></div>
										<div class="col-md-15"><input  ref = {this.velocidad} name="cs_speed" disabled="" class="form-control" id="id_cs_speed" required="" type="number" step="any" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-auto">
										<div class="col-md-15"><li class="data"><span><label for="id_resaca">Corriente de resaca*:</label></span></li></div>
										<div class="col-md-15"> <select name="resaca" class="form-control" id="id_resaca">
											<option value="0"></option>
											<option value="1">Sí</option>
											<option value="2">No</option>
										</select>
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-mx-auto">
										<div class="col-md-auto"><li class="data"><span><label for="id_surf">Ancho de zona de surf(m)*:</label></span></li></div>
										<div class="col-md-auto"> <input name="surf" class="form-control" id="id_surf" required="" type="number" step="any" />
										</div>
										<div class="col-md-auto">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-auto">
										<div class="col-md-15"><li class="data"><span><label for="id_lp_flot">Dist. L.P. al flotador(m)*:</label></span></li></div>
										<div class="col-md-15"><input name="lp_flot" class="form-control" id="id_lp_flot" required="" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-auto">
										<div class="col-md-15"><li class="data"><span><label for="id_lp_rompien">Dist. L.P. al rompiente(m)*:</label></span></li></div>
										<div class="col-md-15"><input name="lp_rompien" class="form-control" id="id_lp_rompien" required="" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>

								<li class="data"><span>Viento</span></li>
								<div class="row">
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_vi_speed">Velocidad(m/s):</label></strong></div>
										<div class="col-md-15"> <input name="vi_speed" class="form-control" id="id_vi_speed" type="number" step="any" /></div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_vi_dir">Dirección:</label></strong></div>
										<div class="col-md-15"> <input name="vi_dir" class="form-control" id="id_vi_dir" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-3">
										<div class="col-md-15"><li class="data"><span><label for="id_orientation">Orientacion de playa*:</label></span></li></div>
										<div class="col-md-15"> <input ref = {this.orientacion} name="orientation" onChange={()=>this.calcularOrientacion()} class="form-control" id="id_orientation" required="" type="number" step="1"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>

								<li class="data"><span>Olas rompientes</span></li>
								<div class="row">
									<div class="col-md-2">
										<div class="col-md-15"><strong><label for="id_ortogonal">Ortogonal*:</label></strong></div>
										<div class="col-md-15"> <input ref = {this.ortogonal} onChange={()=>this.calcularOrientacion()} name="ortogonal" class="form-control" id="id_ortogonal" required="" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-auto">
										<div class="col-md-15"><strong><label for="id_angle">Ángulo de aproximación*:</label></strong></div>
										<div class="col-md-15"> <input ref = {this.angulo}  name="angle" disabled="" class="form-control" id="id_angle" required="" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md">
										<div class="col-md-15"><strong><label for="id_tipo">Tipo*:</label></strong></div>
										<div class="col-md-15">
											<select name="tipo" class="form-control" id="id_tipo">
												<option value="0"></option>
												<option value="coll">Collopsing</option>
												<option value="plu">Plunging</option>
												<option value="s-p">Spilling-Plunging</option>
												<option value="spi">Spilling</option>
												<option value="sur">Surging</option>
											</select>
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-auto">
										<div class="col-md-15"><strong><label for="id_br_time">Tiempo transcurrido(s)*:</label></strong></div>
										<div class="col-md-15"><input ref = {this.tiempoTranscurrido} name="br_time" onChange={()=>this.avaregePeriodo()} class="form-control" id="id_br_time" required="" type="number" step="1" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-auto">
										<div class="col-md-15"><strong><label for="id_averagePeriod">Periodo promedio*:</label></strong></div>
										<div class="col-md-15"><input ref = {this.periodoPromedio}  name="averagePeriod" disabled="" class="form-control" id="id_averagePeriod" required="" type="number" step="any" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>
								<strong><label>Altura rompiente(m)</label></strong>
								<div class="row">
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br1">1:</label></strong></div>
										<div class="col-md-15"> <input ref={this.id1} onChange={()=>this.avarege()}  name="br1" class="form-control off" id="id_br1" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br2">2:</label></strong></div>
										<div class="col-md-15"> <input ref={this.id2}  name="br2" onChange={()=>this.avarege()}  class="form-control off" id="id_br2" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br3">3:</label></strong></div>
										<div class="col-md-15"><input  ref={this.id3} name="br3" onChange={()=>this.avarege()}  class="form-control off" id="id_br3" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br4">4:</label></strong></div>
										<div class="col-md-15"><input ref={this.id4} name="br4" onChange={()=>this.avarege()}  class="form-control off" id="id_br4" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br5">5:</label></strong></div>
										<div class="col-md-15"> <input ref={this.id5} name="br5" onChange={()=>this.avarege()}  class="form-control off" id="id_br5" onChange={()=>this.avarege()}  required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br6">6:</label></strong></div>
										<div class="col-md-15"> <input ref={this.id6} name="br6" onChange={()=>this.avarege()} class="form-control off" id="id_br6" onChange={()=>this.avarege()}  required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br7">7:</label></strong></div>
										<div class="col-md-15"><input ref={this.id7}  name="br7" onChange={()=>this.avarege()}  class="form-control off" id="id_br7" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br8">8:</label></strong></div>
										<div class="col-md-15"><input ref={this.id8}  name="br8" onChange={()=>this.avarege()}  class="form-control off" id="id_br8" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br9">9:</label></strong></div>
										<div class="col-md-15"><input ref={this.id9}  name="br9" onChange={()=>this.avarege()} class="form-control off" id="id_br9" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_br10">10:</label></strong></div>
										<div class="col-md-15"><input  ref={this.id10} onChange={()=>this.avarege()} name="br10" class="form-control off" id="id_br10" required="" type="number" step="any"  />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
									<div class="col-md-1">
										<div class="col-md-15"><strong><label for="id_average">Promedio:</label></strong></div>
										<div class="col-md-15"><input ref={this.promedio} name="average" disabled="" class="form-control off" id="id_average" required="" value={this.promedio} type="number" step="any" />
										</div>
										<div class="col-md-15">
											<div class="error"></div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
		)
    }
}

export default Observacion;