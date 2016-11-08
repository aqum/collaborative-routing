import * as React from 'react';
import * as L from 'leaflet';

import './map.scss';
import { config } from '../../config/config';

export class Map extends React.Component<{}, {}> {
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
        className='cr-map' />
    );
  }
}
