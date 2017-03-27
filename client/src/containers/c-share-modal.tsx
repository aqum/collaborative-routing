import { connect } from 'react-redux';
import { ShareModal } from '../components/navbar/share-modal/share-modal';
import { createToken } from '../actions/route';

export const CShareModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareModal);

function mapStateToProps(state) {
  return {
    token: state.route.accessToken,
    routeId: state.route.routeId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTokenCreate: routeId => dispatch(createToken(routeId)),
  };
}
