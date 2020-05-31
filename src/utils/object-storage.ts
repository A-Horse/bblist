export function objectFileUrl(objectUri: string) {
  let objectId: string = '';
  try {
    objectId = objectUri.split('://')[1];
  } catch (e) {
    throw Error(`parse wrong object image uri: ${objectUri}`);
  }
  return `/api/image/${objectId}`;
}
