import axios from 'axios';
import config  from '../config/index';

const apiBaseUrl: string = config.apiBaseUrl;

export default axios.create({
  
  baseURL: `${apiBaseUrl}`,
  headers: {
    'Content-type': 'application/json',
  },
});
