import { Moment } from 'moment';
import { LatLngLiteral } from 'leaflet';
import { IAuthor } from './author';

export interface IComment {
  author: IAuthor;
  date: Moment;
  content: string;
  coordinates: LatLngLiteral;
  isBeingEdited: boolean;
}
