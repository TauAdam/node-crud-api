export interface User {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export const enum HTTP_METHODS {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const BASE_URL = '/api/users'
