// services/api/auth.service.ts
import { deleteFromSecureStore } from '@/utils/useSecureStorage';
import { apiRequest } from '../api/apiRequest';


export const checkUsernameAvailability = async (username: string) => {
  return await apiRequest(`/auth/check-username?username=${username}`, 'GET')
}

export const loginUser = async (body: any) => {
  return await apiRequest('/auth/login', 'POST',
    body,
  )
}
export const signUpUser = async (body: any) => {
  return await apiRequest('/auth/signup', 'POST', body)
}


export const getMe = async () => {
  return await apiRequest('/auth/me', 'GET')

}




export const logoutUser = async () => {
  deleteFromSecureStore("token")
  deleteFromSecureStore("user")
}