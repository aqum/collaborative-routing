import * as React from 'react';
import { CrButton } from '../../cr-button/cr-button';
import { LabelledInput } from '../labelled-input/labelled-input';
import { CrForm } from '../../cr-form/cr-form';

interface IProfileFormProps {
  name: string;
  onSave: (profile) => void;
}

export class ProfileForm extends React.Component<IProfileFormProps, {}> {
  handleSubmit(data) {
    this.props.onSave(data);
  }

  render() {
    return (
      <CrForm
        className='cr-profile-form'
        onSubmit={this.handleSubmit.bind(this)}
      >
        <LabelledInput
          label='Name'
          value={ this.props.name }
          name='name'
          required={ true }
        />
        <CrButton type='submit'>
          Save
        </CrButton>
      </CrForm>
    );
  }
}
