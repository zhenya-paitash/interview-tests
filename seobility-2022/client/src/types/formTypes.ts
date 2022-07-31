export interface DataRequest {
  username: string
  email: string
  phone: string
  birthday: string
  message: string
}

export interface DataResponse {
  status: string
  message: string
  code?: string
  stack?: string
}