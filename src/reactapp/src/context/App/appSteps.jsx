import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PaymentIcon from '@mui/icons-material/Payment';
import { __ } from '../../i18n';

export const appSteps = [
  {
    id: 0,
    label: __('Delivery Information'),
    code: 'shipping',
    url: '/shipping',
    icon: <LocalShippingIcon color="secondary" fontSize="inherit" />,
    activeIcon: <CheckCircleOutlineIcon color="primary" fontSize="inherit" />,
  },
  {
    id: 1,
    label: __('Verification'),
    code: 'verification',
    url: '/verification',
    icon: <FingerprintIcon color="secondary" fontSize="inherit" />,
    activeIcon: <CheckCircleOutlineIcon color="primary" fontSize="inherit" />,
  },
  {
    id: 2,
    label: __('Payment Information'),
    code: 'payment',
    url: '/payment/',
    icon: <PaymentIcon color="secondary" fontSize="inherit" />,
    activeIcon: <CheckCircleOutlineIcon color="primary" fontSize="inherit" />,
  },
];
