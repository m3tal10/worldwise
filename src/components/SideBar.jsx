import { Outlet, useNavigate } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { useAuth } from "../contextAPI/AuthContext";
import Message from "./Message";
import Button from "./Button";

function SideBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  return (
    <div className={styles.sidebar}>
      <Logo />
      {user ? (
        <>
          <AppNav />
          <Outlet />
        </>
      ) : (
        <>
          <Message message="You are not logged in. please log in to note your journey." />
          <Button type="primary" use="link" onClick={handleClick}>
            Log in
          </Button>
        </>
      )}
      <Footer />
    </div>
  );
}

export default SideBar;
