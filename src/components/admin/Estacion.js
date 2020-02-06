import React from "react";
import '../../assets/css/login.css';
import {
    Button,
    FormGroup,
    Form,
    Row,
    Col,
    Label,
} from "reactstrap";
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';
import { geolocated } from "react-geolocated"

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const api = "pk.eyJ1Ijoia2VubnljYW1iYSIsImEiOiJjanlkZHh0YTEwbTFtM21vY2xrdHR2YXM0In0.oH3K5cJipTZlRKf8AdVSfg"
const Map = ReactMapboxGl({
    accessToken: api
});

var marker = null;
var popup = null;

class Estacion extends React.Component {

    constructor(args) {
        super(args);
        this.geolocated = this.geoLocate.bind(this);
        this.lat = React.createRef();
        this.lng = React.createRef();
        this.prov = React.createRef();
        this.cant = React.createRef();
        this.parr = React.createRef();
        this.nombre = React.createRef();
        this.img = React.createRef();
        this.state = {
            mapa: {},
            isLoad: false,
            provs: {},
            provLoad: false,
            station: {},
            statload: false,
        }
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.provChange = this.provChange.bind(this);
        this.cantChange = this.cantChange.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:8000/provincias/')
        .then(res => res.json())
        .then(res => this.setState({ provs: res, provLoad: true }))
        .catch(() => this.setState({ isLoad: false }));
        this.setState({statload: false});
    }

    componentWillReceiveProps(){
        this.setState({statload: false});
    }

