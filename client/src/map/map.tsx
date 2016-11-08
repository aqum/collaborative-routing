import * as React from 'react';
import * as L from 'leaflet';

import { config } from '../../config/config';

export interface IMap {
  className: string;
}

export class Map extends React.Component<IMap, {}> {
  createMap(node) {
    const mapInstance = L.map(node).setView([51.505, -0.09], 13);

    L.tileLayer(
      config.mapTileUrl,
      {
        maxZoom: 18,
        attribution: config.mapAttribution,
      }
    )
      .addTo(mapInstance);
  }

  render() {
    return (
      <div ref={node => this.createMap(node)}
        className={this.props.className} />
    );
  }
}
