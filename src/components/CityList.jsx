import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contextAPI/CitiesContextProvider";

function CityList() {
  const { cities, loading, deleteCity } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} onDelete={deleteCity} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
