import { connect } from 'react-redux';
import { fetchRoutesList, createRoute } from '../actions/current-user';
import { RoutesList } from '../components/routes-list/routes-list';

export const CRoutesList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutesList);

function mapStateToProps(state) {
  return {
    routes: state.currentUser.routes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit: () => dispatch(fetchRoutesList()),
    onRouteCreate: () => dispatch(createRoute()),
  };
}
