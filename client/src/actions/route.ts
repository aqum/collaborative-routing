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
