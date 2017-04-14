import { IRouteMeta } from '../../interfaces/route-meta';

export interface ICurrentUserStore {
  isAnonymous: boolean;
  userId?: string;
  email?: string;
  name?: string;
  token?: string;
  routes: IRouteMeta[];
}

export const initialCurrentUserStore = Object.seal({
  isAnonymous: true,
  routes: [],
});
