export function reduceNormalizeMap<T = any>(
  resultMap: { [id: string]: T },
  newMap: { [id: string]: T }
): { [id: string]: T } {
  if (!newMap) {
    return resultMap;
  }
  const subMap = Object.keys(newMap).reduce(
    (result: { [id: string]: T }, id: string) => {
      result[id] = {
        ...resultMap[id],
        ...newMap[id],
      };
      return result;
    },
    {}
  );
  return {
    ...resultMap,
    ...subMap,
  };
}
