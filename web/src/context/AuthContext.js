import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("user data", user);

  // Initialize auth state
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user", err);
        // logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { user, token } = res.data;
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || "Login failed",
      };
    }
  };

  // Signup function
  const signup = async (username, email, password) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {
        username,
        email,
        password,
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.error || "Signup failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // Optionally call backend logout endpoint
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
