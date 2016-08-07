
const BASE_STATIC_PATH = '/static/';

const SVG = {
  clear: 'ic_clear_black_24px.svg'
};

const IMAGE = {
  
};

const ASSETS = {
  svg: SVG,
  image: IMAGE
};

const ASSETS_DIR_MAP = {
  svg: 'svg/'
};

export function getAssets(type, name) {
  return BASE_STATIC_PATH + ASSETS_DIR_MAP[type]+ ASSETS[type][name];
}
