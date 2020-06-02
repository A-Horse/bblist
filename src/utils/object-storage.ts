export function objectFileUrl(objectUri: string) {
  const objectId: string = objectUri.split('://')[1];
  return objectId ? `/api/image/${objectId}` : undefined;
}
