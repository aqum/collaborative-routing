import { makeReadOnly, setToken } from './route';
import { MapMode } from '../interfaces/map-mode.enum';

export const types = {
  FETCH_START: 'meta/FETCH_START',
  FETCH_FINISH: 'meta/FETCH_FINISH',
  SET_MAP_CLICK_ACTION: 'meta/SET_MAP_CLICK_ACTION',
  SET_MAP_MODE: 'meta/SET_MAP_MODE',
  SET_ROUTE_CHANNEL: 'meta/SET_ROUTE_CHANNEL',
  AUTHORIZATION_FAILED: 'meta/AUTHORIZATION_FAILED',
};

export function fetchStart() {
  return {
    type: types.FETCH_START,
  };
}

export function fetchFinish(message = '') {
  if (message) {
    alert(message);
  }

  return {
    type: types.FETCH_FINISH,
  };
}

export function setMapClickAction(action: Function) {
  return {
    type: types.SET_MAP_CLICK_ACTION,
    payload: action,
  };
}

export function setMapMode(mode: MapMode) {
  return dispatch => {
    if (mode === MapMode.Suggest) {
      dispatch(makeReadOnly());
    }

    dispatch({
      type: types.SET_MAP_MODE,
      payload: mode,
    });
  };
}

export function setRouteChannel(channel) {
  return {
    type: types.SET_ROUTE_CHANNEL,
    payload: channel,
  };
}

export function authorizationFailed() {
  return dispatch => {
    dispatch(setToken(undefined));
    dispatch( {
      type: types.AUTHORIZATION_FAILED,
    });
  };
}
