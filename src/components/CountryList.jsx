import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contextAPI/CitiesContextProvider";

function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.includes(city.country)) return [...arr, city];
    else return arr;
  }, []);
  if (!countries.length) return <Message />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
