import { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const AuthContext = createContext();
const initialState = JSON.parse(localStorage.getItem("authorization")) || {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "signup":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action.");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [auth, setAuth] = useLocalStorage(
    { user, isAuthenticated },
    "authorization"
  );

  async function login(email, password) {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();

      if (data.user) {
        setAuth({ user: data.user, isAuthenticated: true });
        dispatch({ type: "login", payload: data.user });
      }
    } catch (error) {
      alert("Email or password is wrong.");
    }

    return;
  }
  async function logout() {
    if (user && isAuthenticated) {
      const res = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "GET",
        credentials: "include",
      });

      setAuth({});
      dispatch({ type: "logout" });
    }
    return;
  }
  async function signup(newUser) {
    try {
      newUser.photo = "default-user";
      const res = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      if (data.user) {
        setAuth({ user: data.user, isAuthenticated: true });
        dispatch({ type: "signup", payload: data.user });
      }
    } catch (error) {
      alert("There was an error signing up.");
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext was used outside the AuthProvider.");

  return context;
}

export { AuthProvider, useAuth };
