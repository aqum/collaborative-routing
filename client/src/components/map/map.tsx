import * as React from 'react';
import * as L from 'leaflet';
import './map.scss';
import { config } from '../../../config/config';
import { IComment } from '../../interfaces/comment';

export interface IMap {
  comments?: IComment[];
  className?: string;
  onMapClick?: Function;
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
    if (this.props.onMapClick) {
      this.mapInstance.on('click', (ev) => this.props.onMapClick(ev));
    }

    this.bindCommentMarkers(this.props.comments);
  }

  componentWillUpdate({ comments }) {
    this.bindCommentMarkers(comments);
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
