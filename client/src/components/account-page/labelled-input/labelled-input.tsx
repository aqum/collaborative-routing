import * as React from 'react';

import './labelled-input.scss';

interface ILabelledInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

interface ILabelledInputState {
  value: string;
}

export class LabelledInput extends React.Component<ILabelledInputProps, ILabelledInputState> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      <div className='cr-labelled-input'>
        <label className='cr-labelled-input__label'>
          { this.props.label }
        </label>
        <input
          type={ this.props.type || 'text' }
          value={ this.state.value }
          className='cr-labelled-input__input'
          onChange={ this.handleChange.bind(this) }
        />
      </div>
    );
  }
}
