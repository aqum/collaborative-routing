import * as React from 'react';
import { PasswordForm } from './password-form/password-form';
import { CProfileForm } from '../../containers/c-profile-form';

import './account-page.scss';

export class AccountPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-account-page'>
        <h1 className='cr-account-page__title'>Account</h1>

        <div className='cr-account-page__section'>
          <CProfileForm />
        </div>

        <div className='cr-account-page__section'>
          <PasswordForm />
        </div>
      </div>
    );
  }
}
