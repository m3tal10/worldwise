import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

function Button({ children, onClick, use, type, disabled }) {
  const navigate = useNavigate();
  function handleClick(e) {
    if (type === "back") {
      e.preventDefault();
      navigate(-1);
    }
    if (type === "position") {
      onClick();
    }
    if (use === "link") {
      e.preventDefault();
      onClick();
    }
  }
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
