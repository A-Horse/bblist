import { REMOTE_STORAGE } from "../constants";

export function generateBoardCoverUrl(coverId: string) {
    return `${REMOTE_STORAGE}/board-cover/${coverId}`;
  }
  