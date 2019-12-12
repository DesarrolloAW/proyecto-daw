import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BasicSearch from './BasicSearch';
import FormUser from './FormUser';

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
                    <BasicSearch columns={[
                        { title: 'Id', field: 'id' },
                        { title: 'Usuario', field: 'user' },
                        { title: 'Nombre', field: 'name' },
                        { title: 'Apellido', field: 'apellido'},
                        { title: 'Email', field: 'email' },
                        { title: 'Rol', field: 'rol'}]
                    }/>
                </div>
            );
        case 1:
            return (
                <div>
                    <FormUser/>
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

                        <div className="mb-5">
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