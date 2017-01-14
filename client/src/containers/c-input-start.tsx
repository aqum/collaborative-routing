import { connect } from 'react-redux';
import { InputAddress } from '../components/sidebar/input-address/input-address';

export const CInputStart = connect(
  mapStateToProps,
)(InputAddress);

function mapStateToProps(state) {
  const coordinates = state.route.start;

  return {
    value: coordinates ? `${coordinates.lat} ${coordinates.lng}` : '',
  };
}
