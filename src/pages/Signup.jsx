import { useState } from "react";
import Message from "../components/Message";
import NavBar from "../components/NavBar";
import styles from "./Signup.module.css";
import Button from "../components/Button";
import { useAuth } from "../contextAPI/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (!name) {
      setIsSubmitting(false);
      return alert("User must have a name.");
    }
    if (!email) {
      setIsSubmitting(false);
      return alert("User must have a valid email.");
    }
    if (!(password.length >= 8)) {
      setIsSubmitting(false);
      return alert("Password must be 8 characters long.");
    }

    if (password !== passwordConfirm) {
      setIsSubmitting(false);
      return alert("Confirm password must be the same as password.");
    }
    try {
      await signup({ name, email, password, passwordConfirm });
    } catch (err) {
      setIsSubmitting(false);
      return;
    }
    navigate("/app");
  }
  return (
    <main className={styles.login}>
      <NavBar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Full name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.buttongap}>
          <Button type="primary" disabled={isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Signup;
