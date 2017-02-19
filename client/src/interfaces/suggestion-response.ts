import { LatLngLiteral } from 'leaflet';

export interface ISuggestionResponse {
  user_id?: number;
  id: number;
  inserted_at: string;
  updated_at: string;
  waypoints: LatLngLiteral[];
}
