import styles from "./scss/section1.module.scss";

function Section1({ user, navigate, t }) {
  return (
    <section className={styles.container}>
      <h1>{user.first_name + " " + user.last_name}</h1>
      <div className={styles.table}>
        <p>
          <b>{t("profile.email")} </b> {user.email}
        </p>
        <p>
          <b>{t("profile.phone")} </b> {user.phone}
        </p>
      </div>
      <button
        className={styles.btn}
        onClick={() => navigate("/profile/update")}
      >
        {t("profile.edit")}
      </button>
    </section>
  );
}

export default Section1;
