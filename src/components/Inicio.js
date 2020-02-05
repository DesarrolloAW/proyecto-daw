import React from 'react';
//import '../assets/css/inicio.css';
import Carousels from './Carousels'
import ReactMapboxGl, {ZoomControl, RotationControl, Layer, Feature, Popup} from 'react-mapbox-gl';
import {Card, CardBody} from 'reactstrap';

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoia2VubnljYW1iYSIsImEiOiJjanlkZHh0YTEwbTFtM21vY2xrdHR2YXM0In0.oH3K5cJipTZlRKf8AdVSfg"
});


class Inicio extends React.Component{
    
    constructor(args){
        super(args);
        this.state = {
            hasErrors: false,
            stations: {},
            obs: {},
            obsError: false,
            isLoading: true,
            //INTRO
            stepsEnabled: false,
            initialStep: 0,
            steps: [
                {
                    element: '.mapboxgl-canvas',
                    intro: 'En este mapa se podran observar las estaciones con su localización.',
                },
                {
                    element: '.QueHacemos',
                    intro: 'Que hacemos?',
                },
                {
                    element: '.Mision',
                    intro: 'Mision!',
                },
                {
                    element: '.Vision',
                    intro: 'Vision!',
                },
                {
                    element: '.carousel',
                    intro: 'Resumen de noticias.',
                },
                {
                    element: '.redesSociales',
                    intro: 'Redes sociales.',
                },
                {
                    element: '#quienesSomosFooter',
                    intro: 'Aquí se podra saber un poco mas acerca de nosotros.',
                },
                {
                    element: '#desarrolladoresFooter',
                    intro: 'Información acerca de los desarrolladores',
                },
            ],
            hintsEnabled: true,
            hints: [
                {
                    element: '.mapboxgl-canvas',
                    hint: 'En este mapa se podran observar las estaciones con su localización.',
                    hintPosition: 'middle-right',
                },
                {
                    element: '#cardInicio',
                    hint: 'Aquí información importante de la página web.',
                    hintPosition: 'middle-right',
                },
                {
                    element: '.carousel',
                    hint: 'Última noticias de las estaciones.',
                    hintPosition: 'middle-right',
                },
            ]
        };
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    hide(id){
        var a = document.getElementById(id);
        a.className = "d-none";
    }

    show(id){
        var a = document.getElementById(id);
        a.className = "";
    }

    componentDidMount(){
        fetch('http://localhost:3001/stations')
      .then(res => res.json())
      .then(res => this.setState({ stations: res }))
      .catch(() => this.setState({ hasErrors: true }));

      fetch('http://localhost:8000/observaciones/')
      .then(res => res.json())
      .then(res => this.setState({ obs: res, isLoading: false }))
      .catch(() => this.setState({ obsError: true }));

    }

    formatDate(date){
        var dd = date.getDate();
        var mm = date.getMonth() + 1; 
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        } 
        return dd + '/' + mm + '/' + yyyy;
    }

    getData(obs){
        var list = {};
        for(var id in obs){
            var ob = obs[id];
            var sta = ob["estacion"]
            if(!list.hasOwnProperty(sta["id"])){
                var item = {};
                list[sta["id"]] = item;
                item["id"] = sta["id"];
                item['src'] = sta["img"];
                item['altText'] = sta["Parroquia"];
                item["header"] = sta["Parroquia"];
                item["nombre"] = sta["nombre"];
                item["fecha"] = [ob["fecha"]];
                let alt = 0;
                let vien = 0;
                for(var i in ob["mediciones"]){
                    let med = ob["mediciones"][i];
                    alt += med["olas"]["altura_promedio"];
                    vien += med["viento"]["velocidad"];
                }
                item["altura"] = [alt/ob["mediciones"].length];
                item["viento"] = [vien/ob["mediciones"].length];
            }else{
                list[sta["id"]]["fecha"].push(ob["fecha"]);
                let alt = 0;
                let vien = 0;
                for(var j in ob["mediciones"]){
                    let med = ob["mediciones"][j];
                    alt += med["olas"]["altura_promedio"];
                    vien += med["viento"]["velocidad"];
                }
                list[sta["id"]]["altura"].push(alt/ob["mediciones"].length);
                list[sta["id"]]["viento"].push(vien/ob["mediciones"].length);
            }            
        }

        var result = [];
        
        for(var key in list){
            var fechas = list[key]["fecha"];
            for(var k=0; k<fechas.length; k++){
                var f = fechas[k].split("-");
                fechas[k] = new Date(parseInt(f[0]), parseInt(f[1]), parseInt(f[2]));
            }
            var max = fechas.reduce(function (a, b) { return a > b ? a : b; });
            var index = fechas.indexOf(max);
            list[key]["obs"] = list[key]["fecha"].length;
            list[key]["fecha"] = list[key]["fecha"][index];
            list[key]["altura"] = list[key]["altura"][index].toFixed(2);
            list[key]["viento"] = list[key]["viento"][index].toFixed(2);
            list[key]["caption"] = list[key]["nombre"] + ": El " + this.formatDate(list[key]["fecha"]) + " se registraron olas de " + list[key]["altura"] + " m. de altura y vientos con velocidades de " + list[key]["viento"] + " m/s."
            result.push(list[key]);
        }
        return [list, result];
    }

