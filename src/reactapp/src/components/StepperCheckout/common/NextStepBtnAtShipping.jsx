import React, { useCallback } from 'react';
import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';

import Button from '../../common/Button';
import {
  LOGIN_FORM,
  SHIPPING_METHOD,
  SHIPPING_ADDR_FORM,
} from '../../../config';
import { __ } from '../../../i18n';
import { focusOnFormErrorElement, scrollToElement } from '../../../utils/form';
import usePlaceOrderAppContext from '../../placeOrder/hooks/usePlaceOrderAppContext';
import {
  hasLoginErrors,
  hasShippingAddressErrors,
  hasShippingMethodErrors,
} from '../../placeOrder/utility';
import useAppContext from '../../../hook/useAppContext';

const customerWantsToSignInField = `${LOGIN_FORM}.customerWantsToSignIn`;

function NextStepBtnAtShipping() {
  const formikData = useFormikContext();
  const { setMessage, setErrorMessage } = usePlaceOrderAppContext();
  const { values, errors, dirty, setFieldTouched } = formikData;
  const { activeStep, setActiveStep } = useAppContext();

  const handlePerformNextStep = useCallback(() => {
    setMessage(false);
    const focusActions = { setFieldTouched };

    if (!dirty) {
      return;
    }

    if (hasLoginErrors(errors)) {
      const customerWantsToSignIn = _get(values, customerWantsToSignInField);
      setErrorMessage(
        __(
          customerWantsToSignIn
            ? 'Please provide your login details.'
            : 'Please provide your email address.'
        )
      );
      focusOnFormErrorElement(LOGIN_FORM, errors, focusActions);
      return;
    }

    if (hasShippingAddressErrors(errors)) {
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnFormErrorElement(SHIPPING_ADDR_FORM, errors, focusActions);
      return;
    }

    if (hasShippingMethodErrors(errors)) {
      setErrorMessage(__('Please select your shipping method.'));
      scrollToElement(SHIPPING_METHOD);
      return;
    }

    try {
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.error(error);
    }
  }, [
    activeStep,
    dirty,
    errors,
    setActiveStep,
    setErrorMessage,
    setFieldTouched,
    setMessage,
    values,
  ]);

  return (
    <div className="flex items-center justify-center py-4">
      <Button
        size="lg"
        disable={!dirty}
        variant="primary"
        click={handlePerformNextStep}
      >
        {__('Next')}
      </Button>
    </div>
  );
}

export default NextStepBtnAtShipping;
