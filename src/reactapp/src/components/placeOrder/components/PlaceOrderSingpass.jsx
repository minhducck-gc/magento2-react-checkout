import React from 'react';
import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';

import Button from '../../common/Button';
import {
  LOGIN_FORM,
  SHIPPING_METHOD,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../config';
import {
  hasLoginErrors,
  hasPaymentMethodErrors,
  hasBillingAddressErrors,
  hasShippingMethodErrors,
  hasShippingAddressErrors,
  hasTermsAndConditionsAgreed,
} from '../utility';
import { __ } from '../../../i18n';
import usePlaceOrder from '../hooks/usePlaceOrder';
import usePlaceOrderAppContext from '../hooks/usePlaceOrderAppContext';
import usePlaceOrderCartContext from '../hooks/usePlaceOrderCartContext';
import useCheckoutFormContext from '../../../hook/useCheckoutFormContext';
import { focusOnFormErrorElement, scrollToElement } from '../../../utils/form';
import useAppContext from '../../../hook/useAppContext';

const customerWantsToSignInField = `${LOGIN_FORM}.customerWantsToSignIn`;

function PlaceOrderSingpass() {
  const formikData = useFormikContext();
  const validateThenPlaceOrder = usePlaceOrder();
  const { isVirtualCart } = usePlaceOrderCartContext();
  const { executeBeforePlaceOrderActions } = useCheckoutFormContext();
  const { setMessage, setErrorMessage, setPageLoader } =
    usePlaceOrderAppContext();
  const { values, errors, dirty, setFieldTouched } = formikData;
  const focusActions = { setFieldTouched };
  const { setActiveStep } = useAppContext();

  const handlePerformPlaceOrder = async () => {
    setMessage(false);

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

    if (hasShippingAddressErrors(errors) || true) {
      setActiveStep(0);
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnFormErrorElement(SHIPPING_ADDR_FORM, errors, focusActions);
      return;
    }

    if (hasBillingAddressErrors(errors, values, isVirtualCart)) {
      setErrorMessage(__('Please provide your billing address information.'));
      focusOnFormErrorElement(BILLING_ADDR_FORM, errors, focusActions);
      return;
    }

    if (hasShippingMethodErrors(errors)) {
      setActiveStep(0);
      setErrorMessage(__('Please select your shipping method.'));
      scrollToElement(SHIPPING_METHOD);
      return;
    }

    if (hasPaymentMethodErrors(errors)) {
      setErrorMessage(__('Please select your payment method.'));
      scrollToElement(PAYMENT_METHOD_FORM);
      return;
    }

    if (hasTermsAndConditionsAgreed(errors)) {
      setErrorMessage(__('Please agree with the terms & conditions'));
      scrollToElement(CHECKOUT_AGREEMENTS_FORM);
      return;
    }

    try {
      setPageLoader(true);
      await executeBeforePlaceOrderActions(formikData);
      await validateThenPlaceOrder(values);
      setPageLoader(false);
    } catch (error) {
      console.error(error);
      setPageLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      <Button
        size="lg"
        disable={!dirty}
        variant="primary"
        click={handlePerformPlaceOrder}
      >
        {__('Retrieve MyInfo with Singpass')}
      </Button>
    </div>
  );
}

export default PlaceOrderSingpass;
