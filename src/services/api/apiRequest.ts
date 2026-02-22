import config from '@/config';
import { globalLogout } from '@/utils/logout-handler';
import { getFromSecureStore } from '@/utils/useSecureStorage';

const API_URL = config.apiUrl

/**
 * Basic JSON request
 */
export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any
) => {


  const token = await getFromSecureStore("token");


  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  // console.log("data from ApiRequest:", JSON.stringify(response, null, 1), data);

  if (response.status === 401) {
    if (globalLogout.handler) globalLogout.handler();
  }

  // if (!data.success) {
  //   throw new Error(data.message || 'Something went wrong')
  // }

  return data
}