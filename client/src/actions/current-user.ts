import { fetchFinish, fetchStart } from './meta';

export const types = {
  FETCH_ROUTES_LIST: 'current-user/FETCH_ROUTES_LIST',
  FINISH_FETCH_ROUTES_LIST: 'current-user/FINISH_FETCH_ROUTES_LIST',
  CREATE_ROUTE: 'current-user/CREATE_ROUTE',
  FINISH_CREATE_ROUTE: 'current-user/FINISH_CREATE_ROUTE',
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

export function createRoute() {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.CREATE_ROUTE,
    });
  };
}

export function finishCreateRoute(route) {
  return dispatch => {
    dispatch(fetchFinish());
    dispatch({
      type: types.FINISH_CREATE_ROUTE,
      payload: route,
    });
  };
}
