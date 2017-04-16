import { connect } from 'react-redux';
import { MouseEvent } from 'leaflet';
import * as _ from 'lodash';
import { Map } from '../components/map/map';
import { setWaypoints, fetchRoute, setDetails } from '../actions/route';
import { setSuggestion } from '../actions/suggestions';
import { addComment } from '../actions/comments';

export const CMap = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Map);

function mapStateToProps(state) {
  let mapClickAction = state.meta.mapClickAction;
  if (mapClickAction === addComment) {
    mapClickAction = ev => addComment(ev, state.currentUser.name);
  }

  return {
    comments: state.comments,
    onMapClick: mapClickAction,
    waypoints: state.route.waypoints,
    mode: state.meta.mapMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _dispatch: dispatch,
    onReroute: ev => {
      const route = ev.routes[0];
      if (!route) {
        return;
      }

      const waypoints = route.waypoints.map(waypoint => ({
        name: waypoint.name,
        lat: waypoint.latLng.lat,
        lng: waypoint.latLng.lng,
      }));

      dispatch(setWaypoints(waypoints));
      dispatch(setDetails({
        distance: route.summary.totalDistance,
        duration: route.summary.totalTime,
      }));
    },
    onSuggestion: ev => dispatch(
      setSuggestion(ev.waypoints.map(waypoint => waypoint.latLng)),
    ),
    onInit: (routeId) => dispatch(fetchRoute(routeId)),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(
    {},
    ownProps,
    stateProps,
    _.omit(dispatchProps, '_dispatch'),
    {
      onMapClick: (ev: MouseEvent) =>
        dispatchProps._dispatch(
          stateProps.onMapClick(ev.latlng),
        ),
    },
  );
}
