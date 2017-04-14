import * as React from 'react';

import './cr-button.scss';

interface ICrButtonProps {
  onClick: () => void;
  type: 'string';
};

export class CrButton extends React.Component<ICrButtonProps, {}> {
  render() {
    return (
      <button
        type={this.props.type}
        className='cr-button'
        onClick={this.props.onClick}
      >
        { this.props.children }
      </button>
    );
  }
}
