// services/api/auth.service.ts
import { apiRequest } from './apiRequest'


export const checkUsernameAvailability = async (username: string) => {
  return await apiRequest(`/auth/check-username?username=${username}`, 'GET')
}

export const loginUser = async (body: any) => {
  return await apiRequest('/auth/login', 'POST',
    JSON.stringify(body),
  )
}
export const signUpUser = async (body: any) => {
  return await apiRequest('/auth/signup', 'POST', JSON.stringify(body))
}
