// REACT
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// COMPONENTS
import Color from "../../../../components/colorPicker/color/Color";
import image from "../../../../components/colorPicker/a.png";
// OTHERS
import styles from "./product.module.scss";

function Product({ product }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  return (
    <section className={styles.container}>
      <img
        src="https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg"
        onClick={() => navigate(`/product/${product._id}`)}
      />{" "}
      <button className={styles.deleteBtn}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={styles.icon}
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
      <main>
        <h1 onClick={() => navigate(`/product/${product._id}`)}>
          {product.name_geo}{" "}
        </h1>
        <div className={styles.content}>
          <section>
            <p>
              <b>მოცულობა</b>
              0.5 ლიტრი
            </p>
            <label className={styles.selectContainer}>
              <b>რაოდენობა</b>
              <input
                type="number"
                className={styles.select}
                defaultValue={0}
                max={4}
                onChange={(e) => {
                  if (e.target.value <= 4 && e.target.value > 0) {
                    setMessage("");
                    // setQuantity(e.target.value);
                  } else {
                    setMessage("მარაგშია 4");
                  }
                }}
              />
              <p className={styles.message}>{message}</p>
            </label>
          </section>

          <p>
            <b>ფერი </b>
            {/* <Color src={image} /> */}
          </p>
          <h2>
            <b>ფასი: </b>
            {product.price} ლ
          </h2>
        </div>
      </main>
    </section>
  );
}

export default Product;
