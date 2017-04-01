import { setStart } from '../../actions/route';
import { MapMode } from '../../interfaces/map-mode.enum';
import { AuthService } from '../../utils/auth0.service';

export interface IMetaStore {
  isFetching: boolean;
  mapClickAction: Function;
  mapMode: MapMode;
  socket?: any;
  routeChannel?: any;
  mainChannel?: any;
  authService?: AuthService;
}

export const initialMetaStore: IMetaStore = Object.seal({
  isFetching: false,
  mapClickAction: setStart,
  mapMode: MapMode.Edit,
});
