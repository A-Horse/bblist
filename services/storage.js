import {getBase64Image} from './image';

export const Storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, value) {
    return window.localStorage.setItem(key, value);
  },
  remove(key) {
    return window.localStorage.removeItem(key);
  }
}


export function storageImage(name, imageElement) {
  const imgData = getBase64Image(imageElement);
  return window.localStorage.setItem(name, imgData);
}
