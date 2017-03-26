import { defaults } from 'lodash';

interface IAppConfig {
  mapboxToken?: string;
  mapTileUrl?: string;
  mapAttribution?: string;
  auth0?: {
    appId: string;
    appBaseUrl: string;
  };
}

const defaultConfig = {
  mapTileUrl: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png',
  mapAttribution: `
    © <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>
    © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
    <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>
  `,
};

export const config: IAppConfig = defaults({}, defaultConfig, getLocalConfig());

function getLocalConfig() {
  try {
    return require<any>('./local.config').default;
  } catch (err) {
    console.warn(`local.config.ts not found - using default instead`);
    return {};
  }
}
