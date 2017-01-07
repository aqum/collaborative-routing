import { Moment } from 'moment';
import { IAuthor } from './author';

export interface IComment {
  author: IAuthor;
  date: Moment;
  content: string;
  lat: number;
  lng: number;
  isEdited: boolean;
  isSaving: boolean;
}
