import * as React from 'react';
import './input-address.scss';

interface IInputAddress {
  value: string;
}

export class InputAddress extends React.Component<IInputAddress, {}> {
  icon() {
    return {
      __html: require('../icons/location.svg'),
    };
  }

  render() {
    return (
      <div>
        <div className='cr-input-address'>
          <div className='cr-input-address__icon'
               dangerouslySetInnerHTML={this.icon()}>
          </div>
          <input className='cr-input-address__input'
                 type='text'
                 value={this.props.value}
                 placeholder='Select starting point on map'/>
        </div>
      </div>
    );
  }
}
