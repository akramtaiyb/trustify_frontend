import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) : null;
  });
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("CSRF error:", error.message);
    }
  };

  const checkAuth = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
      localStorage.removeItem("user");
      console.error("Error fetching user:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      await csrf();
      await checkAuth();
    };

    initializeAuth();
  }, [checkAuth]);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      await csrf();
      const response = await axios.post("/api/login", formData);
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      await checkAuth();
      navigate("/journal");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setIsAuth(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    try {
      await csrf();
      await axios.post("/register", formData);
      await checkAuth();
      navigate("/contacts");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      console.error("Registration failed:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
