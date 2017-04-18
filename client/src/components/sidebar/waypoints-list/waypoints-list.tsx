import { LatLngLiteral } from 'leaflet';
import * as React from 'react';
import * as _ from 'lodash';
import { InputAddress } from './input-address/input-address';
import './waypoints-list.scss';

export interface IWaypointsList {
  waypoints?: LatLngLiteral[];
}

export class WaypointsList extends React.Component<IWaypointsList, {}> {
  stringifyWaipoint(waypoint) {
    if (!waypoint) {
      return '';
    }

    if (waypoint.name) {
      return waypoint.name;
    }

    return `${_.round(waypoint.lat, 2)} ${_.round(waypoint.lng, 2)}`;
  }

  waypointId(waypoint: LatLngLiteral) {
    return waypoint.lat + waypoint.lng;
  }

  checkpointIcon() {
    return {
      __html: require('./icons/checkpoint.svg'),
    };
  }

  render() {
    const start = this.props.waypoints[0];
    const end = this.props.waypoints.length > 1 ? _.last(this.props.waypoints) : null;
    const checkpoints = this.props.waypoints.slice(1, this.props.waypoints.length - 1);

    return (
      <div>
        <InputAddress value={this.stringifyWaipoint(start)} />
        <ul className='cr-waypoints-list__checkpoints'>
          {checkpoints.map(
            waypoint =>
              <li className='cr-waypoints-list__checkpoint'
                  key={this.waypointId(waypoint)}>
                <div className='cr-waypoints-list__checkpoint-icon'
                     dangerouslySetInnerHTML={this.checkpointIcon()}>
                </div>
                <div className='cr-waypoints-list__checkpoint-name'>
                  {this.stringifyWaipoint(waypoint)}
                </div>
              </li>
          )}
        </ul>
        <InputAddress value={this.stringifyWaipoint(end)} />
      </div>
    );
  }
}
