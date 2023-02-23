// REACT
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// REDUX
import { deleteCart, updateCart } from "../../../../store/actions/userActions";

// COMPONENTS
import Color from "../../../../components/colorPicker/color/Color";
// OTHERS
import styles from "./product.module.scss";

function Product({ product, variant, cart, dispatch }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(cart?.qty);
  const [message, setMessage] = useState(
    variant.active
      ? variant.quantity < 1 || variant.quantity < quantity
        ? `in stock ${variant.quantity}`
        : ""
      : "product is deleted"
  );

  const changer = (number) => {
    switch (number) {
      case "-":
        if (!variant.active) {
          setMessage("product is deleted");
        } else if (quantity - 1 < 1 || !quantity) {
          setMessage(`in stock ${variant.quantity}`);
        } else if (variant.quantity < quantity - 1) {
          setQuantity(Number(quantity - 1));
          setMessage(`in stock ${variant.quantity} `);
        } else {
          setMessage("");
          setQuantity(Number(quantity - 1));
        }
        break;
      case "+":
        if (!variant.active) {
          setMessage("product is deleted");
        } else if (quantity + 1 <= variant.quantity && quantity + 1 > 0) {
          setMessage("");
          setQuantity(Number(quantity + 1));
        } else {
          setMessage(`in stock ${variant.quantity}`);
        }
        break;
      default:
        if (!variant.active) {
          setMessage("product is deleted");
        } else if (number <= variant.quantity && number > 0) {
          setMessage("");
          setQuantity(Number(number));
        } else {
          setMessage(`in stock ${variant.quantity}`);
        }
        break;
    }
  };

  useEffect(() => {
    if (quantity > 0 && quantity <= variant.quantity && quantity != cart.qty) {
      dispatch(updateCart(cart.id, quantity));
    }
  }, [quantity]);

  return (
    <section className={styles.container}>
      <img
        src={product?.picture_set[0]?.picture}
        onClick={() => navigate(`/product/${product._id}`)}
        alt={product.name_geo}
      />
        {product?.discount &&
            parseFloat(product?.discount.discount_percent) > 0 && (
              <div className={styles.discount}>
                -{parseFloat(product.discount.discount_percent)}%
              </div>
            )}
      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteCart(cart.id))}
      >
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
          {product.name_geo}
        </h1>
        <div className={styles.content}>
          <section>
            <p>
              <b>მოცულობა</b>
              {product.size}
            </p>
            <div className={styles.selectContainer}>
              <b>რაოდენობა</b>
              <button onClick={() => changer("-")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>
              <input
                type="number"
                className={styles.select}
                value={quantity}
                max={variant.quantity}
                min="0"
                onChange={(e) => changer(e.target.value)}
              />
              <button onClick={() => changer("+")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
            </div>
            <p className={styles.message}>{message}</p>
          </section>
          {variant.color != "default" && (
            <span className={styles.color}>
              <b>ფერი </b>
              <Color element={variant} />
            </span>
          )}
          <h2>
            <b>ფასი: </b>
            {product?.discount &&
            parseFloat(product?.discount.discount_percent) > 0
              ? (
                  parseFloat(product.price) -
                  (parseFloat(product.price) *
                    parseFloat(product.discount.discount_percent)) /
                    100
                ).toFixed(2)
              : product.price}{" "}
            ლ
          </h2>
        </div>
      </main>
    </section>
  );
}

export default Product;
