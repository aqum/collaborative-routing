import { IRouteMeta } from '../../interfaces/route-meta';

export interface ICurrentUserStore {
  isAnonymous: boolean;
  email?: string;
  name?: string;
  token?: string;
  routes: IRouteMeta[];
}

export const initialCurrentUserStore = Object.seal({
  isAnonymous: true,
  routes: [],
});
