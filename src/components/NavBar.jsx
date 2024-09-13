import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
