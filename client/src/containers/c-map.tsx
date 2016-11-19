import { connect } from 'react-redux';
import { MouseEvent } from 'leaflet';
import { Map } from '../components/map/map';
import { addComment } from '../actions/comments';

export const CMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

function mapStateToProps(state) {
  return {
    comments: state.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMapClick: (ev: MouseEvent) => dispatch(addComment({
      content: 'Testing',
      coordinates: ev.latlng,
    })),
  };
}
