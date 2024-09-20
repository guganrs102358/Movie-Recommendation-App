import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userInfo) => setUser(userInfo);
  const registerUser = (userInfo) => setUser(userInfo);
  const logoutUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
