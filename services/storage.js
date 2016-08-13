export const Storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, value) {
    return window.localStorage.setItem(key, value);
  }
}
