import React from 'react';
import classnames from 'classnames'
import CanvasJSReact from './../assets/vendor/canvasjs.react';
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// reactstrap components
import {
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Col,
    Row,
    Card,
    CardBody,
    Container,
    //Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,

    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Datos extends React.Component {
    constructor(args) {
        super(args);
        this.grafics = React.createRef();
        this.canvas = React.createRef();
        this.state = {
            tabs: 1,
            observaciones: {},
        }
        this.plotGrafic = this.plotGrafic.bind(this);
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    componentDidMount() {
        fetch('https://cip-rrd.herokuapp.com/observaciones')
            .then(res => res.json())
            .then(res => this.setState({ observaciones: res }))
            .catch(() => this.setState({ observaciones: {} }));
    }

    updateTable(e) {
        let obj = this.state.observaciones
        let criterio = e.target.value

        var objects = {};
        for (var i in obj) {
            console.log(obj[i].observador.indexOf(i))
            if (i === criterio || i.indexOf(obj[i].observador) === 0) {
                objects[i] = obj[i]
            }
        }
        console.log(objects)
    }

    plotGrafic(value){
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Simple Column Chart with Index Labels"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: [
                    { x: 10, y: 71 },
                    { x: 20, y: 55 },
                    { x: 30, y: 50 },
                    { x: 40, y: 65 },
                    { x: 50, y: 71 },
                    { x: 60, y: 68 },
                    { x: 70, y: 38 },
                    { x: 80, y: 92, indexLabel: "Highest" },
                    { x: 90, y: 54 },
                    { x: 100, y: 60 },
                    { x: 110, y: 21 },
                    { x: 120, y: 49 },
                    { x: 130, y: 36 }
                ]
            }]
        });
        chart.render();
    }

    render() {
        let observaciones = this.state.observaciones
    
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Simple Column Chart with Index Labels"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: [
                    { x: 10, y: 71 },
                    { x: 20, y: 55 },
                    { x: 30, y: 50 },
                    { x: 40, y: 65 },
                    { x: 50, y: 71 },
                    { x: 60, y: 68 },
                    { x: 70, y: 38 },
                    { x: 80, y: 92, indexLabel: "Highest" },
                    { x: 90, y: 54 },
                    { x: 100, y: 60 },
                    { x: 110, y: 21 },
                    { x: 120, y: 49 },
                    { x: 130, y: 36 }
                ]
            }]
        }

        return (
            <main ref="main">
                <section className="section section-lg bg-gradient-default">
                    <Container>
                        <Card className="bg-gradient-secondary shadow">
                            <CardBody className="p-lg-4">
                                <h3><strong>Datos</strong></h3>

                                <div>
                                    <div className="mx-auto row">
                                        <div className="col-xs-12 col-md-12 col-lg-12 pb-3">
                                            <strong>Por fecha:</strong>
                                            <Row>
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <InputGroup className={classnames("input-group-alternative", { focused: this.state.fechaInicioFocused })}>
                                                            <InputGroupAddon addonType="prepend">
                                                                {/* Imagen calendario */}
                                                                <InputGroupText>
                                                                    <i className="ni ni-calendar-grid-58" />
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
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <InputGroup className={classnames("input-group-alternative", { focused: this.state.fechaFinFocused })}>
                                                            <InputGroupAddon addonType="prepend">
                                                                {/* Imagen calendario */}
                                                                <InputGroupText>
                                                                    <i className="ni ni-calendar-grid-58" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>

                                                            <ReactDatetime
                                                                inputProps={{ placeholder: "Date Picker Here" }}
                                                                timeFormat={false}
                                                                renderDay={(props, currentDate, selectedDate) => {
                                                                    let classes = props.className;
                                                                    if (
                                                                        this.state.startDate &&
                                                                        this.state.endDate &&
                                                                        this.state.startDate._d + "" === currentDate._d + ""
                                                                    ) {
                                                                        classes += " start-date";
                                                                    } else if (
                                                                        this.state.startDate &&
                                                                        this.state.endDate &&
                                                                        new Date(this.state.startDate._d + "") <
                                                                        new Date(currentDate._d + "") &&
                                                                        new Date(this.state.endDate._d + "") >
                                                                        new Date(currentDate._d + "")
                                                                    ) {
                                                                        classes += " middle-date";
                                                                    } else if (
                                                                        this.state.endDate &&
                                                                        this.state.endDate._d + "" === currentDate._d + ""
                                                                    ) {
                                                                        classes += " end-date";
                                                                    }
                                                                    return (
                                                                        <td {...props} className={classes}>
                                                                            {currentDate.date()}
                                                                        </td>
                                                                    );
                                                                }}
                                                                onChange={e => this.setState({ endDate: e })}
                                                                onFocus={e => this.setState({ fechaFinFocused: true })}
                                                                onBlur={e => this.setState({ fechaFinFocused: false })}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="col-xs-12 col-md-12 col-lg-12  pb-3" id="stationForm" data-cantons-url="{% url 'ajax_load_cantons' %}" data-url="{% url 'table_data' %}"
                                            data-parishes-url="{% url 'ajax_load_parishes' %}" data-stations-url="{% url 'ajax_load_stations' %}">
                                            <strong>Por ubicación:</strong>
                                            <div className="row">
                                                <FormGroup className={classnames("col-xs-6 col-sm-4 col-md-4 col-lg-3", { focused: this.state.provFocused })}>
                                                    <InputGroup className="input-group-alternative">
                                                        {/* 
                                                            <Input placeholder="Lugar de origen" type="text" 
                                                            onFocus={e => this.setState({ placeFocused: true })} 
                                                            onBlur={e => this.setState({ placeFocused: false })} 
                                                            valid/> 
                                                        */}

                                                        <Input placeholder="Provincia" type="select" name="select" onFocus={e => this.setState({ provFocused: true })} onBlur={e => this.setState({ provFocused: false })}>
                                                            <option value="">Provincia</option>
                                                            <option>Esmeraldas</option>
                                                            <option>El Oro</option>
                                                            <option>Guayas</option>
                                                            <option>Manabí</option>
                                                            <option>Santa Elena</option>
                                                        </Input>

                                                    </InputGroup>
                                                </FormGroup>

                                                <FormGroup className={classnames("col-xs-6 col-sm-4 col-md-4 col-lg-3", { focused: this.state.cantonFocused })}>
                                                    <InputGroup className="input-group-alternative">
                                                        <Input placeholder="Lugar de origen" type="select" name="select" onFocus={e => this.setState({ cantonFocused: true })} onBlur={e => this.setState({ cantonFocused: false })}>
                                                            <option value="">Canton</option>
                                                            <option>Guayaquil</option>
                                                            <option>Durán</option>
                                                            <option>Milagro</option>
                                                            <option>Santa Elena</option>
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>

                                                <FormGroup className={classnames("col-xs-6 col-sm-4 col-md-4 col-lg-3", { focused: this.state.parroquiaFocused })}>
                                                    <InputGroup className="input-group-alternative">
                                                        <Input placeholder="Lugar de origen" type="select" name="select" onFocus={e => this.setState({ parroquiaFocused: true })} onBlur={e => this.setState({ parroquiaFocused: false })}>
                                                            <option value="">Parroquia</option>
                                                            <option>Guayaquil</option>
                                                            <option>Durán</option>
                                                            <option>Milagro</option>
                                                            <option>Santa Elena</option>
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>

                                                <FormGroup className={classnames("col-xs-6 col-sm-4 col-md-4 col-lg-3", { focused: this.state.stationFocused })}>
                                                    <InputGroup className="input-group-alternative">
                                                        <Input placeholder="Lugar de origen" type="select" name="select" onFocus={e => this.setState({ stationFocused: true })} onBlur={e => this.setState({ stationFocused: false })}>
                                                            <option value="">Estación</option>
                                                            <option>Guayaquil</option>
                                                            <option>Durán</option>
                                                            <option>Milagro</option>
                                                            <option>Santa Elena</option>
                                                        </Input>
                                                    </InputGroup>
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div className="col-xs-12 col-md-12 col-lg-12">
                                            <a className="btn btn-secondary" id="filtrar" href="/">Filtrar</a>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="nav-wrapper">
                                        <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist" >
                                            <NavItem>
                                                <NavLink aria-selected={this.state.tabs === 1}
                                                    className={
                                                        classnames("mb-sm-3 mb-md-0", { active: this.state.tabs === 1 })
                                                    }
                                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                                    role="tab"
                                                >
                                                    <i className="fa fa-table mr-2" aria-hidden="true"></i>
                                                    Tabla
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink aria-selected={this.state.tabs === 2}
                                                    className={
                                                        classnames("mb-sm-3 mb-md-0", { active: this.state.tabs === 2 })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                                    role="tab"
                                                >
                                                    <i className="fa fa-bar-chart mr-2" aria-hidden="true"></i>
                                                    Gráficas
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.tabs === 3}
                                                    className={
                                                        classnames("mb-sm-3 mb-md-0", { active: this.state.tabs === 3 })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 3)}
                                                    role="tab"
                                                >
                                                    <i className="fa fa-download mr-2" aria-hidden="true"></i>
                                                    Descargar
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
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

                <section className="section section-lg pt-lg-0 mt--0">
                    <div className="container">
                        <Card className="shadow">
                            <CardBody>
                                <TabContent activeTab={"tabs" + this.state.tabs}>
                                    {/* Tabla de datos */}
                                    <TabPane tabId="tabs1">
                                        <div id="cuadroFiltrado">
                                            <FormGroup>
                                                <InputGroup className={classnames("input-group-alternative mb-4", { focused: this.state.searchFocused })}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fa fa-search" aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input className="form-control-alternative" placeholder="Buscar observación" type="text"
                                                        onFocus={e => this.setState({ searchFocused: true })}
                                                        onBlur={e => this.setState({ searchFocused: false })}
                                                        onChange={this.updateTable.bind(this)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>

                                            <Table responsive hover size="sm">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Observador</th>
                                                        <th scope="col">Fase Lunar</th>
                                                        <th scope="col">Época</th>
                                                        <th scope="col">Estación</th>
                                                        <th scope="col" className="text-center">Cant. mediciones</th>
                                                        <th scope="col" className="text-right">Revisión</th>
                                                    </tr>
                                                </thead>

                                                <tbody id="tabla">
                                                    {Object.keys(observaciones).map(k => (
                                                        <tr key={"row" + k}>
                                                            <th scope="row">{parseInt(k, 10) + 1}</th>
                                                            <td>{observaciones[k].observador}</td>
                                                            <td>{observaciones[k].fase_lunar}</td>
                                                            <td>{'Verano'}</td>
                                                            <td>{observaciones[k].estacion.nombre}</td>
                                                            <td className="text-center">{observaciones[k].mediciones.length}</td>
                                                            <td className="text-right">{parseInt(k, 10) % 2 === 0 ? 'True' : 'False'}</td>
                                                        </tr>
                                                    )
                                                    )}
                                                </tbody>
                                            </Table>
                                            <p id="total" />

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
                                        </div>
                                    </TabPane>

                                    {/* Graficos */}
                                    <TabPane tabId="tabs2">
                                        <div className="mx-auto row">
                                            <div className="col-xs-12 col-sm-8 col-md-7 col-lg-7 pb-5">
                                                <strong>Elija el tipo de variable a graficar:</strong>
                                                <select className="form-control form-control-sm" id="graficos" ref={this.grafics} onChange={() => this.plotGrafic(this.grafics.current.value)}>
                                                    <option value="0"></option>
                                                    <option value="1">Número de mediciones por observaciones</option>
                                                    <option value="2">Número de observaciones por estaciones</option>
                                                    <option value="3">Época(Estacion climática)</option>
                                                    <option value="4">Fase Lunar</option>
                                                    <optgroup label="Corriente del litoral">
                                                        <option value="5">Velocidad promedio por Observaciones</option>
                                                        <option value="6">Tiempo promedio por Observaciones</option>
                                                        <option value="7">Espacio promedio por Observaciones</option>
                                                        <option value="8">Dirección corriente litoral</option>
                                                    </optgroup>
                                                    <option value="9">Distancia línea de playa a la rompiente de la ola por Observaciones</option>
                                                    <option value="10">Distancia línea de playa al flotador por Observaciones</option>
                                                    <option value="11">Ancho de zona de surf</option>
                                                    <option value="12">Corrientes de resaca</option>
                                                    <option value="13">Orientación de la playa</option>
                                                    <optgroup label="viento">
                                                        <option value="14">Velocidad del viento</option>
                                                        <option value="15">Dirección del viento</option>
                                                    </optgroup>
                                                    <optgroup label="Olas rompientes">
                                                        <option value="16">Valor promedio del periodo</option>
                                                        <option value="17">Tipos de olas</option>
                                                        <option value="18">Ángulo de aproximación</option>
                                                        <option value="19">Ortogonal de las olas</option>
                                                        <option value="20">Valor promedio de altura de la rompiente</option>
                                                    </optgroup>
                                                </select>
                                            </div>

                                            <div className="col-12" id="chartContainer">
                                                    <CanvasJSChart ref={this.canvas} options={options}  /* onRef={ref => this.chart = ref}*/  />
                                            </div>
                                        </div>
                                    </TabPane>

                                    <TabPane tabId="tabs3">

                                        <div className="row" >
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label for="file">Exportar como:</label>
                                                        <select className="form-control form-control-sm" id="file">
                                                            <option value="csv">CSV</option>
                                                            <option value="pdf">PDF</option>
                                                        </select>
                                                        <p></p>
                                                    </div>
                                                </div>

                                                <div className="row" id='todo'>
                                                    <div className="col checkbox checkbox-primary">
                                                        <input type="checkbox" className="styled" id="all" checked />
                                                        <label for="all" className="form-check-label">Todo</label>
                                                    </div>
                                                </div>
                                                <div id="check-group">
                                                    <div className="row">
                                                        <div className="col checkbox checkbox-primary">
                                                            <input type="checkbox" className="styled" id="resume" checked value="resume" />
                                                            <label for="resume" className="form-check-label">Datos resumidos</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <button className="btn btn-secondary" id="download">Exportar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </div>
                </section>

            </main>
        );
    }
}

export default Datos;