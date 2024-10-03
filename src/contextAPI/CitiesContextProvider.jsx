import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  currentCity: {},
  loading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, loading: false, cities: [...action.payload] };
    case "city/loaded":
      return { ...state, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    case "loading":
      return { ...state, loading: true };
    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

function CitiesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, loading, currentCity, error } = state;
  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) return;
      const fetchCities = async () => {
        try {
          dispatch({ type: "loading" });
          const res = await fetch(
            `https://worldwise-backend-6tcs.onrender.com/api/v1/cities/user/${user.id}`,
            {
              credentials: "include",
            }
          );
          const { data } = await res.json();
          dispatch({ type: "cities/loaded", payload: data.cities });
        } catch (err) {
          const message = "There was an error loading the data...";
          dispatch({ type: "rejected", payload: message });
          alert(message);
        }
      };
      fetchCities();
      return () => {};
    },
    [isAuthenticated, user]
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    const filteredCity = cities.filter((city) => {
      return city.id === Number(id);
    });
    dispatch({ type: "city/loaded", payload: filteredCity });
  }

  const createCity = async (newCity) => {
    try {
      newCity.user = user.id;
      dispatch({ type: "loading" });
      const res = await fetch(
        "https://worldwise-backend-6tcs.onrender.com/api/v1/cities/",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();

      dispatch({ type: "city/created", payload: data.city });
    } catch (err) {
      const message = "There was an error creating the city...";
      dispatch({ type: "rejected", payload: message });
      alert(message);
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const filteredCities = cities.filter((city) => city.id !== id);
      const res = await fetch(
        `https://worldwise-backend-6tcs.onrender.com/api/v1/cities/${id}`,
        {
          method: "DELETE",
        }
      );
      dispatch({ type: "cities/loaded", payload: filteredCities });
    } catch (err) {
      const message = "There was an error deleting the city...";
      dispatch({ type: "rejected", payload: message });
      alert(message);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("Citiescontext was used outside the CitiesProvider");

  return context;
}

export { CitiesContextProvider, useCities };
