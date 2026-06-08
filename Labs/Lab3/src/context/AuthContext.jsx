import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const savedUser = localStorage.getItem('auth_user');

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser ? JSON.parse(savedUser) : null,
  error: null,
  isLoading: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('auth_user', JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, user: action.payload, error: null, isLoading: false };
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, user: null, error: action.payload, isLoading: false };
    case 'CHANGE_PASSWORD': {
      const updatedUser = { ...state.user, password: action.payload };
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return { ...state, user: updatedUser };
    }
    case 'LOGOUT':
      localStorage.removeItem('auth_user');
      return { ...state, isAuthenticated: false, user: null, error: null, isLoading: false };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
