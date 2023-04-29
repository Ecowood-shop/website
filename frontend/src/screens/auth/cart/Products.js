// react
import { useNavigate } from "react-router-dom";
//components
import Message from "../../../components/Message/Message";
import Loader from "../../../components/loader/Loader";
import Product from "./product/Product";

function Products({ styles, loading, cart, dispatch, user, t }) {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.section1}>
        <h1>{t("cart.products")}</h1>
        {cart?.carts.length === 0 && (
          <div className={styles.emptyCart}>
            <Message>{t("cart.cart is empty")}</Message>
          </div>
        )}
        {loading != false && document.cookie.indexOf("altax") !== -1 ? (
          <Loader color="blueviolet" height />
        ) : user ? (
          <>
            {cart &&
              cart.carts.map((cartItem, index) => (
                <Product
                  product={cart.products.find(
                    (item) => item._id === cartItem.product
                  )}
                  t={t}
                  key={index}
                  variant={cart.variants.find(
                    (item) => item.id === cartItem.variants
                  )}
                  cart={cartItem}
                  dispatch={dispatch}
                />
              ))}
          </>
        ) : (
          <>
            <div className={styles.authError}>
              {t("cart.please")}
              <p
                className={styles.nav}
                onClick={() => navigate("/authorization")}
              >
                {t("cart.log in")}
              </p>{" "}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Products;
