import * as React from 'react';
import * as L from 'leaflet';
import { isFunction } from 'lodash';
import './map.scss';
import { config } from '../../../config/config';
import { IComment } from '../../interfaces/comment';

export interface IMap {
  comments?: IComment[];
  className?: string;
  control?: any;
  onMapClick?: Function;
  onReroute?: Function;
}

export class Map extends React.Component<IMap, {}> {
  private mapContainer = document.createElement('div');
  private mapInstance = L.map(this.mapContainer);
  private markers: L.Marker[] = [];

  constructor() {
    super();

    this.mapInstance.setView([51.505, -0.09], 13);
    L.tileLayer(
      config.mapTileUrl,
      {
        maxZoom: 18,
        attribution: config.mapAttribution,
      }
    ).addTo(this.mapInstance);
  }

  componentWillMount() {
    this.mapInstance.on('click', this.handleMapClick.bind(this));
    this.bindCommentMarkers(this.props.comments);
  }

  componentWillUpdate({ comments, control }) {
    if (comments) {
      this.bindCommentMarkers(comments);
    }

    if (control) {
      control.addTo(this.mapInstance);

      if (isFunction(this.props.onReroute)) {
        control.on('routesfound', this.props.onReroute);
      }
    }
  }

  handleMapClick(ev) {
    if (isFunction(this.props.onMapClick)) {
      this.props.onMapClick(ev);
    }
  }

  createMap(node) {
    if (!node) {
      return;
    }

    node.appendChild(this.mapContainer);

    this.mapInstance.invalidateSize(false);
  }

  render() {
    return (
      <div ref={node => this.createMap(node)}
        className={this.props.className} />
    );
  }

  private bindCommentMarkers(comments: IComment[] = []) {
    const markers = comments.map(({lat, lng}) => L.marker({lat, lng}));
    this.markers.forEach(marker => this.mapInstance.removeLayer(marker));

    markers.forEach(marker => marker.addTo(this.mapInstance));
    this.markers = markers;
  }
}
