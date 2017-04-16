export interface IWaypoint {
  lat: number;
  lng: number;
  name?: string;
}

export interface IRouteStore {
  accessToken?: string;
  shareToken?: string;
  routeId?: number;
  title?: string;
  waypoints: IWaypoint[];
  duration: number;
  distance: number;
}

export const initialRouteStore = Object.seal({
  waypoints: [],
  duration: 0,
  distance: 0,
});
