import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import {
  APIGroupResponse,
  APIGroupsResponse,
  FormDataType,
  Response,
  UserResponse,
  VerifyResponse,
} from '../utilities/types';
import { Status, initialUser } from '../utilities/variables';

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

  //   Fetch Action
  fetchAction: async (endPoint: string) => {
    API.setApiHeader();

    try {
      const response = await api.get(endPoint);
      const { status } = response;
      const { data, message } = response.data as Response;

      if (status === 200) {
        console.log('Fetched Data: ', JSON.stringify(data));

        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data,
          message,
          error: false,
        };
      } else {
        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        data: null,
        message:
          error.response.data.message ||
          'Something went wrong! Please try again!',
        error: true,
      };
    }
  },

  //   Create Action
  creatAction: async (endPoint: string, formData: FormDataType) => {
    API.setApiHeader();

    try {
      const response = await api.post(endPoint, formData);
      const { status } = response;
      const { data, message } = response.data as Response;

      if (status === 201) {
        // console.log('Created Data: ', JSON.stringify(data));

        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data,
          message,
          error: false,
        };
      } else {
        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        data: null,
        message:
          error.response.data.message ||
          'Something went wrong! Please try again!',
        error: true,
      };
    }
  },

  //   Edit Action
  editAction: async (endPoint: string, formData: FormDataType) => {
    API.setApiHeader();

    try {
      const response = await api.put(endPoint, formData);
      const { status } = response;
      const { data, message } = response.data as Response;
      console.log('Updated Response: ', response);

      if (status === 200) {
        // console.log('Updated Data: ', JSON.stringify(data));

        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data,
          message,
          error: false,
        };
      } else {
        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        data: null,
        message:
          error.response.data.message ||
          'Something went wrong! Please try again!',
        error: true,
      };
    }
  },

  //   Delete Action
  deleteAction: async (endPoint: string) => {
    API.setApiHeader();

    try {
      const response = await api.delete(endPoint);
      const { status } = response;
      const { data, message } = response.data as Response;
      console.log('Delete Response: ', response);

      if (status === 200) {
        // console.log('Deleted Data: ', JSON.stringify(data));

        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data,
          message,
          error: false,
        };
      } else {
        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          data: null,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
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
      const { data, message } = response.data as VerifyResponse;

      if (status === 200) {
        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          isAuthenticated: data,
          message,
          error: false,
        };
      } else {
        API.logOut();

        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          isAuthenticated: false,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      API.logOut();

      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        isAuthenticated: false,
        message:
          error.response?.data?.message ||
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
      const { data, token, message } = response.data as UserResponse;

      if (status === 200 && token) {
        sessionStorage.setItem('token', token);

        return {
          status: Status.SUCCEEDED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          user: data,
          isAuthenticated: true,
          message,
          error: false,
        };
      } else {
        return {
          status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
          user: initialUser,
          isAuthenticated: false,
          message,
          error: true,
        };
      }
    } catch (error: any) {
      return {
        status: Status.FAILED, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
        user: initialUser,
        isAuthenticated: false,
        message:
          error.response.data.message ||
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
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },

  // Create Group
  createGroup: async (formData: FormDataType) => {
    const response = await API.creatAction('/group', formData);

    const { status, data, message, error } = response as APIGroupResponse;

    return {
      group: data,
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },

  // Fetch All Groups
  fetchGroups: async () => {
    const response = await API.fetchAction('/group');

    const { status, data, message, error } = response as APIGroupsResponse;

    return {
      groups: data,
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },

  // Fetch A Group
  fetchGroup: async (groupId: string) => {
    const response = await API.fetchAction(`/group/${groupId}`);

    const { status, data, message, error } = response as APIGroupResponse;

    return {
      group: data,
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },

  // Edit Group
  editGroup: async (groupId: string, formData: FormDataType) => {
    const response = await API.editAction(`/group/${groupId}`, formData);

    const { status, data, message, error } = response as APIGroupResponse;

    return {
      group: data,
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },

  // Delete Group
  deleteGroup: async (groupId: string) => {
    const response = await API.deleteAction(`/group/${groupId}`);

    const { status, data, message, error } = response as APIGroupResponse;

    return {
      group: data,
      status, // 'IDLE' || 'SUCCEEDED' || 'FAILED' || 'LOADING'
      message,
      error,
    };
  },
};
