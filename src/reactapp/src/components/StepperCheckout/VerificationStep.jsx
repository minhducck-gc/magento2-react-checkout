import React, { useEffect, useState } from 'react';

import Totals from '../totals';
import CartItemsForm from '../items';
import Message from '../common/Message';
import PageLoader from '../common/Loader';
import StickyRightSidebar from '../StickyRightSidebar';
import { config } from '../../config';
import { aggregatedQueryRequest } from '../../api';
import LocalStorage from '../../utils/localStorage';
import useCheckoutFormContext from '../../hook/useCheckoutFormContext';
import useCheckoutFormAppContext from './hooks/useCheckoutFormAppContext';
import useCheckoutFormCartContext from './hooks/useCheckoutFormCartContext';
import BillingAddress from '../billingAddress';
import PaymentMethod from '../paymentMethod';
import CouponCode from '../couponCode';
import { AddressWrapper } from '../address';
import CheckoutAgreements from '../checkoutAgreements';
import PlaceOrderSingpass from '../placeOrder/components/PlaceOrderSingpass';

function VerificationStep() {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { storeAggregatedFormStates } = useCheckoutFormContext();
  const { storeAggregatedCartStates } = useCheckoutFormCartContext();
  const { pageLoader, appDispatch, setPageLoader, storeAggregatedAppStates } =
    useCheckoutFormAppContext();

  /**
   * Collect App, Cart data when the page loads.
   */
  useEffect(() => {
    if (isRequestSent) {
      return;
    }

    if (!LocalStorage.getCartId()) {
      LocalStorage.saveCartId(config.cartId);
    }

    (async () => {
      try {
        setPageLoader(true);
        setIsRequestSent(true);
        const data = await aggregatedQueryRequest(appDispatch);
        storeAggregatedCartStates(data);
        storeAggregatedAppStates(data);
        storeAggregatedFormStates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [
    appDispatch,
    isRequestSent,
    setPageLoader,
    storeAggregatedAppStates,
    storeAggregatedCartStates,
    storeAggregatedFormStates,
  ]);

  return (
    <>
      <Message />
      <div className="flex justify-center">
        <div className="container">
          <div className="flex flex-col my-6 space-y-2 md:flex-row md:space-y-0">
            <div className="w-full lg:w-3/5 md:mr-2">
              <div className="w-full space-y-2 md:max-w-md xl:max-w-full">
                <AddressWrapper>
                  <BillingAddress />
                  <PaymentMethod />
                </AddressWrapper>
                <CouponCode />
                <CheckoutAgreements />

                <PlaceOrderSingpass />
              </div>
            </div>

            <StickyRightSidebar>
              <CartItemsForm />
              <Totals />
            </StickyRightSidebar>
          </div>
          {pageLoader && <PageLoader />}
        </div>
      </div>
    </>
  );
}

export default VerificationStep;
