import { LatLngLiteral } from 'leaflet';
import { Moment } from 'moment';
import { IAuthor } from './author';

export interface ISuggestion {
  author: IAuthor;
  date: Moment;
  waypoints: LatLngLiteral[];
  isSaving: boolean;
}
