import { connect } from 'react-redux';
import { MouseEvent } from 'leaflet';
import { Map } from '../components/map/map';

export const CMap = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Map);

function mapStateToProps(state) {
  return {
    comments: state.comments,
    onMapClick: state.meta.mapClickAction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _dispatch: dispatch,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(
    {},
    ownProps,
    stateProps,
    {
      onMapClick: (ev: MouseEvent) => dispatchProps._dispatch(stateProps.onMapClick(ev.latlng)),
    }
  );
}
