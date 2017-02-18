import * as React from 'react';
import { isFunction } from 'lodash';
import './map.scss';
import { config } from '../../../config/config';
import { IComment } from '../../interfaces/comment';
import { MapMode } from '../../interfaces/map-mode.enum';
import { LatLngLiteral } from 'leaflet';

const L = require<any>('leaflet');
// routing-machine doesn't expose Routing object
require('leaflet-routing-machine');

export interface IMap {
  comments: IComment[];
  className?: string;
  mode: MapMode;
  onMapClick?: Function;
  onReroute?: Function;
  onSuggestion?: Function;
  waypoints: LatLngLiteral[];
}

export class Map extends React.Component<IMap, {}> {
  static createControl() {
    return L.Routing.control({
      routeWhileDragging: true,
      show: false,
      router: L.Routing.mapbox(
        config.mapboxToken,
        { profile: 'mapbox/cycling' }
      ),
    });
  }

  private mapContainer: any = document.createElement('div');
  private mapInstance = L.map(this.mapContainer);
  private markers: L.Marker[] = [];
  private control = Map.createControl();
  private suggestControl = Map.createControl();
  private currentMode: MapMode;
  private lastRerouteWaypoints = [];

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

  compareWaypoints(control, toCompare) {
    if (!control._selectedRoute) {
      return false;
    }

    const isRerouted = compareList(this.lastRerouteWaypoints, toCompare);
    if (isRerouted) {
      return true;
    }

    return compareList(control._selectedRoute.inputWaypoints, toCompare);

    function compareList(waypoints, compareWith) {
      return waypoints.every(
        (waypoint, index) => compare(waypoint.latLng, compareWith[index])
      );
    }

    function compare(w1, w2) {
      if (!w1 || !w2) {
        return false;
      }

      return w1.lat === w2.lat && w2.lng === w2.lng;
    }
  }

  componentWillMount() {
    this.mapInstance.on('click', this.handleMapClick.bind(this));
    this.bindCommentMarkers(this.props.comments);

    if (isFunction(this.props.onReroute)) {
      this.control.on('routesfound', data => {
        this.lastRerouteWaypoints = data.waypoints;
        this.props.onReroute(data);
      });
    }

    if (isFunction(this.props.onSuggestion)) {
      this.suggestControl.on('routesfound', this.props.onSuggestion.bind(this));
    }
  }

  componentWillUpdate({ comments, waypoints, mode }) {
    if (comments) {
      this.bindCommentMarkers(comments);
    }

    if (waypoints && !this.compareWaypoints(this.control, waypoints)) {
      this.control.setWaypoints(waypoints);
    }

    this.changeMode(mode);
  }

  changeMode(mode: MapMode) {
    if (this.currentMode === mode) {
      return;
    }

    switch (mode) {
      case MapMode.Edit:
        this.control.addTo(this.mapInstance);
        // side effect - base line from main control is reused for navigation
        this.mapInstance.removeControl(this.suggestControl);
        break;
      case MapMode.Suggest:
        if (this.control._line) {
          this.mapInstance.removeControl(this.control);
          this.control._line.addTo(this.mapInstance);
          this.suggestControl.setWaypoints(
            this.control._plan._waypoints.map(waypoints => waypoints.latLng)
          );
          this.suggestControl.addTo(this.mapInstance);
        }
        break;
      default:
        break;
    }

    this.currentMode = mode;
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
