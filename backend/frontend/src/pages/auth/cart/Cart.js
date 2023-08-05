// react
import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../toolkit/cart/actions";
import { reset } from "../../../toolkit/cart/cartSlice";
// styles
import styles from "./styles.module.scss";

// components
import Products from "./Products";
import Table from "./table/Table";

// translate
import { useTranslation } from "react-i18next";

function Cartus() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["auth"]);

  const { user } = useSelector((state) => state.user);

  const cartSlice = useSelector((state) => state.cart);
  const { cart, success } = cartSlice;

  useEffect(() => {
    dispatch(getCart({ language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language]);

  return (
    <article className={styles.container}>
      <Products
        styles={styles}
        cart={cart}
        dispatch={dispatch}
        user={user}
        t={t}
      />
      {cart && <Table styles={styles} cart={cart} t={t} />}
    </article>
  );
}

export default Cartus;
