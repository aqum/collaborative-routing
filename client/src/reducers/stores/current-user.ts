import { IRouteMeta } from '../../interfaces/route-meta';

export interface ICurrentUserStore {
  email: string;
  name: string;
  token: string;
  routes: IRouteMeta[];
}

export const initialCurrentUserStore = Object.seal({
  email: '',
  name: '',
  token: '',
  routes: [],
});
