import * as React from 'react';
import * as classNames from 'classnames';
import './navbar.scss';

export interface INavbar {
  className?: any;
  routeTitle: string;
}

export class Navbar extends React.Component<INavbar, {}> {
  render() {
    return (
      <div className={classNames(this.props.className, 'cr-navbar')}>
        <div className='cr-navbar__route-title'>{ this.props.routeTitle }</div>
        <button type='button'
                className='cr-navbar__share'>
          Share
        </button>
      </div>
    );
  }
}
