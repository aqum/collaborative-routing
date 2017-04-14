import { fetchFinish, fetchStart } from './meta';
import { AuthService } from '../utils/auth0.service';

export const types = {
  FETCH_ROUTES_LIST: 'current-user/FETCH_ROUTES_LIST',
  FINISH_FETCH_ROUTES_LIST: 'current-user/FINISH_FETCH_ROUTES_LIST',
  CREATE_ROUTE: 'current-user/CREATE_ROUTE',
  FINISH_CREATE_ROUTE: 'current-user/FINISH_CREATE_ROUTE',
  FETCH_PROFILE: 'currentUser/FETCH_PROFILE',
  FINISH_FETCH_PROFILE: 'currentUser/FINISH_FETCH_PROFILE',
  UPDATE_PROFILE: 'currentUser/UPDATE_PROFILE',
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

export function fetchProfile() {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.FETCH_PROFILE,
    });
  };
}

export function finishFetchProfile(profile) {
  return dispatch => {
    dispatch(fetchFinish());
    dispatch({
      type: types.FINISH_FETCH_PROFILE,
      payload: profile,
    });
  };
}

export function updateProfile(profile) {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({
      type: types.UPDATE_PROFILE,
      payload: profile,
    });
  };
}

export function changePassword(email: string, auth: AuthService) {
  return dispatch => {
    dispatch(fetchStart());

    auth.resetPassword(email)
      .catch(err => {
        alert(`Couldn't reset your password`);
        console.error(err);
      })
      .then(() => {
        alert(`We've send you an email with instructions`);
        dispatch(fetchFinish());
      });
  };
}
