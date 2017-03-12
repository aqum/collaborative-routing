import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRouteMeta } from '../../interfaces/route-meta';

import './routes-list.scss';

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
      <div className='cr-routes-list'>
        <h2 className='cr-routes-list__title'>Your routes</h2>
        <ul className='cr-routes-list__items'>
          { this.props.routes.map(route =>
            <li key={route.id}
                className='cr-routes-list__item'>
              <Link to={`/route/${route.id}`}>
                {route.title}
              </Link>
            </li>
          ) }
        </ul>
      </div>
    );
  }
}
