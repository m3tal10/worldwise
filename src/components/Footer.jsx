import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by Mashrafie Rahim Sheikh.
      </p>
    </footer>
  );
}

export default Footer;
