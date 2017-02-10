import { LatLngLiteral } from 'leaflet';
import { setMapClickAction } from './meta';
import { addComment } from './comments';

export const types = {
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
