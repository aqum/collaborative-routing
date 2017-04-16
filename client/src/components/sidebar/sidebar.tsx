import * as React from 'react';
import * as classNames from 'classnames';
import { CWaypointsList } from '../../containers/c-waypoints-list';
import { CRouteDetails } from '../../containers/c-route-details';
import './sidebar.scss';

export interface ISidebar {
  className?: any;
}

export class Sidebar extends React.Component<ISidebar, {}> {
  render() {
    return (
      <div className={classNames(this.props.className, 'cr-sidebar')}>
        <div className='cr-sidebar__details'>
          <CRouteDetails />
        </div>
        <CWaypointsList />
      </div>
    );
  }
}
