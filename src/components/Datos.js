import React from 'react';
import '../assets/css/datos.css';
import classnames from 'classnames'
import DataSearch from './BasicSearch';
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
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

    graficoBarrasdeMediciones(titulo){
        var puntos = [];
        for(var i in this.state.observaciones){
            var ob = this.state.observaciones[i];
            puntos.push({y: ob.mediciones.length, label: i});
        }
            
    
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            exportFileName: titulo,
            title:{
                text:titulo
            },
            axisX:{
                interval: 1,
                title: "Observaciones"
            },
            axisY2:{
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Mediciones"
            },
            data: [{
                type: "bar",
                name: "companies",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: puntos
            }]
        });
        chart.render();
    }
    
    graficoBarrasdeObservaciones(titulo){
        var puntos = [];
        var estaciones = {}
        var newDat = this.state.observaciones;
        for(let i in newDat){
            if(newDat[i].estacion.id in estaciones)
                estaciones[newDat[i].estacion.id].count += 1
            else
                //estaciones.newDat[i].estacion = 1
                estaciones[newDat[i].estacion.id] = {count: 1, est: newDat[i].estacion.nombre, parr: newDat[i].estacion.Parroquia};
        }
        
        for(let i in estaciones){
            puntos.push({y: estaciones[i].count, label: estaciones[i].est + "(" + estaciones[i].parr + ")"});
        }
        console.log(estaciones);
    
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            exportFileName: titulo,
    
            title:{
                text:titulo
            },
            axisX:{
                interval: 1,
                title: "Estaciones"
            },
            axisY2:{
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Observaciones"
            },
            data: [{
                type: "bar",
                name: "companies",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: puntos
            }]
        });
        chart.render();
    }
    
    graficoCircular(titulo, listaopciones, tipo) {
        var puntos = [];
        var inv = 0;
        var ver = 0;
        //var plu,spi,
        var coll = 0
        var sp = 0
        var sur = 0;
        var newDat = this.state.observaciones;
        for(let i in newDat){
            if(tipo === 'epoca'){
                if(newDat[i].temporada === listaopciones[0])
                    inv+=1
                else
                    ver+=1
            }else if(tipo === 'luna'){
                if(newDat[i].fase_lunar === listaopciones[0])
                    inv+=1
                else
                    ver+=1
            }else if(tipo === 'tipos'){
                /*var lista = medidas[i].TipoDeOla
                inv += lista[0]
                ver += lista[1]
                coll += lista[2]
                sp += lista[3]  
                sur += lista[4]*/
            }
        }
        //.toFixed(2) a dos decimales
        if (tipo === 'tipos'){
            var tot = inv + ver + coll + sp + sur;
            puntos.push({y:((inv/(tot))*100).toFixed(2), name:listaopciones[0]})
            puntos.push({y:((ver/(tot))*100).toFixed(2), name:listaopciones[1]})
            puntos.push({y:((coll/(tot))*100).toFixed(2), name:listaopciones[2]})
            puntos.push({y:((sp/(tot))*100).toFixed(2), name:listaopciones[3]})
            puntos.push({y:((sur/(tot))*100).toFixed(2), name:listaopciones[4]})
        }else{
            puntos.push({y:((inv/(inv+ver))*100).toFixed(2), name:listaopciones[0]/*, exploded: true  //Para que sobre salga este*/ })
            puntos.push({y:((ver/(inv+ver))*100).toFixed(2), name:listaopciones[1]})
        }
    
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            exportFileName: titulo,
            title: {
                text: titulo
            },
            legend:{
                cursor: "pointer",
                itemclick: this.explodePie
            },
            data: [{
                type: "pie",
                showInLegend: true,
                startAngle: 240,
                toolTipContent: "{name}: <strong>{y}%</strong>",
                indexLabel: "{name} {y}",
                dataPoints: puntos
            }]
        });
        chart.render();
    }

    explodePie (e) {
        if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }

    grafico(titulo, datosx, datosy, formato, namep){
        var puntos = [];
        var newDat = this.state.observaciones;
        for(let i in newDat){
            //Corriente Litoral
            var promedio = 0;
            if('Velocidad promedio por Observaciones' === titulo){
                for(var med in newDat[i].mediciones){
                    promedio += newDat[i].mediciones[med].corriente_del_litoral["velocidad"];
                }
                promedio = promedio/newDat[i].mediciones.length;
                puntos.push({label: i, y: promedio});
            }else if('Tiempo promedio por Observaciones' === titulo){
                for(var med in newDat[i].mediciones){
                    promedio += newDat[i].mediciones[med].corriente_del_litoral["tiempo"];
                }
                promedio = promedio/newDat[i].mediciones.length;
                puntos.push({label: i, y: promedio});
            } else if('Espacio promedio por Observaciones' === titulo){              
                for(var med in newDat[i].mediciones){
                    promedio += newDat[i].mediciones[med].corriente_del_litoral["espacio"];
                }
                promedio = promedio/newDat[i].mediciones.length;
                puntos.push({label: i, y: promedio});
            
            }
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            exportEnabled: true,
            exportFileName: titulo,	
            title:{
                text: titulo
            },
            axisY: {
                title: datosy,
                titleFontColor: "#99A1C6",
                //lineColor: "#4F81BC",
                //labelFontColor: "#4F81BC",
                tickColor: "#99A1C6"
            },
            axisX: {
                title: datosx,
            },	
            /* Para que se muestre un cuadro con los datos
            toolTip: {
                shared: true
            },*/
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                name: namep,
                //showInLegend: true,
                xValueFormatString: "#",
                yValueFormatString: "#.# "+formato,
                dataPoints: puntos
            },
            {
                type: "line",
                name: namep,
                showInLegend: true,
                yValueFormatString: "#.# "+formato,
                dataPoints: puntos
            },
            ]
        });
        chart.render();
    }

    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    graficoColumnas(titulo, datosx, datosy1, datosy2){
        var puntos = [];
        var puntos2 = [];
        var newDat = this.state.observaciones;
        for(var i in newDat){
            if('Corrientes de resaca' === titulo){
                //puntos.push({label:i, y:medidas[i].ResacaSiNo[0]})
                //puntos2.push({label:i, y:medidas[i].ResacaSiNo[1]})
            }
            else if('Dirección corriente litoral' === titulo){
                var d = 0;
                var iz = 0;
                for(var med in newDat[i].mediciones){
                    if(newDat[i].mediciones[med].corriente_del_litoral["direccion"] == "D")
                        d += 1;
                    else
                        iz += 1;
                }
                puntos.push({label:i, y: d})
                puntos2.push({label:i, y:iz})
            }
        }
    
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true,
            exportEnabled: true,
            exportFileName: titulo,	
            title:{
                text: titulo
            },
            axisX: {
                title: datosx,
            },	
            axisY: {
                title: datosy1,
                titleFontColor: "#99A1C6",
                lineColor: "#99A1C6",
                labelFontColor: "#99A1C6",
                tickColor: "#99A1C6"
            },
            axisY2: {
                title: datosy2,
                titleFontColor: "#86DCBD",
                lineColor: "#86DCBD",
                labelFontColor: "#86DCBD",
                tickColor: "#86DCBD"
            },	
            toolTip: {
                shared: true
            },
            legend: {
                cursor:"pointer",
                itemclick: this.toggleDataSeries
            },
            data: [{
                type: "column",
                name: datosy1,
                legendText: datosy1,
                showInLegend: true, 
                dataPoints: puntos,
            },
            {
                type: "column",	
                name: datosy2,
                legendText: datosy2,
                axisYType: "secondary",
                showInLegend: true,
                dataPoints:puntos2,
            }]
        });
        chart.render();
    }

    plotGrafic(value) {
        var textObs = 'Observaciones';
        switch(value){
            case "0":
                    this.canvas.current.style.height = "0px";
                    this.canvas.current.innerHTML = "";
                break;
            case "1":
                this.canvas.current.style.height = "360px";
                this.graficoBarrasdeMediciones('Número de mediciones');
                break;
            case "2":
                this.canvas.current.style.height = "360px";
                this.graficoBarrasdeObservaciones('Número de observaciones');
                break;
            case "4":
                this.canvas.current.style.height = "360px";
                this.graficoCircular("Fase Lunar", ['Sicigia', 'Cuadratura'], 'luna');
                break;
            case "5":
                this.canvas.current.style.height = "360px";
                this.grafico('Velocidad promedio por Observaciones', textObs, 'Velocidades promedios', 'm/s', 'Velocidad');
                break;
            case "6":
                this.canvas.current.style.height = "360px";
                this.grafico('Tiempo promedio por Observaciones', textObs, 'Tiempos promedios', 's', 'Tiempo');
                break;
            case "7":
                this.canvas.current.style.height = "360px";
                this.grafico('Espacio promedio por Observaciones', textObs, 'Distancias promedios', 'm', 'Espacio');
                break;
            case "8":
                this.canvas.current.style.height = "360px";
                this.graficoColumnas('Dirección corriente litoral', textObs, 'Derecha', 'Izquierda')
                break;
        }
        
    }

    render() {
        let observaciones = this.state.observaciones

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
                                            <DataSearch/>
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

                                            <div className="col-12" id="chartContainer" ref={this.canvas}>
                                                    
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