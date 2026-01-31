/* ---------- Global ---------- */

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface EmptyResponse {
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  dataCount: number;
  total: number;
  page: number;
  limit: number;
}
