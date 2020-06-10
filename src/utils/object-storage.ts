export function objectFileUrl(objectUri: string) {
  if (!objectUri) {
    return undefined;
  }
  const objectId: string = objectUri.split('://')[1];
  return objectId ? `/api/image/${objectId}` : undefined;
}
