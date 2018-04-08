import { getImageBase64 } from './image';

export const Storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  clear() {
    return window.localStorage.clear();
  },
  set(key, value) {
    return window.localStorage.setItem(key, value);
  },
  remove(key) {
    return window.localStorage.removeItem(key);
  }
};

export function storageImage(name, imageElement) {
  const imgData = getImageBase64(imageElement);
  return window.localStorage.setItem(name, imgData);
}
