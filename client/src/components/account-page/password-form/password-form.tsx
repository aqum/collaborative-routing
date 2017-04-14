import * as React from 'react';
import { CrButton } from '../../cr-button/cr-button';
import { LabelledInput } from '../labelled-input/labelled-input';

import './password-form.scss';

export class PasswordForm extends React.Component<{}, {}> {
  render() {
    return (
      <form className='cr-password-form'>
        <div className='cr-password-form__horizontal'>
          <div className='cr-password-form__group'>
            <LabelledInput
              label='Password'
              type='password'
            />
          </div>
          <div className='cr-password-form__group'>
            <LabelledInput
              label='Repeat'
              type='password'
            />
          </div>
        </div>

        <p className='cr-password-form__help'>
          We will send you an email to confirm password change
        </p>

        <CrButton>Save</CrButton>
      </form>
    );
  }
}
