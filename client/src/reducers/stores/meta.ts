import { setStart } from '../../actions/route';
import { MapMode } from '../../interfaces/map-mode.enum';

export interface IMetaStore {
  isFetching: boolean;
  mapClickAction: Function;
  mapMode: MapMode;
}

export const initialMetaStore = Object.seal({
  isFetching: false,
  mapClickAction: setStart,
  mapMode: MapMode.Edit,
});
