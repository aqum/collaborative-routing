import { Moment } from 'moment';
import { IAuthor } from './author';
import { IUser } from './user';

export interface IComment {
  author: IAuthor;
  date: Moment;
  content: string;
  lat: number;
  lng: number;
  user: IUser;
  isEdited: boolean;
  isSaving: boolean;
}
