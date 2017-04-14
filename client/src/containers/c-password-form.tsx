import { connect } from 'react-redux';
import { PasswordForm } from '../components/account-page/password-form/password-form';
import { changePassword } from '../actions/current-user';

export const CPasswordForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PasswordForm);

function mapStateToProps(state) {
  return {
    _state: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _dispatch: dispatch,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const state = stateProps._state;
  const dispatch = dispatchProps._dispatch;

  return Object.assign(
    {},
    ownProps,
    { onSave: () => dispatch(changePassword(
      state.currentUser.email,
      state.meta.authService)) }
  );
}
