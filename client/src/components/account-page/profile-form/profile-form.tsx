import * as React from 'react';
import { CrButton } from '../../cr-button/cr-button';
import { LabelledInput } from '../labelled-input/labelled-input';

interface IProfileFormProps {
  name: string;
  onSave: (profile) => void;
}

export class ProfileForm extends React.Component<IProfileFormProps, {}> {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleStateFactory(propName) {
    return value => {
      this.setState({
        [propName]: value,
      });
    };
  }

  render() {
    return (
      <form className='cr-profile-form'>
        <LabelledInput
          label='Name'
          value={ this.props.name }
          onChange={ this.handleStateFactory('name') }
        />
        <CrButton onClick={() => this.props.onSave(this.state)}>
          Save
        </CrButton>
      </form>
    );
  }
}
