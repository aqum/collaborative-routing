import * as React from 'react';
import { CrButton } from '../cr-button/cr-button';

import './account-page.scss';

export class AccountPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className='cr-account-page'>
        <h1 className='cr-account-page__title'>Account</h1>
        <form className='cr-form'>
          <label className='cr-form__label'>Name</label>
          <input
            type='text'
            className='cr-form__input'
          />
          <CrButton>Save</CrButton>
        </form>

        <form className='cr-form'>
          <div className='cr-form__horizontal-group'>
            <div className='cr-form__group'>
              <label className='cr-form__label'>Password</label>
              <input
                type='password'
                className='cr-form__input'
              />
            </div>
            <div className='cr-form__group'>
              <label className='cr-form__label'>Repeat</label>
              <input
                type='password'
                className='cr-form__input'
              />
            </div>
          </div>
          <p className='cr-form__help'>
            We will send you an email to confirm password change
          </p>
          <CrButton>Save</CrButton>
        </form>
      </div>
    );
  }
}
