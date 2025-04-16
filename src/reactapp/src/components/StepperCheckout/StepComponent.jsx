import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Step, StepLabel, Stepper } from '@mui/material';
import useAppContext from '../../hook/useAppContext';
import { appSteps } from '../../context/App/appSteps';

export default function StepComponent() {
  const appContext = useAppContext();
  const { setActiveStep, activeStep } = appContext;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const step = appSteps.find(({ url }) => url === location.pathname);
    setActiveStep(step?.id || 0);
  }, [location, setActiveStep]);

  useEffect(() => {
    const nextStep = appSteps.find(({ id }) => activeStep === id);
    if (!nextStep) {
      return;
    }
    navigate(nextStep.url);
  }, [activeStep, navigate]);

  const handleOnClickStep = useCallback(
    (stepNumber) => {
      const nextStep = appSteps.find((step) => step.id === stepNumber);
      if (!nextStep) {
        return;
      }
      if (nextStep.id < activeStep) {
        setActiveStep(nextStep.id);
        navigate(nextStep.url);
      }
    },
    [activeStep, navigate, setActiveStep]
  );

  return (
    <Stepper activeStep={activeStep}>
      {appSteps.map(({ id, code, label, icon }) => (
        <Step key={code} onClick={() => handleOnClickStep(id)}>
          <StepLabel
            className="active"
            icon={icon}
            sx={{
              fontSize: '50px',
              fontWeight: 'bold',
              flexDirection: 'column',
              filter: activeStep !== id ? 'grayscale(1)' : 'grayscale(0)',
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
