import { fetchFinish, fetchStart } from './meta';

export const types = {
  FETCH_ROUTES_LIST: 'meta/FETCH_ROUTES_LIST',
  FINISH_FETCH_ROUTES_LIST: 'meta/FINISH_FETCH_ROUTES_LIST',
};

export function finishFetchRoutesList(routes) {
  return dispatch => {
    dispatch(fetchFinish());
    dispatch({
      type: types.FINISH_FETCH_ROUTES_LIST,
      payload: routes,
    });
  };
}

export function fetchRoutesList() {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.FETCH_ROUTES_LIST,
    });
  };
}
