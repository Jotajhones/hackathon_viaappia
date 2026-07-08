export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}