import * as React from 'react';

import './cr-button.scss';

export class CrButton extends React.Component<{}, {}> {
  render() {
    return (
      <button
        type='button'
        className='cr-button'
      >
        { this.props.children }
      </button>
    );
  }
}
