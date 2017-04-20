export interface ICommentResponse {
  user_id?: number;
  id: number;
  inserted_at: string;
  updated_at: string;
  lat: number;
  lng: number;
  content: string;
  replies: ICommentResponse[];
}
