export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
  error?: string;
}

export type ErrorResponse = ApiResponse<unknown>;
// unknown을 통한 에러 핸들링