    render(){
        const stations = this.state.stations;
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;
        const obs = this.state.obs;
        var datos = this.getData(obs);
        var sts = datos[0];
    
        return(
            <>
                <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={this.onExit.bind(this)}
                />
                <Hints
                enabled={hintsEnabled}
                hints={hints}
                />

                <div className="position-relative">
                    <section className="section section-lg section-shaped pb-250">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>

                        {/* Mapa */}
                        <div className="text-center pb-5">
                            
                            <div  className="container-fluid col-md-9 col-sm-9" id="map">
                                <Map style="mapbox://styles/mapbox/streets-v8" 
                                    containerStyle={{
                                        height: '80vh',
                                    }}
                                    center={[-79.183403, -1.831239]}
                                    zoom={[6]}>
                                        <div id="controls">
                                            <ZoomControl/>
                                            <RotationControl/>
                                        </div>
                                        <div id="markers">
                                        { Object.keys(stations).map(k =>(
                                            <div key={"maker" + stations[k].id}>
                                                <Layer type="symbol"
                                                id={stations[k].id+""}
                                                layout={{'icon-image': 'marker-15'}}>
                                                    <Feature coordinates={[stations[k].coord.lng, stations[k].coord.lat]} 
                                                    onMouseEnter={() => this.show("popup" + stations[k].id)}
                                                    onMouseLeave={() => this.hide("popup" + stations[k].id)}/>
                                                </Layer>
                                                <div className="d-none" id={"popup" + stations[k].id}>
                                                    <Popup
                                                        coordinates={[stations[k].coord.lng, stations[k].coord.lat]}>
                                                        <div>
                                                            <strong>Nombre: </strong>{stations[k].name} <br/>
                                                            <strong>Ubicación: </strong> {stations[k].parish}, cantón  {stations[k].canton},<br></br>
                                                            provincia de {stations[k].province}<br/>
                                                            <strong>Total de observaciones: </strong>{this.state.isLoading || sts[stations[k].id+""] == null ? "..." : sts[stations[k].id+""].obs}<br/>
                                                            <strong>Última observación: </strong>{this.state.isLoading || sts[stations[k].id+""] == null ? "..." : this.formatDate(sts[stations[k].id+""].fecha)}
                                                        </div>        
                                                    </Popup>
                                                </div>
                                            </div> 
                                        ))}
                                    </div>
                                </Map>
                            </div>
                            <i className="fa fa-question-circle fa-lg primaryColor" onClick={this.intro.bind(this)} aria-hidden="true"></i>

                        </div>

                        {/* SVG separator la diagonal */}
                        <div className="separator separator-bottom separator-skew">
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" >
                                <polygon className="fill-white" points="2560 0 2560 100 0 100" />
                            </svg>
                        </div>   
                    </section>
                </div>
                
                <section className="section section-lg pt-lg-0 mt--200">
                    <div className="container">
                        <Card className=" shadow border-0" id="cardInicio">{/*card-lift--hover esta clase para efecto de posicion de mouse*/}
                            <CardBody className="py-5">
                                <div className="QueHacemos">
                                    <h2 className="text-left primaryColor">¿Qué hacemos?</h2>
                                    <p className="text-justify">
                                        Somos un centro de investigación, dentro de ESPOL, enfocado en comprender los riesgos de los desastres naturales y fortalecer su gobernanza con el propósito de reducir los riesgos existentes y prevenir la aparucuón de otros nuevos.
                                    </p>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6 text-justify Mision"> 
                                        <h2 className="primaryColor">Misión</h2>
                                        <p>
                                        Consolidar información marino-costera del litoral ecuatoriano para mejorar la capacidad de toma de decisiones sobre los diversos procesos costeros y el análisis de las características de las playas, a través de gráficos estadísticos.
                                        </p>
                                    </div>
                                    
                                    <div className="col-md-6 text-justify Vision"> 
                                        <h2 className="primaryColor">Visión</h2>
                                        <p>
                                        Crear estadísticas internacionales de las diferentes variables que intervienen en los procesos costeros con el fin de entender su influencia en la población mundial.
                                        </p>
                                    </div>    
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </section>
                            
                <section className="section bg-secondary">
                    <div className="container">
                        <Carousels items={!this.state.isLoading ? datos[1] : []}></Carousels>
                    </div>
                </section>
            </>
        );
    };
    
    onExit(e){
        this.setState(() => ({ stepsEnabled: false }));
    };
    intro(e){
        this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }) );
    };
}

export default Inicio;