import axios, { AxiosResponse, AxiosError } from 'axios';
axios.defaults.withCredentials = true;
import config  from '../config/index';

let apiBaseUrl: string = config.apiBaseUrl;
let LOGIN_URL = `${apiBaseUrl}/auth/login`;

export interface LoginResponse {
  user(user: any): unknown;
  token: string; 
  access_token: string
}

export interface ErrorResponse {
  message: string;
}

const login = async (username: string, password: string): Promise<LoginResponse | ErrorResponse> => {
  try {
    apiBaseUrl = config.apiBaseUrl;
    LOGIN_URL = `${apiBaseUrl}/auth/login`;
    console.log("SSSSsssssssssSSSSSSSS", username, password, LOGIN_URL)
    const response = await axios.post<LoginResponse>(
        LOGIN_URL, 
        { username, password, role: 'farmer' },
        { withCredentials: true }
    );
    console.log("|||||||||| ->", response)
    // localStorage.setItem('username',  response.data.user.username);
    // localStorage.setItem('id',  response.data.user.id);
    // localStorage.setItem('role',  response.data.user.role);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.log("eeror response sending to the context...", error)
    // Handle errors (e.g., network error, wrong credentials)
    throw axiosError.response ? axiosError.response.data : new Error('Network error');
  }
};

const logout = (): void => {
  localStorage.removeItem('token');
  // Implement any other logout logic as needed
};

const AuthService = {
  login,
  logout,
};

export default AuthService;