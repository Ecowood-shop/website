// OTHERS
import styles from "./styles.module.scss";

function Error() {
  return (
    <section className={styles.container}>
      <div>
        <h1>Oops, something went wrong. </h1>
        <h2>
          გვერდი ვერ მოიძებნა{" "}
          <svg x="0px" y="0px" viewBox="0 0 100 100">
            <path fill="none" d="M0 0H100V100H0z" />
            <path d="M53 10.5h-6c-5 0-9 4-9 9l5 43c0 4.3 3 7.8 7 8.8 4-.9 7-4.5 7-8.8l5-43c0-5-4-9-9-9z" />
            <circle cx={50} cy={81.5} r={8} />
          </svg>
        </h2>
      </div>
    </section>
  );
}

export default Error;
