import { types, applyWaypoints, finishFetchRoute } from '../../actions/route';
import { fetchFinish } from '../../actions/meta';

export const routeEvents = [
  {
    name: 'event:route_changed',
    action: applyWaypoints,
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
];
