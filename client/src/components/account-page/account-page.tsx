import * as React from 'react';
import { CProfileForm } from '../../containers/c-profile-form';
import { CPasswordForm } from '../../containers/c-password-form';
import { CDashboardNavbar } from '../../containers/c-dashboard-navbar';
import { Link } from 'react-router-dom';

import './account-page.scss';

export class AccountPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-account-page'>
        <div className='cr-account-page__back'>
          <Link to='/'>
            Back to dashboard
          </Link>
        </div>
        <h1 className='cr-account-page__title'>Account</h1>

        <div className='cr-account-page__section'>
          <CProfileForm />
        </div>

        <div className='cr-account-page__section'>
          <CPasswordForm />
        </div>
      </div>
    );
  }
}
