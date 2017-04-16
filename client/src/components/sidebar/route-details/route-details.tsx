import * as React from 'react';

import './route-details.scss';

const L = require('leaflet');
require('leaflet-routing-machine');

interface IRouteDetailsProps {
  distance: number;
  duration: number;
};

export class RouteDetails extends React.Component<IRouteDetailsProps, {}> {
  formatter = new L.Routing.Formatter();

  render() {
    const distance = this.formatter.formatDistance(this.props.distance);
    const duration = this.formatter.formatTime(this.props.duration);
    return (
      <div className='cr-route-details'>
        <div className='cr-route-details__distance'>{distance}</div>
        <div className='cr-route-details__duration'>{duration}</div>
      </div>
    );
  }
}
