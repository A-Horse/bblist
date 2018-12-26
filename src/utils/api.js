import { API_PREFIX, LOCAL_BACKUP_URL } from '../constants';
import { Storage } from 'services/storage';

export function makeApiUrl(path) {
  if (Storage.get(LOCAL_BACKUP_URL)) {
    return `${Storage.get(LOCAL_BACKUP_URL)}${path}`;
  }
  return `${API_PREFIX}${path}`;
}
