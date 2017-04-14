import * as React from 'react';

import './cr-button.scss';

interface ICrButtonProps {
  onClick: () => void;
};

export class CrButton extends React.Component<ICrButtonProps, {}> {
  render() {
    return (
      <button
        type='button'
        className='cr-button'
        onClick={this.props.onClick}
      >
        { this.props.children }
      </button>
    );
  }
}
