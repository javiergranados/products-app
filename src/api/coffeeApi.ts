import axios from 'axios';

const BASE_URL = 'https://coffee-react-native-fh.herokuapp.com/api';

const coffeeApi = axios.create({ baseURL: BASE_URL });

export default coffeeApi;
