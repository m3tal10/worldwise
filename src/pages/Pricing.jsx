// Uses the same styles as Product
import styles from "./Product.module.css";
import NavBar from "../components/NavBar";

export default function Product() {
  return (
    <main className={styles.product}>
      <NavBar />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            With Worldwise, we believe in keeping things simple and
            straightforward. For just $9/month, you’ll have access to all the
            features that help you track your adventures, store memories, and
            explore new destinations. No hidden fees or complicated plans—just
            one simple price for a world of travel possibilities!
          </p>
        </div>
        <img
          src="/images/img-2.jpg"
          alt="overview of a large city with skyscrapers"
        />
      </section>
    </main>
  );
}
