import { Link, useNavigate } from "react-router-dom";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useAuth } from "../contextAPI/AuthContext";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";
function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className={styles.app}>
      {user && <User />}
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
