// REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../store/actions/userActions";

// COMPONENTS
import Product from "./product/Product";
import Loader from "../../../components/loader/Loader";
// OTHERS
import styles from "./styles.module.scss";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [coupon, setCoupon] = useState();

  const User = useSelector((state) => state.User);
  const {cart, success, user } = User;

  useEffect(() => {
    dispatch(getCart());
    setMessage(0);
  }, [dispatch, success]);
console.log(message)
  return (
    <article className={styles.container}>
      <section className={styles.section1}>
        <h1>პროდუქტები</h1>
        {user ? (
          <>
            {cart &&
              cart.products.map((product, index) => (
                <Product
                  product={product}
                  key={cart.carts[index].id}
                  variant={cart.variants[index]}
                  cart={cart.carts[index]}
                  dispatch={dispatch}
                  handlerPlus={() => setMessage(message + 1)}
                  handlerMinus={() => setMessage(message - 1)}
                />
              ))}
          </>
        ) : (
          <>
            <div className={styles.authError}>
              {" "}
              გთხოვთ გაიარეთ{" "}
              <p
                className={styles.nav}
                onClick={() => navigate("/authorization")}
              >
                ავტორიზაცია
              </p>{" "}
            </div>
          </>
        )}
      </section>
      {cart && (
        <section className={styles.section2}>
          <h1>ჯამი</h1>
          <div className={styles.table}>
            <h2>
              <b>რაოდენობა:</b> {cart.qty}
            </h2>
            <h2>
              <b>ჯამი: </b>
              {cart.sum_price} ლ
            </h2>
            {coupon == "dd" && (
              <p className={styles.error}>კუპონი ვერ მოიძებნა</p>
            )}
            <input
              className={styles.coupon}
              placeholder="კუპონი..."
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button
              className={styles.btn}
              onClick={() => {
                setCoupon("dd");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 576 512"
              >
                <path d="M400 256C400 317.9 349.9 368 288 368C226.1 368 176 317.9 176 256C176 194.1 226.1 144 288 144C349.9 144 400 194.1 400 256zM272 224V288H264C255.2 288 248 295.2 248 304C248 312.8 255.2 320 264 320H312C320.8 320 328 312.8 328 304C328 295.2 320.8 288 312 288H304V208C304 199.2 296.8 192 288 192H272C263.2 192 256 199.2 256 208C256 216.8 263.2 224 272 224zM0 128C0 92.65 28.65 64 64 64H512C547.3 64 576 92.65 576 128V384C576 419.3 547.3 448 512 448H64C28.65 448 0 419.3 0 384V128zM48 176V336C83.35 336 112 364.7 112 400H464C464 364.7 492.7 336 528 336V176C492.7 176 464 147.3 464 112H112C112 147.3 83.35 176 48 176z" />
              </svg>
              შემოწმება
            </button>

            <button
              className={styles.btn}
              onClick={() => {
                if (message === 0 ) navigate("/checkout/shippingmethod");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              გადახდა
            </button>
          </div>
        </section>
      )}
    </article>
  );
}

export default Cart;
