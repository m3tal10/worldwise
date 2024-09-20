import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...initialState };

    default:
      throw new Error("Unknown action.");
  }
}
const FAKE_USER = {
  name: "Mashrafie",
  email: "mashrafie@example.com",
  password: "qwerty",
  avatar:
    "https://media.licdn.com/dms/image/v2/C5603AQHXYjIQrdABLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1644058972687?e=1732147200&v=beta&t=AfIfYWIpc23Q1vjdtbn4dQZUprvqhk--PxosUP1Vn5I",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
    return;
  }
  function logout() {
    if (user && isAuthenticated) {
      dispatch({ type: "logout" });
    }
    return;
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
