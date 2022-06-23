import { AuthActions, AuthState } from './AuthTypes';

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        errorMessage: '',
      };
    case 'ADD_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        status: 'unauthenticated',
        errorMessage: action.payload,
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        errorMessage: '',
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: null,
        token: null,
        status: 'unauthenticated',
        errorMessage: '',
      };
    default:
      return state;
  }
};

export { authReducer };
