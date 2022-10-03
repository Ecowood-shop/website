import styles from "./scss/section1.module.scss";

function Section1({ user, navigate }) {
  return (
    <section className={styles.container}>
      <h1>{user.first_name + " " + user.last_name}</h1>
      <div className={styles.table}>
        <p>
          <b>მეილი </b> {user.email}
        </p>
        <p>
          <b>ტელეფონი </b> {user.phone}
        </p>
      </div>
      <button
        className={styles.btn}
        onClick={() => navigate("/profile/update")}
      >
        რედაქტირება
      </button>
    </section>
  );
}

export default Section1;
