import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthContextProps } from './AuthTypes';
import { authReducer } from './AuthReducer';
import { LoginData, LoginResponse } from '../../interfaces/login';
import { RegisterData, RegisterResponse } from '../../interfaces/register';
import coffeeApi from '../../api/coffeeApi';

const GENERIC_ERROR_TEXT = 'Unexpected error';

export const AuthContext = createContext({} as AuthContextProps);

const PERMISSIONS_INITIAL_STATE: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, PERMISSIONS_INITIAL_STATE);

  const logIn = async ({ correo, password }: LoginData) => {
    try {
      const response = await coffeeApi.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({ type: 'LOG_IN', payload: { token: response.data.token, user: response.data.usuario } });

      await AsyncStorage.setItem('token', response.data.token);
    } catch (error: any) {
      const msg: string = error.response.data.msg || GENERIC_ERROR_TEXT;
      addError(msg);
    }
  };

  const signUp = async ({ correo, password, nombre }: RegisterData) => {
    try {
      const response = await coffeeApi.post<RegisterResponse>('/usuarios', { correo, password, nombre });
      dispatch({ type: 'LOG_IN', payload: { token: response.data.token, user: response.data.usuario } });

      await AsyncStorage.setItem('token', response.data.token);
    } catch (error: any) {
      const msg: string = error.response.data.errors[0].msg || GENERIC_ERROR_TEXT;
      addError(msg);
    }
  };

  const addError = (msg: string) => dispatch({ type: 'ADD_ERROR', payload: msg });

  const removeError = () => dispatch({ type: 'REMOVE_ERROR' });

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOG_OUT' });
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return dispatch({ type: 'LOG_OUT' });
    }

    const response = await coffeeApi.get('/auth');
    if (response.status !== 200) {
      return dispatch({ type: 'LOG_OUT' });
    }

    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'LOG_IN', payload: { token: response.data.token, user: response.data.usuario } });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logIn,
        signUp,
        addError,
        removeError,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
