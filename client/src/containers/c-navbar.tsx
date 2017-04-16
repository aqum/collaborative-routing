import { connect } from 'react-redux';
import { Navbar } from '../components/navbar/navbar';
import { setTitle } from '../actions/route';

export const CNavbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

function mapStateToProps(state) {
  return {
    routeTitle: state.route.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTitleChange: title => dispatch(setTitle(title)),
  };
}
