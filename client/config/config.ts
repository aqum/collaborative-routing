const defaultConfig = {
  mapTileUrl: '',
  mapAttribution: `
    © <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>
    © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
    <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>
  `,
};

let localConfig = {};

try {
  localConfig = require<any>('./local.config').default;
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.log('local.config.ts not found - using default instead');
  } else {
    throw err;
  }
}

export const config = Object.assign({}, defaultConfig, localConfig);
