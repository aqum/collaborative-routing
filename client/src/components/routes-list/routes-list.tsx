import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRouteMeta } from '../../interfaces/route-meta';

import './routes-list.scss';

export interface IRoutesList {
  onInit: () => void;
  routes: IRouteMeta[];
  onRouteCreate: () => void;
}

export class RoutesList extends React.Component<IRoutesList, {}> {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    return (
      <div className='cr-routes-list'>
        <h2 className='cr-routes-list__title'>
          <span className='cr-routes-list__title-text'>Your routes</span>
          <button type='button'
                  className='cr-routes-list__title-button'
                  onClick={this.props.onRouteCreate}>
            Create route
          </button>
        </h2>
        <ul className='cr-routes-list__items'>
          { this.props.routes.map(route =>
            <li key={route.id}
                className='cr-routes-list__item'>
              <Link to={`/map/${route.id}`}>
                {route.title || 'Route without title'}
              </Link>
            </li>,
          ) }
        </ul>
      </div>
    );
  }
}
