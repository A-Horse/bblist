import { REMOTE_STORAGE } from '../../../constants';

export function generateProjectCoverUrl(coverUrl: string) {
  return `${REMOTE_STORAGE}/board-cover${coverUrl}`;
}
