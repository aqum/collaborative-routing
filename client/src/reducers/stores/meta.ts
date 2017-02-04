import { setStart } from '../../actions/route';

export interface IMetaStore {
  isFetching: boolean;
  mapClickAction: Function;
}

export const initialMetaStore = Object.seal({
  isFetching: false,
  mapClickAction: setStart,
});
