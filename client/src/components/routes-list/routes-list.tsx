import * as React from 'react';
import { IRouteMeta } from '../../interfaces/route-meta';

export interface IRoutesList {
  onInit: Function;
  routes: IRouteMeta[];
}

export class RoutesList extends React.Component<IRoutesList, {}> {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    return (
      <ul>
        { this.props.routes.map(route => <li key={route.id}>{route.title}</li>) }
      </ul>
    );
  }
}
