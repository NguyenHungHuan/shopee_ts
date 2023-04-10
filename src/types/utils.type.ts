export interface successResponse<Data> {
  message: string
  data: Data
}

export interface errorResponse<Data> {
  message: string
  data?: Data
}
