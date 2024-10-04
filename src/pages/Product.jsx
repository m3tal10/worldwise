import styles from "./Product.module.css";
import NavBar from "../components/NavBar";

export default function Product() {
  return (
    <main className={styles.product}>
      <NavBar />
      <section>
        <img
          src="/images/img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise</h2>
          <p>
            Welcome to Worldwise, your personal travel companion designed to
            make every journey unforgettable. Whether you're an avid
            globetrotter or someone who cherishes occasional getaways, Worldwise
            helps you keep track of every adventure you embark on. Log your
            travels with ease, mark every destination you visit, and create a
            vivid digital diary of your experiences.
          </p>
          <p>
            With Worldwise, you can:
            <ul>
              <li>
                <span>
                  <h3>Capture Your Journey</h3>
                  Seamlessly log each destination and add personal notes, and
                  memories.
                </span>
              </li>
              <li>
                <span>
                  <h3>Map Your World</h3>
                  Visualize your travels on an interactive world map that grows
                  as you explore.
                </span>
              </li>
            </ul>
            <br />
            Your travel experiences are priceless, and Worldwise ensures they’re
            never forgotten. Ready to unlock your next adventure? Start tracking
            your world today!
          </p>
        </div>
      </section>
    </main>
  );
}
