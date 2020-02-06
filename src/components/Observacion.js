import React from "react";
import ReactDatetime from "react-datetime";
import classnames from 'classnames';
import "../assets/css/obs.css";
// reactstrap components
import {
	Card,
    CardBody,
	Container,
	Row,
	Input,
	Col,
	InputGroupAddon,
	FormGroup,
	InputGroupText,
	InputGroup,
	Button,
} from "reactstrap";

class Observacion extends React.Component {
	constructor(args) {
		super(args);
		this.avarege = this.avarege.bind(this);
		this.avaregePeriodo = this.avaregePeriodo.bind(this);
		this.calcularVelocidad = this.calcularVelocidad.bind(this);
		this.calcularOrientacion = this.calcularOrientacion.bind(this);
		this.changeDate = this.changeDate.bind(this);

		this.id1 = React.createRef();
		this.id2 = React.createRef();
		this.id3 = React.createRef();
		this.id4 = React.createRef();
		this.id5 = React.createRef();
		this.id6 = React.createRef();
		this.id7 = React.createRef();
		this.id8 = React.createRef();
		this.id9 = React.createRef();
		this.id10 = React.createRef();
		this.date = React.createRef();

		this.promedio = React.createRef();
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
			array: [this.id1, this.id2, this.id3, this.id4, this.id5, this.id6, this.id7, this.id8, this.id9, this.id10],
			//observacion
			tmp: '',
			latitude:'',
			longitude:'',
			provincia:'',
			parroquia:'',
			canton:'',
			estacion:'',
			fase:'',
			epoca:'',
			average:'',
			horario:'',
			tipo:'',
			vi_dir:'',
			vi_speed:'',
			velocidad:'',
			resaca:'',
			averagePeriod:'',
			angle:'',
			date:'',
			
		}


	}
	changeHandler = e =>{
		this.setState({[e.target.name]: e.target.value});
	}

	changeDate(date){
		this.setState({date: date._d})
	}

	submitHandler = e =>{
		e.preventDefault();
		let currentComponent = this;

		const data =  {
		//	"id_medicion": 304,
			"username": localStorage.getItem('userName'),
			"fechaHora":  "2020-02-01T19:02:58.784470Z",
			"corriente_resaca": true,
			"provincia": this.state.provincia,
			"parroquia": this.state.parroquia,
			"canton": "Durán",
			"estacion": this.state.estacion,
			"fase": this.state.fase,
			"epoca": this.state.epoca,
			"latitud": parseFloat(this.state.latitude),
			"longitud": parseFloat(this.state.longitude),
			"temperatura": parseFloat(this.state.tmp),
			"perfil_playa": 53,
			"ancho_zon_surf": parseFloat(this.state.surf),
			"lp_flotador": parseFloat(this.state.lp_flot),
			"lp_rompiente": parseFloat(this.state.lp_rompien),
			"crl_espacio": parseFloat(this.state.cs_space),
			"crl_tiempo": parseFloat(this.state.cs_time),
			"crl_velocidad": parseFloat(this.state.velocidad),
			"crl_direccion": this.state.cs_direc,
			"vien_direccion": parseFloat(this.state.vi_dir),
			"vien_velocidad": parseFloat(this.state.vi_speed),
			"ola_ortogonal": parseFloat(this.state.ortogonal),
			"ola_periodo_onda": parseFloat(this.state.averagePeriod),
			"ola_altura_rompiente_promedio":  parseFloat(this.state.average),
			"ola_direccion": 0,
			"id_observacion": 20,
			"ola_tipo_oleaje": this.state.tipo,
			"id_periodo": 17,
			"estado": 3,
			//alturaolas
			"md1":parseFloat(this.state.br1),
			"md2":parseFloat(this.state.br2),
			"md3":parseFloat(this.state.br3),
			"md4":parseFloat(this.state.br4),
			"md5":parseFloat(this.state.br5),
			"md6":parseFloat(this.state.br6),
			"md7":parseFloat(this.state.br4),
			"md8":parseFloat(this.state.br8),
			"md9":parseFloat(this.state.br9),
			"md10":parseFloat(this.state.br10),


		};
		
		fetch('http://127.0.0.1:8000/postObservaciones/', {
		  method: 'POST', // or 'PUT'
		  body: JSON.stringify(data),
		  headers: {
			'Authorization': '',
			'Content-Type': 'application/json',
		  }
		   // data can be `string` or {object}!
		}).then(function(response) {
		  console.log(response.status)
		  if(response.ok && response.status === 200 ) {
			  console.log('OK')
			  return response.text()
		  } else {
			  throw "Error en la llamada Ajax";
		  }
		}).then(function(texto) {
			console.log(texto);
			currentComponent.props.history.push("/");
		}).catch(function(err) {
			console.log(err);
		});
		
		console.log(this.state);
	}

	avarege() {
		var cont = 0;
		var val = 0;
		for (var i in this.state.array) {
			var id = this.state.array[i];
			if (id.current.value !== '') {
				cont++;
				val += parseInt(id.current.value);
				console.log(id.current.value);

			}

		}
		
		var prom = val / cont;
		this.promedio.current.value = prom;
		this.setState({average: prom})
		console.log(prom);
		console.log(this.state.array);
	}

	avaregePeriodo() {
		if (this.tiempoTranscurrido.current.value !== '') {
			var promedio = parseFloat(this.tiempoTranscurrido.current.value) / 10.0;
			this.periodoPromedio.current.value = promedio;
			this.setState({averagePeriod: promedio});
		}
	}

	calcularVelocidad() {
		if (this.espacio.current.value !== '' && this.tiempo.current.value !== '') {
			var velocidad = parseFloat(this.espacio.current.value) / parseFloat(this.tiempo.current.value);
			this.velocidad.current.value = velocidad;
			this.setState({velocidad: velocidad})
		}
		

	}


	calcularOrientacion() {
		if (this.orientacion.current.value !== '' && this.ortogonal.current.value !== '') {
			var angulo = (parseFloat(this.orientacion.current.value) - 90) - parseFloat(this.ortogonal.current.value);
			this.angulo.current.value = angulo;
			this.setState({angle: angulo});
		}
	}

	postObservacion(e) {
		e.preventDefault();	
	}


	render() {
		
		return (
			<main ref="main">
				<form id="medicionform" onSubmit={this.submitHandler} method="POST" novalidate="">

					<section className="section section-lg bg-gradient-default">
						<Container>
							<Card className="bg-gradient-secondary shadow mb-5">
								<CardBody className="p-lg-4">
									<h3><strong>Observaciones</strong></h3>

									<div>
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
																ref={this.date}
																name="date"
																id="id_date"
																onChange={e => {this.setState({ startDate: e });this.changeDate(e)}}
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
													{/*<UncontrolledDropdown>
														<DropdownToggle caret>Escoga Provincia</DropdownToggle>
														<DropdownMenu>
															<DropdownItem>Esmeraldas</DropdownItem>
															<DropdownItem>El Oro</DropdownItem>
															<DropdownItem>Guayas</DropdownItem>
															<DropdownItem>Manabí</DropdownItem>
															<DropdownItem>Santa Elena</DropdownItem>
														</DropdownMenu>
													</UncontrolledDropdown>*/}
														<Input placeholder="Provincia" type="select" onChange={this.changeHandler} name="provincia" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Provincia</option>
															<option>Esmeraldas</option>
															<option>El Oro</option>
															<option>Guayas</option>
															<option>Manabí</option>
															<option>Santa Elena</option>
														</Input>
												</Col>
												<Col xs="auto">
													{/*<UncontrolledDropdown>
													<DropdownToggle caret>Escoga Cantón</DropdownToggle>
													<DropdownMenu>
														<DropdownItem>Guayaquil</DropdownItem>
														<DropdownItem>Durán</DropdownItem>
														<DropdownItem>Milagro</DropdownItem>
														<DropdownItem>Santa Elena</DropdownItem>
													</DropdownMenu>
													</UncontrolledDropdown>*/}
													<Input placeholder="cantones" type="select" onChange={this.changeHandler} name="canton" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Escoga Cantón</option>
															<option>Guayaquil</option>
															<option>Durán</option>
															<option>Milagro</option>
															<option>Playas</option>
															<option>Santa Elena</option>
														</Input>
												</Col>
												<Col xs="auto">
													{/*<UncontrolledDropdown>
													<DropdownToggle caret>Escoga Parroquia</DropdownToggle>
													<DropdownMenu>
														<DropdownItem>Guayaquil</DropdownItem>
														<DropdownItem>Durán</DropdownItem>
														<DropdownItem>Milagro</DropdownItem>
														<DropdownItem>Santa Elena</DropdownItem>
													</DropdownMenu>
													</UncontrolledDropdown>*/}
													<Input placeholder="parroquias" type="select" onChange={this.changeHandler} name="parroquia" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Escoga Parroquia</option>
															<option>General Villamil</option>
															<option>Vicente Rocafuerte</option>
															<option>Manglaralto</option>
															<option>Manabí</option>
															<option>Santa Elena</option>
														</Input>
												</Col>
											</Row>
											<Row>
												<Col xs="auto">Estación</Col>
											</Row>
											<Row>
												<Col xs="auto">
												{/*<UncontrolledDropdown>
														<DropdownToggle caret>Escoga una Estación</DropdownToggle>
														<DropdownMenu>
															<DropdownItem>Estación 1</DropdownItem>
															<DropdownItem>Estación 2</DropdownItem>
															<DropdownItem>Estación 3</DropdownItem>
														</DropdownMenu>
												</UncontrolledDropdown>*/}
														<Input placeholder="estaciones" type="select" onChange={this.changeHandler} name="estacion" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Escoga una Estación</option>
															<option>Estacion 1</option>
															<option>Estación 2</option>
															<option>Estación 3</option>
														</Input>
												</Col>
											</Row>
											<Row>
												<Col xs="3">Temporada</Col>
											</Row>
											<Row>
												<Col xs="auto">
													{/*<UncontrolledDropdown>
														<DropdownToggle caret>Escoga Fase Lunar</DropdownToggle>
														<DropdownMenu>
															<DropdownItem>Sicigia</DropdownItem>
															<DropdownItem>Cuadratura</DropdownItem>
														</DropdownMenu>
													</UncontrolledDropdown>*/}
														<Input placeholder="fases" type="select" onChange={this.changeHandler} name="fase" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Escoga Fase Lunar</option>
															<option value="Sicigia">Sicigia</option>
															<option value="Cuadratura">Cuadratura</option>
														</Input>
												</Col>
												<Col xs="auto">
													{/*<UncontrolledDropdown>
													<DropdownToggle caret>Escoga época</DropdownToggle>
													<DropdownMenu>
														<DropdownItem>Invierno</DropdownItem>
														<DropdownItem>Verano</DropdownItem>
													</DropdownMenu>
													</UncontrolledDropdown>*/}
														<Input placeholder="epocas" type="select" onChange={this.changeHandler} name="epoca" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
															<option value="">Escoga Época </option>
															<option value="Invierno">Invierno</option>
															<option value="Verano">Verano</option>
														</Input>
												</Col>
											</Row>
											<br />
										</Container>
									</div>
									</div>
								</CardBody>
							</Card>
						</Container>

						{/* SVG separator */}
						<div className="separator separator-bottom separator-skew zindex-100">
							<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
								<polygon className="fill-white" points="2560 0 2560 100 0 100" />
							</svg>
						</div>
					</section>

					<section id="panel12">
						<div className="container">
							<Card className="shadow">
								<CardBody>
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
												<input name="csrfmiddlewaretoken" type="hidden" value="gNZOO9YB7Y5VN5jdXwH26qSNxvbodd7MQQDs3ByGxEdNxmJhcJybp39CTAT4PL0x" />
												<div class="row">
													<div class="col-md-3">
														<div class="col-md-15"><strong><label for="id_horario">Horario*:</label></strong></div>
														<div class="col-md-15"> <select name="horario" onChange={this.changeHandler} class="form-control" id="id_horario">
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
														<div class="col-md-15"> <input onChange={this.changeHandler} name="tmp" class="form-control" id="id_tmp" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_latitude">Latitud*:</label></strong></div>
														<div class="col-md-15"><input name="latitude" onChange={this.changeHandler}  class="form-control" id="id_latitude" required="" type="number" step="1e-17" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_longitude">Longitud*:</label></strong></div>
														<div class="col-md-15"><input name="longitude" onChange={this.changeHandler}  class="form-control" id="id_longitude" required="" type="number" step="1e-17" />
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
														<div class="col-md-15"> <input ref={this.espacio} onChange={e =>{this.calcularVelocidad();this.changeHandler(e)}} name="cs_space" class="form-control" id="id_cs_space" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_cs_time">Tiempo(s)*:</label></strong></div>
														<div class="col-md-15"> <input ref={this.tiempo} onChange={e =>{this.calcularVelocidad();this.changeHandler(e)}} name="cs_time" class="form-control" id="id_cs_time" required="" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_cs_direc">Dirección*:</label></strong></div>
														<div class="col-md-15"><select name="cs_direc" onChange={this.changeHandler} class="form-control" id="id_cs_direc">
															<option value="0"></option>
															<option value="D">D</option>
															<option value="I">I</option>
														</select>
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_cs_speed">Velocidad(m/s):</label></strong></div>
														<div class="col-md-15"><input ref={this.velocidad} onChange= {this.changeHandler}  name="cs_speed" disabled="" class="form-control" id="id_cs_speed" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-md-auto">
														<div class="col-md-15"><li class="data"><span><label for="id_resaca">Corriente de resaca*:</label></span></li></div>
														<div class="col-md-15"> <select name="resaca" onChange= {this.changeHandler}  class="form-control" id="id_resaca">
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
														<div class="col-md-auto"> <input name="surf" onChange= {this.changeHandler}  class="form-control" id="id_surf" required="" type="number" step="any" />
														</div>
														<div class="col-md-auto">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-auto">
														<div class="col-md-15"><li class="data"><span><label for="id_lp_flot">Dist. L.P. al flotador(m)*:</label></span></li></div>
														<div class="col-md-15"><input name="lp_flot"onChange= {this.changeHandler}  class="form-control" id="id_lp_flot" required="" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-auto">
														<div class="col-md-15"><li class="data"><span><label for="id_lp_rompien">Dist. L.P. al rompiente(m)*:</label></span></li></div>
														<div class="col-md-15"><input name="lp_rompien" onChange= {this.changeHandler}  class="form-control" id="id_lp_rompien" required="" type="number" step="1" />
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
														<div class="col-md-15"> <input name="vi_speed" onChange={this.changeHandler} class="form-control" id="id_vi_speed" type="number" step="any" /></div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-2">
														<div class="col-md-15"><strong><label for="id_vi_dir">Dirección:</label></strong></div>
														<div class="col-md-15"> <input name="vi_dir" onChange={this.changeHandler} class="form-control" id="id_vi_dir" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-md-3">
														<div class="col-md-15"><li class="data"><span><label for="id_orientation">Orientacion de playa*:</label></span></li></div>
														<div class="col-md-15"> <input ref={this.orientacion} name="orientation" onChange={e => {this.calcularOrientacion();this.changeHandler(e)}} class="form-control" id="id_orientation" required="" type="number" step="1" />
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
														<div class="col-md-15"> <input ref={this.ortogonal} onChange={e => {this.calcularOrientacion();this.changeHandler(e)}} name="ortogonal" class="form-control" id="id_ortogonal" required="" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-auto">
														<div class="col-md-15"><strong><label for="id_angle">Ángulo de aproximación*:</label></strong></div>
														<div class="col-md-15"> <input ref={this.angulo} name="angle"onChange= {this.changeHandler}  disabled="" class="form-control" id="id_angle" required="" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md">
														<div class="col-md-15"><strong><label for="id_tipo">Tipo*:</label></strong></div>
														<div class="col-md-15">
															<select name="tipo" onChange={this.changeHandler} class="form-control" id="id_tipo">
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
														<div class="col-md-15"><input ref={this.tiempoTranscurrido} name="br_time" onChange={e => {this.avaregePeriodo();this.changeHandler(e)}} class="form-control" id="id_br_time" required="" type="number" step="1" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-auto">
														<div class="col-md-15"><strong><label for="id_averagePeriod">Periodo promedio*:</label></strong></div>
														<div class="col-md-15"><input ref={this.periodoPromedio} onChange= {e=>this.changeHandler(e)} name="averagePeriod" disabled="" class="form-control" id="id_averagePeriod" required="" type="number" step="any" />
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
														<div class="col-md-15"> <input ref={this.id1} onChange={e => {this.avarege();this.changeHandler(e)}} name="br1" class="form-control off" id="id_br1" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br2">2:</label></strong></div>
														<div class="col-md-15"> <input ref={this.id2} name="br2" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br2" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br3">3:</label></strong></div>
														<div class="col-md-15"><input ref={this.id3} name="br3" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br3" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br4">4:</label></strong></div>
														<div class="col-md-15"><input ref={this.id4} name="br4" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br4" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br5">5:</label></strong></div>
														<div class="col-md-15"> <input ref={this.id5} name="br5" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br5"  required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br6">6:</label></strong></div>
														<div class="col-md-15"> <input ref={this.id6} name="br6" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br6" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br7">7:</label></strong></div>
														<div class="col-md-15"><input ref={this.id7} name="br7" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br7" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br8">8:</label></strong></div>
														<div class="col-md-15"><input ref={this.id8} name="br8" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br8" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br9">9:</label></strong></div>
														<div class="col-md-15"><input ref={this.id9} name="br9" onChange={e => {this.avarege();this.changeHandler(e)}} class="form-control off" id="id_br9" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_br10">10:</label></strong></div>
														<div class="col-md-15"><input ref={this.id10} onChange={e => {this.avarege();this.changeHandler(e)}} name="br10" class="form-control off" id="id_br10" required="" type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
													</div>
													<div class="col-md-1">
														<div class="col-md-15"><strong><label for="id_average">Promedio:</label></strong></div>
														<div class="col-md-15"><input ref={this.promedio} name="proM" disabled="" class="form-control off" id="id_average" required=""  type="number" step="any" />
														</div>
														<div class="col-md-15">
															<div class="error"></div>
														</div>
														<Button className="mt-3" type="Submit" >
																	Enviar
														</Button>
													</div>
												</div>
										</div>
									</div>
								</CardBody>
                        	</Card>
                    	</div>
					</section>

				</form>
			</main>
		)
	}
}

export default Observacion;