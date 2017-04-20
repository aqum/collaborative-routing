import { connect } from 'react-redux';
import { DashboardNavbar } from '../components/dashboard-navbar/dashboard-navbar';

export const CDashboardNavbar = connect(
  mapStateToProps,
)(DashboardNavbar);

function mapStateToProps(state) {
  return {
    email: state.currentUser.email,
    name: state.currentUser.name,
  };
}
