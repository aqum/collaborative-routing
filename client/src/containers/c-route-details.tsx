import { connect } from 'react-redux';
import { RouteDetails } from '../components/sidebar/route-details/route-details';

export const CRouteDetails = connect(
  mapStateToProps,
)(RouteDetails);

function mapStateToProps(state) {
  return {
    duration: state.route.duration,
    distance: state.route.distance,
  };
}
