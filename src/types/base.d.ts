export interface BaseJsendResponse<D, M = undefined> {
  status: 'success' | 'fail' | 'error';
  data: { payload: D; meta: M };
  message?: string;
}

export interface JWT {
  exp: number;
  iat: number;
  iss: string;
}
