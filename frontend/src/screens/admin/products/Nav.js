import React from "react";

function Nav({ styles, navigate }) {
  return (
    <nav className={styles.btnContainer}>
      <button
        className={styles.btn + " w3-animate-right"}
        onClick={() => navigate("/admin/categories")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={styles.icon1}
        >
          <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
        </svg>
        კატეგორია
      </button>
      <button
        className={styles.btn + " w3-animate-right"}
        onClick={() => navigate("/admin/products/create")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 512 512"
        >
          <title>Add Circle</title>
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 176v160M336 256H176"
          />
        </svg>{" "}
        პროდუქტი
      </button>
    </nav>
  );
}

export default Nav;
