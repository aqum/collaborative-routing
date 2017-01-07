import * as React from 'react';
import './input-address.scss';

export class InputAddress extends React.Component<{}, {}> {
  icon() {
    return {
      __html: require('../icons/location.svg'),
    };
  }

  render() {
    return (
      <div className='cr-input-address'>
        <div className='cr-input-address__icon'
             dangerouslySetInnerHTML={this.icon()}>
        </div>
        <input className='cr-input-address__input'
               type='text'/>
      </div>
    );
  }
}
