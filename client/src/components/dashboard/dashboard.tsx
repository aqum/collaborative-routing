import * as React from 'react';
import { CRoutesList } from '../../containers/c-routes-list';

export class Dashboard extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <CRoutesList />
      </div>
    );
  }
}
