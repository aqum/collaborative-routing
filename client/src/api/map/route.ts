import { types, applyWaypoints, finishFetchRoute, finishCreateToken, receiveTitle } from '../../actions/route';
import { fetchFinish } from '../../actions/meta';

export const routeEvents = [
  {
    name: 'event:route_changed',
    action: applyWaypoints,
  },
  {
    name: 'event:title_changed',
    action: receiveTitle,
  },
];

export const routeMethods = [
  {
    type: types.SET_WAYPOINTS,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:route.edit', action.payload)
        .receive('error', () => alert(`Couldn't save route edit`))
        .receive('timeout', () => alert('Server timeout'));
    },
  },
  {
    type: types.FETCH_ROUTE,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:route.details')
        .receive('ok', details => dispatch(finishFetchRoute(details)))
        .receive('error', () => dispatch(fetchFinish(`Couldn't restore route`)))
        .receive('timeout', () => dispatch(fetchFinish('Server timeout')));
    },
  },
  {
    type: types.CREATE_TOKEN,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:token.create')
        .receive('ok', token => dispatch(finishCreateToken(token.id)))
        .receive('error', () => dispatch(fetchFinish(`Couldn't restore route`)))
        .receive('timeout', () => dispatch(fetchFinish('Server timeout')));
    },
  },
  {
    type: types.SET_TITLE,
    callback: (channel, dispatch, action) => {
      channel
        .push('method:route.changeTitle', { title: action.payload })
        .receive('ok', () => dispatch(fetchFinish()))
        .receive('error', () => dispatch(fetchFinish(`Couldn't restore title`)))
        .receive('timeout', () => dispatch(fetchFinish('Server timeout')));
    },
  },
];
