export default {
    env: process.env.EXPO_PUBLIC_ENV || 'development',
    port: process.env.EXPO_PUBLIC_PORT || 3008,
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:3008',

    // api
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.105:3008/api/v1',
}
