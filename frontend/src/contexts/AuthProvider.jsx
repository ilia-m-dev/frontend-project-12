import { useMemo, useState } from 'react';
import AuthContext from './AuthContext.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');

    return userData ? JSON.parse(userData) : null;
  });

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;