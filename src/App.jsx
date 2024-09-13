import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Pagenotfound from "./pages/PageNotFound";
import Login from "./pages/Login";
import City from "./components/City";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import { CitiesContextProvider } from "./contextAPI/CitiesContextProvider";

function App() {
  return (
    <CitiesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />}></Route>
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<Pagenotfound />}></Route>
        </Routes>
      </BrowserRouter>
    </CitiesContextProvider>
  );
}

export default App;
