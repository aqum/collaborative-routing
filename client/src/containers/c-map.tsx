import { connect } from 'react-redux';
import { MouseEvent } from 'leaflet';
import * as _ from 'lodash';
import { Map } from '../components/map/map';
import { setWaypoints } from '../actions/route';

export const CMap = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Map);

function mapStateToProps(state) {
  return {
    comments: state.comments,
    onMapClick: state.meta.mapClickAction,
    control: state.route.control,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _dispatch: dispatch,
    onReroute: ev => dispatch(setWaypoints(ev.waypoints)),
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
          stateProps.onMapClick(ev.latlng)
        ),
    }
  );
}
