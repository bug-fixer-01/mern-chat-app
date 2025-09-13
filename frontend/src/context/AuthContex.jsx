import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("chat-user");
      if (!storedUser || storedUser === "undefined") return null; // safeguard
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing auth user:", error);
      return null;
    }
  };

  const [authUser, setAuthUser] = useState(getStoredUser);

  useEffect(() => {
    if (authUser === null) {
      localStorage.removeItem("chat-user"); // clean up invalid entry
    } else {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
