import { connect } from 'react-redux';
import { setToken } from '../actions/route';
import { App } from '../components/app/app';

export const CApp = connect(
  undefined,
  mapDispatchToProps,
)(App);

function mapDispatchToProps(dispatch) {
  return {
    onTokenMatch: token => dispatch(setToken(token)),
  };
}
