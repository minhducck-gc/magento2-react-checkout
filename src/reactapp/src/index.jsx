import React from 'react';
import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import { Box, Container } from '@mui/material';
import RootElement from './utils/rootElement';
import CheckoutForm from './components/CheckoutForm';
import AppDataProvider from './context/App/AppDataProvider';
import CartDataProvider from './context/Cart/CartDataProvider';
import CheckoutFormProvider from './context/Form/CheckoutFormProvider';

import './index.css';
import StepComponent from './components/StepperCheckout/StepComponent';
import ShippingStep from './components/StepperCheckout/ShippingStep';
import VerificationStep from './components/StepperCheckout/VerificationStep';

function PaymentStep() {
  const params = useParams();
  console.log(params);
  return <p>{params.applicationId}</p>;
}

function OrderSuccessStep() {}

function Checkout() {
  return (
    <AppDataProvider>
      <CartDataProvider>
        <CheckoutFormProvider>
          <Container maxWidth="lg">
            <BrowserRouter basename="/checkout">
              <Box alignItems="center" justifyContent="space-between">
                <StepComponent />
              </Box>
              <Routes>
                <Route path="/default" element={<CheckoutForm />} />
                <Route index element={<ShippingStep />} />
                <Route path="/shipping" element={<ShippingStep />} />
                <Route path="/verification" element={<VerificationStep />} />
                <Route
                  path="/payment/:applicationId"
                  element={<PaymentStep />}
                />
                <Route path="/success" element={<OrderSuccessStep />} />
              </Routes>
            </BrowserRouter>
          </Container>
        </CheckoutFormProvider>
      </CartDataProvider>
    </AppDataProvider>
  );
}

const root = createRoot(RootElement.getElement());

root.render(<Checkout />);
