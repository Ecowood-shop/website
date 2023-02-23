// react
import { useNavigate } from "react-router-dom";
//components
import Message from "../../../components/Message/Message";
import Loader from "../../../components/loader/Loader";
import Product from "./product/Product";

function Products({ styles, loading, cart, dispatch, user }) {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.section1}>
        <h1>პროდუქტები</h1>
        {cart?.carts.length === 0 && <div className={styles.emptyCart}><Message>კალათა ცარიელია</Message></div>}
        {loading != false && document.cookie.indexOf("altax") !== -1 ? (
          <Loader color="blueviolet" height />
        ) : user ? (
          <>
            {cart &&
              cart.products.map((product, index) => (
                <Product
                  product={product}
                  key={cart.carts[index].id}
                  variant={cart.variants[index]}
                  cart={cart.carts[index]}
                  dispatch={dispatch}
                />
              ))}
          </>
        ) : (
          <>
            <div className={styles.authError}>
              გთხოვთ გაიარეთ
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
    </>
  );
}

export default Products;
