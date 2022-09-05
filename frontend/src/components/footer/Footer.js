// REACT
import React from "react";

// OTHERS
import logo from "../../static/images/altax.png";
import styles from "./styles.module.scss";
  
const Footer = () => {
  return (
    <footer className={styles.box}>
      <article className={styles.container}>
        <div className={styles.row}>
          <section className={styles.column}>
            <header className={styles.heading}>ნავიგაცია</header>
            <a className={styles.element} href="#">ჩენს შესახებ</a>
            <a className={styles.element} href="#">კონტაქტი</a>
            <a className={styles.element} href="#">ინსტრუქცია</a>
          </section>
          <section className={styles.column}>
            <header className={styles.heading}>Services</header>
            <a className={styles.element} href="#">Writing</a>
            <a className={styles.element} href="#">Internships</a>
            <a className={styles.element} href="#">Coding</a>
            <a className={styles.element} href="#">Teaching</a>
          </section>
          <section className={styles.column}>
            <header className={styles.heading}>Contact Us</header>
            <a className={styles.element} href="#">Uttar Pradesh</a>
            <a className={styles.element} href="#">Ahemdabad</a>
            <a className={styles.element} href="#">Indore</a>
            <a className={styles.element} href="#">Mumbai</a>
          </section>
          <section className={styles.column}>
            <header className={styles.heading}>Social Media</header>
            <a className={styles.element} href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </a>
            <a className={styles.element} href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </a>
            <a className={styles.element} href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </a>
            <a className={styles.element} href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </a>
          </section>
        </div>
      </article>
    </footer>
  );
};
export default Footer;