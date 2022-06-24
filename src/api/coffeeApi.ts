import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://coffee-react-native-fh.herokuapp.com/api';

const coffeeApi = axios.create({ baseURL: BASE_URL });

coffeeApi.interceptors.request.use(async (config) => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }

  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default coffeeApi;
