import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(function () {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://my-json-server.typicode.com/m3tal10/CitiesData/db"
        );
        const { cities } = await res.json();
        setCities(cities);
      } catch (err) {
        alert("There was an error loading the data...");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
    return () => {};
  }, []);

  async function getCity(id) {
    const filteredCity = cities.filter((city) => {
      return city.id === Number(id);
    });
    console.log(filteredCity);

    setCurrentCity(filteredCity);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
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
