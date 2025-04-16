import LocalStorage from '../../utils/localStorage';

const initialState = {
  checkoutAgreements: {},
  countriesLoaded: [],
  countryList: [],
  customer: {},
  customerAddressList: {},
  defaultBillingAddress: '',
  defaultShippingAddress: '',
  isLoggedIn: !!LocalStorage.getCustomerToken(),
  message: false,
  pageLoader: false,
  stateList: {},
  activeStep: 0,
};

export default initialState;
