import React, { createContext, useReducer } from 'react';
import { AuthState, AuthContextProps } from './AuthTypes';
import { authReducer } from './AuthReducer';

export const AuthContext = createContext({} as AuthContextProps);

const PERMISSIONS_INITIAL_STATE: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
};

export const AuthProvider = ({ children }: any) => {
  const [state] = useReducer(authReducer, PERMISSIONS_INITIAL_STATE);

  const logIn = () => {};

  const addError = () => {};

  const removeError = () => {};

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
