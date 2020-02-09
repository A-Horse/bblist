
export function generateProjectCoverUrl(coverFileName: string) {
  if (!coverFileName) {
    return '/static/cover.png';
  }
  return `/api/image/${coverFileName}`;
}