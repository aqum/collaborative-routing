import * as React from 'react';
import * as classNames from 'classnames';
import './loader.scss';

export interface ILoader {
  className?: any;
  isVisible?: boolean;
}

export class Loader extends React.Component<ILoader, {}> {
  render() {
    return (
      <div className={classNames(
        this.props.className,
        'cr-loader',
        this.props.isVisible ? 'cr-loader--is-visible' : null,
      )}>
        <div className='cr-loader__progress'></div>
      </div>
    );
  }
}
