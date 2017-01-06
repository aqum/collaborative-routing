import { connect } from 'react-redux';
import { Loader } from '../components/loader/loader';

export const CLoader = connect(
  mapStateToProps,
)(Loader);

function mapStateToProps(state) {
  return {
    isVisible: state.meta.isFetching,
  };
}
