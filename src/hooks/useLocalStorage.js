import { useEffect, useState } from "react";

function useLocalStorage(initialState, key) {
  const [auth, setAuth] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(auth));
  }, [auth, key]);
  return [auth, setAuth];
}

export default useLocalStorage;
