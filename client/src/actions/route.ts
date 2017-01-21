import { LatLngLiteral } from 'leaflet';
import { setMapClickAction } from './meta';

export const types = {
  SET_START: 'route/SET_START',
  SET_FINISH: 'route/SET_FINISH',
  CREATE_ROUTE: 'route/CREATE_ROUTE',
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
    dispatch(setMapClickAction(null));
    dispatch({
      type: types.SET_FINISH,
      payload: coordinates,
    });
    dispatch(createRoute());
  };
}

export function createRoute() {
  return {
    type: types.CREATE_ROUTE,
  };
}
