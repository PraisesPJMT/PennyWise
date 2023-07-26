import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { FormDataType } from '../utilities/types';
import { initialUser } from '../utilities/variables';

// Base URL
// const BASE_URL = 'api'; // Production
const BASE_URL = 'http://127.0.0.1:5005'; // Development

const api = axios.create({
  baseURL: BASE_URL,
});

export const API = {
  // Source to to cancel API response
  // source: () => api.CancelToken.source(),

  // Log user out when credentials fail
  logOut: () => {
    sessionStorage.removeItem('token');
  },

  //   Set API header
  setApiHeader: () => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      api.defaults.headers.common['token'] = storedToken;
    } else {
      // Handle token is not present
      API.logOut();
    }
  },

  //   Create Action
  creatAction: async (endPoint: string, formData: FormDataType) => {
    API.setApiHeader();

    try {
      const response = await api.post(endPoint, formData);
      const { status } = response;
      const { data, message, error } = response.data;

      if (error) {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          data,
          message,
          error,
        };
      }

      if (status === 201) {
        return {
          status: 'succeeded', // 'idle' || 'succeeded' || 'failed' || 'loading'
          data,
          message,
          error: false,
        };
      } else {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          data: null,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
        data: null,
        message:
          error.response.data.message ||
          'Something went wrong! Please try again!',
        error: true,
      };
    }
  },

  //   Verify User Credentials
  verifyUser: async () => {
    API.setApiHeader();
    try {
      const response = await api.get('/session/verify');
      const { status } = response;
      const { data, message, error } = response.data;

      if (error) {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          isAuthenticated: false,
          message,
          error,
        };
      }

      if (status === 200) {
        return {
          status: 'succeeded', // 'idle' || 'succeeded' || 'failed' || 'loading'
          isAuthenticated: data,
          message,
          error: false,
        };
      } else {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          isAuthenticated: false,
          message,
          error,
        };
      }
    } catch (error: any) {
      return {
        status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
        isAuthenticated: false,
        message:
          error.response.data.message ||
          'Something went wrong! Please try again!',
        error: error,
      };
    }
  },

  //   Login User
  login: async (formData: FormDataType) => {
    API.setApiHeader();

    try {
      const response = await api.post('/session/login', formData);
      const { status } = response;
      const { data, token, message, error } = response.data;

      if (error) {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          user: data,
          isAuthenticated: false,
          message,
          error,
        };
      }

      if (status === 200) {
        sessionStorage.setItem('token', token);
        return {
          status: 'succeeded', // 'idle' || 'succeeded' || 'failed' || 'loading'
          user: data,
          isAuthenticated: true,
          message,
          error: false,
        };
      } else {
        return {
          status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
          user: initialUser,
          isAuthenticated: false,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: 'failed', // 'idle' || 'succeeded' || 'failed' || 'loading'
        user: initialUser,
        isAuthenticated: false,
        message:
          error?.response.data.message ||
          'Something went wrong! Please try again!',
        error: true,
      };
    }
  },

  //   Register User
  register: async (formData: FormDataType) => {
    const { status, message, error } = await API.creatAction(
      '/session/register',
      formData
    );

    return {
      status, // 'idle' || 'succeeded' || 'failed' || 'loading'
      message,
      error,
    };
  },
};
