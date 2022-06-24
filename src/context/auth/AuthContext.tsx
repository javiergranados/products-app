import React, { createContext, useReducer } from 'react';
import { AuthState, AuthContextProps } from './AuthTypes';
import { authReducer } from './AuthReducer';
import { LoginData, LoginResponse } from '../../interfaces/login';
import coffeeApi from '../../api/coffeeApi';

const GENERIC_ERROR_TEXT = 'Ha ocurrido un error';

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
    } catch (error: any) {
      const msg: string = error.response.data.msg || GENERIC_ERROR_TEXT;
      addError(msg);
    }
  };

  const addError = (msg: string) => dispatch({ type: 'ADD_ERROR', payload: msg });

  const removeError = () => dispatch({ type: 'REMOVE_ERROR' });

  const logOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logIn,
        addError,
        removeError,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
