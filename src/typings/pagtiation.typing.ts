export interface PagtiationList<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  data: T[];
}
