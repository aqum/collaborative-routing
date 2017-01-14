import * as React from 'react';
import * as classNames from 'classnames';
import { CInputStart } from '../../containers/c-input-start';
import { CInputFinish } from '../../containers/c-input-finish';
import './sidebar.scss';

export interface ISidebar {
  className?: any;
}

export class Sidebar extends React.Component<ISidebar, {}> {
  render() {
    return (
      <div className={classNames(this.props.className, 'cr-sidebar')}>
        <CInputStart />
        <CInputFinish />
      </div>
    );
  }
}
