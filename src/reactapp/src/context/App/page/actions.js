import { SET_PAGE_LOADER, SET_PAGE_MESSAGE, SET_CURRENT_STEP } from './types';

export function setPageLoaderAction(dispatch, loader) {
  dispatch({
    type: SET_PAGE_LOADER,
    payload: loader,
  });
}

export function setMessageAction(dispatch, message) {
  dispatch({
    type: SET_PAGE_MESSAGE,
    payload: message,
  });
}

export function setSuccessMessageAction(dispatch, message) {
  setMessageAction(dispatch, { type: 'success', message });
}

export function setErrorMessageAction(dispatch, message) {
  setMessageAction(dispatch, { type: 'error', message });
}

export function setStepAction(dispatch, step) {
  dispatch({
    type: SET_CURRENT_STEP,
    payload: step,
  });
}
