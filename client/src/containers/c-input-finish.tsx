import { connect } from 'react-redux';
import { InputAddress } from '../components/sidebar/input-address/input-address';

export const CInputFinish = connect(
  mapStateToProps,
)(InputAddress);

function mapStateToProps(state) {
  const coordinates = state.route.end;

  return {
    value: coordinates ? `${coordinates.lat} ${coordinates.lng}` : '',
  };
}
