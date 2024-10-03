import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../contextAPI/AuthContext";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR TESTING PURPOSES
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("rahimsheikh05@gmail.com");
  const [password, setPassword] = useState("mash1234");
  const { login, isAuthenticated } = useAuth();
  const type = searchParams.get("type");

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }
  function handleClick() {
    navigate("/signup");
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <main className={styles.login}>
      <NavBar />
      <form className={styles.form} onSubmit={handleSubmit}>
        {type === "redirect" && (
          <Message message="Please log in to continue." />
        )}
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.buttongap}>
          <Button type="primary">Login</Button>
          <Button type="secondary" use="link" onClick={handleClick}>
            Sign up
          </Button>
        </div>
      </form>
    </main>
  );
}
