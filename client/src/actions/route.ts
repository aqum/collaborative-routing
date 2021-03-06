import { LatLngLiteral } from 'leaflet';
import { setMapClickAction, fetchFinish, fetchStart } from './meta';
import { addComment, fetchAllComments } from './comments';

export const types = {
  INIT_ROUTE: 'route/INIT_ROUTE',
  FETCH_ROUTE: 'route/FETCH_ROUTE',
  FINISH_FETCH_ROUTE: 'route/FINISH_FETCH_ROUTE',
  SET_WAYPOINTS: 'route/SET_WAYPOINTS',
  SET_START: 'route/SET_START',
  SET_FINISH: 'route/SET_FINISH',
  APPLY_WAYPOINTS: 'route/APPLY_WAYPOINTS',
  MAKE_READ_ONLY: 'route/MAKE_READ_ONLY',
  CREATE_TOKEN: 'route/CREATE_TOKEN',
  FINISH_CREATE_TOKEN: 'route/FINISH_CREATE_TOKEN',
  SET_TOKEN: 'route/SET_TOKEN',
  SET_DETAILS: 'route/SET_DETAILS',
  SET_TITLE: 'route/SET_TITLE',
  RECEIVE_TITLE: 'route/RECEIVE_TITLE',
};

export function setStart(coordinates: LatLngLiteral) {
  return dispatch => {
    dispatch(setMapClickAction(setFinish));

    return dispatch({
      type: types.SET_START,
      payload: coordinates,
    });
  };
}

export function setFinish(coordinates: LatLngLiteral) {
  return dispatch => {
    dispatch(setMapClickAction(addComment));
    dispatch({
      type: types.SET_FINISH,
      payload: coordinates,
    });
  };
}

export function applyWaypoints(waypoints) {
  return {
    type: types.APPLY_WAYPOINTS,
    payload: waypoints,
  };
}

export function setWaypoints(waypoints) {
  return {
    type: types.SET_WAYPOINTS,
    payload: waypoints,
  };
}

export function makeReadOnly() {
  return {
    type: types.MAKE_READ_ONLY,
  };
}

export function fetchRoute(routeId: number) {
  return dispatch => {
    dispatch({
      type: types.INIT_ROUTE,
      payload: { routeId },
    });
    dispatch(fetchStart());
    dispatch({
      type: types.FETCH_ROUTE,
    });
    dispatch(fetchAllComments());
  };
}

export function finishFetchRoute(details) {
  return dispatch => {
    if (details.waypoints.length > 0) {
      dispatch(setMapClickAction(addComment));
    }

    dispatch(fetchFinish());
    dispatch({
      type: types.FINISH_FETCH_ROUTE,
      payload: details,
    });
  };
}

export function createToken(routeId: number) {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.CREATE_TOKEN,
      payload: { routeId },
    });
  };
}

export function finishCreateToken(accessToken: string) {
  return dispatch => {
    dispatch(fetchFinish());
    dispatch({
      type: types.FINISH_CREATE_TOKEN,
      payload: { accessToken },
    });
  };
}

export function setToken(accessToken) {
  return dispatch => {
    dispatch({
      type: types.SET_TOKEN,
      payload: { accessToken },
    });
  };
}

export function setDetails({ duration, distance }) {
  return {
    type: types.SET_DETAILS,
    payload: { duration, distance },
  };
}

export function setTitle(title: string) {
  return {
    type: types.SET_TITLE,
    payload: title,
  };
}

export function receiveTitle(title: string) {
  return {
    type: types.RECEIVE_TITLE,
    payload: title,
  };
}
