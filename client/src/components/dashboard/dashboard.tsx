import * as React from 'react';
import { CRoutesList } from '../../containers/c-routes-list';
import { CDashboardNavbar } from '../../containers/c-dashboard-navbar';

export class Dashboard extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <CDashboardNavbar />
        <CRoutesList />
      </div>
    );
  }
}
