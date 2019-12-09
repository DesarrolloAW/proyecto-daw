import React from 'react';

import {PaginationItem, PaginationLink, Pagination, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Table} from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BasicSearch from './BasicSearch';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));
  
function getSteps() {
    return ['Selección del usuario', 'Verificar que los datos correspondan con el usuario', 'Elegir el tipo de usuario'];
  }
  
function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <div id="cuadroUsuarios">
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input className="form-control-alternative" placeholder="Buscar usuarios" type="text"
                            
                            
                            
                            />
                        </InputGroup>
                    </FormGroup>
                    <BasicSearch/>
                    {/*<Table responsive hover size="sm">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Email</th>
                            <th scope="col" className="text-right">Tipo</th>
                            </tr>
                        </thead>

                        <tbody id="tabla" style={{background: 'white'}}>
                            <tr key={"row"}>
                                <th scope="row">{parseInt('1',10)}</th>
                                <td><a>saraujo</a></td>
                                <td>Steven</td>
                                <td>Araujo</td>
                                <td>saraujo@espol.edu.ec</td>
                                <td className="text-right">{parseInt('1',10)%2 === 0 ? 'Validator': 'Admin'}</td>
                            </tr>
                        </tbody>
                    </Table>*/}
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
                </div>
            );
        case 1:
            return (
                <div>
                    <h6>Cuadro del usuario</h6>
                </div>
            );
        case 2:
            return (
                <div>
                    <h6>Posibilidad de escoger el tipo de usuario</h6>
                    <button>Guardar</button>
                </div>
            );
        default:
            return 'Paso desconocido!';
    }
}

export default function TableComp(){
    /*
    $("#buscar").keyup(function(){
    //_this = this; //obtiene el texto escrito
    contenedor = {};
    contador = 0;
    indiceTabla = 1;
    for(let key in newDat){
        for(var i in newDat[key]){
            var str = String(newDat[key][i]);
            if(str.toLowerCase().indexOf( $(this).val().toLowerCase() ) != -1 ){
                contenedor[key] = newDat[key];
                contador+=1;
                filtro = true;
                break;
            }
        }
    }
    pags2 = Math.ceil(contador/10);
    document.querySelector('#total').textContent = 'Existen: '+contador+' coincidencias.';

    //Para saber si se manda todos los datos a la tabla o solo los datos filtrados
    if(Object.keys(newDat).length == contador){
        filtro = false;
        document.querySelector('#total').textContent = 'Existen: '+Object.keys(newDat).length+' observaciones.';
        lista = Object.keys(newDat).reverse();
        presentarTable(newDat,indiceTabla);    
    }else if(contador > 0){
        lista = Object.keys(contenedor).reverse();
        presentarTable(contenedor, indiceTabla);
    }else{
        lista = [];
        presentarTable({}, indiceTabla);
    }
}); */

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    // el paso opcional
    const isStepOptional = step => {
        return step === -1;
    };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;

        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("No se puede saltar este paso opcional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return(
        <div className={classes.root}>
            
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Opcional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <div className="pt-4">
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Finalizado!
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reiniciar
                        </Button>
                    </div>
                    ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>

                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Atras
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button} >
                                    Saltar
                                </Button>
                            )}

                            <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} >
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}