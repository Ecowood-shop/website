// OTHERS
import styles from "./styles.module.scss";

function About() {
  return (
    <article className={styles.container}>
      <header>
        {" "}
        <h1>ჩვენს შესახებ</h1>
      </header>
      <img src="https://ecowood.ge/wp-content/uploads/2021/02/fb-offer.jpg" />
      <p>
        The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum." Section 1.10.32 of "de Finibus Bonorum et Malorum",
        written by Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
        dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
        sed quia non numquam eius modi tempora incidunt ut labore et dolore
        magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
        nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
        aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
        qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
        illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      </p>
      <h1>ფილიალები</h1>

      <section>
        <div className={styles.text}>
          <h2>ეკოვუდი</h2>
          <div>
            <span className={styles.element}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={styles.iconSm}
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              0 322 47 44 22
            </span>
            <a className={styles.element} href="mailto:dd@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={styles.iconSm}
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              sales@essltd.ge
            </a>{" "}
            <span className={styles.element}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className={styles.iconSm}
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
              </svg>
              თბილისი, წყალსადენის ქ. N21
            </span>
            <span className={styles.work}>
              <h2>სამუშაო საათები</h2>
              <p> 10:00-18:00 (ყოველდღე)</p>
            </span>
          </div>
        </div>
        <iframe
          className={styles.iframe}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d23799.269690933612!2d44.793126!3d41.787181000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x88b159ead528793b!2z4YOu4YOY4YOhIOGDm-GDkOGDoeGDkOGDmuGDlOGDkeGDmCBlY293b29k!5e0!3m2!1sen!2sge!4v1662733594142!5m2!1sen!2sge"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section>
        <div className={styles.text}>
          <h2>ექსპრეს ფილიალი</h2>
          <div>
            <span className={styles.element}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={styles.iconSm}
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              0 322 47 33 22
            </span>
            <a className={styles.element} href="mailto:dd@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className={styles.iconSm}
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              sales@altax.ge
            </a>{" "}
            <span className={styles.element}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className={styles.iconSm}
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
              </svg>
              თბილისი, რაფაელ აგლაძის  ქ. N15
            </span>
            <span className={styles.work}>
              <h2>სამუშაო საათები</h2>
              <p> 10:00-18:00 (ორშაბათი-კვირა)</p>
            </span>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.230928184418!2d44.77693844514974!3d41.73711163268105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472eb08b59cc5%3A0x6d0d96385b223366!2zMTUg4YOg4YOQ4YOk4YOQ4YOU4YOaIOGDkOGDkuGDmuGDkOGDq-GDmOGDoSDhg6Xhg6Phg6nhg5AsIFQnYmlsaXNp!5e0!3m2!1sen!2sge!4v1662738716119!5m2!1sen!2sge"
          className={styles.iframe}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </article>
  );
}

export default About;
