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
}

export const initialRouteStore = Object.seal({
  waypoints: [],
});
