import { LatLngLiteral } from 'leaflet';
import { setMapClickAction } from './meta';
import { addComment } from './comments';

export const types = {
  SET_START: 'route/SET_START',
  SET_FINISH: 'route/SET_FINISH',
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

    return dispatch({
      type: types.SET_FINISH,
      payload: coordinates,
    });
  };
}