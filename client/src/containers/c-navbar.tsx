import { connect } from 'react-redux';
import { Navbar } from '../components/navbar/navbar';

export const CNavbar = connect(
  mapStateToProps,
)(Navbar);

function mapStateToProps(state) {
  return {
    routeTitle: state.route.title,
  };
}
