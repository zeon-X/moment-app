// services/api/auth.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiRequest } from './apiRequest'


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


export const logoutUser = async () => {
  await AsyncStorage.multiRemove(['token', 'user'])
}