    addMaker(lat, lng) {
        if (marker != null) {
            marker._element.remove();
            popup.remove();
        }
        marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat({ lng: lng, lat: lat })
            .addTo(this.state.mapa);

        popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false
        });

        var map = this.state.mapa;

        marker._element.onmouseenter = function () {
            var cor = marker._lngLat
            popup.setLngLat(cor);
            popup.setHTML('<div><p>Lat: ' + cor.lat + '</p> <p> Lng: ' + cor.lng + '<p/></div>');
            popup.addTo(map);
        }

        marker._element.onmouseleave = function () {
            popup.remove();
        }

        marker.on("dragend", () => this.fullInput(marker._lngLat.lat, marker._lngLat.lng));
    }

    fullInput(lat, lng) {
        this.lat.current.value = lat;
        this.lng.current.value = lng;
        /*var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + api;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                var geo = json.features[0];
                this.cant.current.value = geo.context[0].text;
                this.prov.current.value = geo.context[1].text;
            })
            .catch(() => alert("Por favor, llene los campos de localización"))*/
    }

    geoLocate(props) {
        if (!props.isGeolocationAvailable) {
            alert("Your browser does not support Geolocation");
        } else if (!props.isGeolocationEnabled) {
            alert("Geolocation is not enabled");
        } else {
            var lat = props.coords.latitude;
            var lng = props.coords.longitude;
            if (this.state.isLoad) {
                this.state.mapa.flyTo({
                    center: [lng, lat],
                    zoom: 15
                });
                this.addMaker(lat, lng);
            }
            this.fullInput(lat, lng);
        }
    }

    hide(id) {
        var a = document.getElementById(id);
        a.className = "d-none";
    }

    show(id) {
        var a = document.getElementById(id);
        a.className = "";
    }

    provChange(value){
        var cantones = this.cant.current;
        cantones.innerHTML = "";
        var parroquias = this.parr.current;
        parroquias.innerHTML = "";
        var op = document.createElement("option");
        op.value = "0";
        cantones.appendChild(op);
        fetch("http://localhost:8000/cantones/?id_provincia=" + value)
        .then(res => res.json())
        .then(cants => {
            for(var c in cants){
                var option = document.createElement("option");
                option.value = c;
                option.text = cants[c];
                cantones.appendChild(option);
            }
            this.cant.current.value = this.state.station.canton || "0";
        });
    }

    cantChange(value){
        var parroquias = this.parr.current;
        parroquias.innerHTML = "";
        var op = document.createElement("option");
        op.value = "0";
        parroquias.appendChild(op);
        fetch("http://localhost:8000/parroquias/?id_canton=" + value)
        .then(res => res.json())
        .then(parrs => {
            for(var p in parrs){
                var option = document.createElement("option");
                option.value = p;
                option.text = parrs[p];
                parroquias.appendChild(option);
            }
            this.parr.current.value = this.state.station.parroquia || "0";
        });
    }

    loadForm(){
        if(!this.state.statload){
            fetch('http://localhost:8000/estacion/?id_estacion='+this.props.oid)
            .then(res => res.json())
            .then(res => {
                this.setState({station: res, statload: true})
                this.prov.current.value = this.state.station.provincia;
                this.img.current.value = this.state.station.img;
                this.nombre.current.value = this.state.station.nombre;
                this.lat.current.value = this.state.station.lat;
                this.lng.current.value = this.state.station.lng;
                this.provChange(this.state.station.provincia);
                this.cantChange(this.state.station.canton);
                this.addMaker(this.state.station.lat, this.state.station.lng);
            })
            .catch(() => this.setState({statload: false}));
            
        }
    }

    update = (e) => {
        e.preventDefault();
        var data = new Object();
        data.nombre = this.nombre.current.value;
        data.latitud = this.lat.current.value;
        data.longitud = this.lng.current.value;
        data.parroquia = this.parr.current.value;
        data.img = this.img.current.value;
        data.id = this.props.nid;
        fetch("http://localhost:8000/actualizar_estacion/"+this.props.oid,
            {
                method: 'PUT',
                body: JSON.stringify(data)
            }
        ).then(res => res.text())
        .then(res => console.log(res));
    }

    delete = (e) => {
        e.preventDefault();
        var result = window.confirm("Desea eliminar esta estación?\nTodas las observaciones de la estacion seran eliminadas");
        if(result){
            fetch("http://localhost:8000/borrar_estacion/"+this.props.oid,
            {
                method: 'DELETE',
                body: JSON.stringify({id: this.props.nid})
            })
        .then(res => res.text())
        .then(res => window.location.replace("http://localhost:3000/admin"));
        }
        
    }

    render() {
        var id = this.props.oid;
        if(id != null){
            this.loadForm();
        }        
        if (this.state.isLoad) {
            this.state.mapa.on("click", (e) => {
                this.addMaker(e.lngLat.lat, e.lngLat.lng);
                this.fullInput(e.lngLat.lat, e.lngLat.lng)
            });
        }
        var provincias = {};
        if(this.state.provLoad)
            provincias = this.state.provs;
        return (
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
                    <Form action="http://localhost:8000/crear_estacion/" method="POST" id="formulario">
                        <h3 className="text-center colorTitle">{id == null? <strong>Registro de Estación</strong>: <strong>Modificar Estación ({id})</strong>}</h3>
                        <FormGroup>
                            <Label for="EjemploNombre">Nombre</Label>
                            <input type="text" className="form-control" ref={this.nombre} name="nombre" id="EjemploNombre" placeholder="Escriba el nombre" />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="EjemploLatitud">Latitud</Label>
                                    <input type="number" step="0.00000000000001" className="form-control" ref={this.lat} name="latitud" id="EjemploLatitud" placeholder="Indique la latitud" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="EjemploLongitud">Longitud</Label>
                                    <input type="number" step="0.00000000000001" className="form-control" ref={this.lng} name="longitud" id="EjemploLatitud" placeholder="Indique la longitud" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="EjemploProvincia">Provincia</Label>
                                    <select className="form-control" ref={this.prov} name="provincia" id="EjemploProvincia" placeholder="Escoga la provincia" onChange={() => this.provChange(this.prov.current.value)}>
                                        <option value="0"></option>
                                        {Object.keys(provincias).map((k) => (
                                            <option value={k}>{provincias[k]}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <Map style={"mapbox://styles/mapbox/streets-v8"}
                                    containerStyle={{
                                        height: '40vh',
                                    }}
                                    center={[-79.183403, -1.831239]}
                                    zoom={[5]}
                                    onStyleLoad={map => {
                                        this.setState({ isLoad: true, mapa: map });
                                    }}>
                                    <div id="controls">
                                        <ZoomControl />
                                        <img
                                            id="locate"
                                            src="https://osl.ugr.es/CTAN/graphics/asymptote/GUI/res/icons/android-locate.svg"
                                            onClick={() => this.geoLocate(this.props)} />
                                    </div>
                                </Map>
                            </div>
                        </Row>

                        <Row>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="EjemploCanton">Canton</Label>
                                    <select className="form-control" ref={this.cant} name="canton" id="EjemploCanton" placeholder="Escoja el canton" onChange={() => this.cantChange(this.cant.current.value)}>

                                    </select>
                                </FormGroup>
                            </div>
                            <div className="container-fluid col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="EjemploParroquia">Parroquia</Label>
                                    <select className="form-control" ref={this.parr} name="parroquia" id="EjemploParroquia" placeholder="Escoga la parroquia">

                                    </select>
                                </FormGroup>
                            </div>
                        </Row>
                        <FormGroup>
                            <Label for="EjemploImagen">Foto estacion (URL)</Label>
                            <input type="text" className="form-control" ref={this.img} name="img" id="EjemploImagen" placeholder="Imagen (URL)"/>
                        </FormGroup>
                        {id == null ? <Button>Guardar</Button> :
                        <div><Button onClick={e => this.update(e)}>Guardar</Button>    <Button onClick={e => this.delete(e)}>Eliminar</Button></div>}
                        <p></p>
                        <p></p>
                        <p></p>
                    </Form>
                </section>
            </main>);
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Estacion);