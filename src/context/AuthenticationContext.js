import { createContext, useState } from "react";
const DEFAULT_TOKEN = {
  loading: false,
  data: localStorage.getItem("token") || "",
  error: null,
};
const AuthContext = createContext(DEFAULT_TOKEN);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(DEFAULT_TOKEN.loading);
  const [token, setToken] = useState(DEFAULT_TOKEN.data);
  const [tokenError, setTokenError] = useState(DEFAULT_TOKEN.error);
  localStorage.setItem("token", token);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loading,
        setLoading,
        tokenError,
        setTokenError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthProvider };
