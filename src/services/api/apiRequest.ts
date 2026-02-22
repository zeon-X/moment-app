import config from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = config.apiUrl

/**
 * Basic JSON request
 */
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any
) => {


  const token = await AsyncStorage.getItem('token')

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  // console.log("data from apires", data);


  // if (!data.success) {
  //   throw new Error(data.message || 'Something went wrong')
  // }

  return data
}