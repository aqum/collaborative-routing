import * as React from 'react';
import { CrButton } from '../../cr-button/cr-button';

import './password-form.scss';

interface IPasswordFormProps {
  onSave: () => void;
}

interface IPasswordFormState {
  isDifferent: boolean;
}

export class PasswordForm extends React.Component<IPasswordFormProps, IPasswordFormState> {
  render() {
    return (
      <div className='cr-password-form'>
        <p className='cr-password-form__help'>
          We will send you an email with instructions how to change password
        </p>

        <CrButton onClick={ () => this.props.onSave() }>
          Reset password
        </CrButton>
      </div>
    );
  }
}
