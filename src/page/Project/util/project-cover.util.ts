import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';

export function generateProjectCoverUrl(coverFileName: string) {
  if (!coverFileName) {
    return DEFAULT_BOARD_COVER_SRC;
  }
  return `/api/image/${coverFileName}`;
}
