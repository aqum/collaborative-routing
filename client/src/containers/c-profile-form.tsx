import { connect } from 'react-redux';
import { ProfileForm } from '../components/account-page/profile-form/profile-form';
import { updateProfile } from '../actions/current-user';

export const CProfileForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm);

function mapStateToProps(state) {
  return {
    name: state.currentUser.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: profile => dispatch(updateProfile(profile)),
  };
}
