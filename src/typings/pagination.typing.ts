export interface PaginationList<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  data: T[];
}
