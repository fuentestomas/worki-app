import React, { createContext } from 'react';
import { useReducer } from 'react';
import { authReducer } from './authReducer';

export const AuthContext = createContext();

const initialState = {
  logged: false,
  user: {},
};

const init = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  // return {
  //   logged: !!user,
  //   user: user,
  // };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = async (user = '') => {
    dispatch({
      type: '[Auth] Login',
      payload: user,
    });
    // localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    dispatch({
      type: '[Auth] Logout',
    });
    // localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
