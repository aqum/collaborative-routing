import { connect } from 'react-redux';
import { WaypointsList, IWaypointsList } from '../components/sidebar/waypoints-list/waypoints-list';

export const CWaypointsList = connect(
  mapStateToProps,
)(WaypointsList);

function mapStateToProps(state): IWaypointsList {
  return {
    waypoints: state.route.waypoints,
  };
}
