import { Moment } from 'moment';
import { IAuthor } from './author';
import { IUser } from './user';

export interface IComment {
  id: number;
  author: IAuthor;
  date: Moment;
  content: string;
  lat: number;
  lng: number;
  user: IUser;
  isEdited: boolean;
  isSaving: boolean;
  replies: IComment[];
  reply_to_id: number;
}
