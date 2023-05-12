// react
import { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../store/actions/userActions";

// styles
import styles from "./styles.module.scss";

// components
import Products from "./Products";
import Table from "./table/Table";

// translate
import { useTranslation } from "react-i18next";

function Cartus() {
  const dispatch = useDispatch();
  const { t,i18n } = useTranslation(["auth"]);

  const User = useSelector((state) => state.User);
  const { cart, success, user, loadingUser: loading } = User;

  useEffect(() => {
    dispatch(getCart(i18n.language));
  }, [dispatch, success,i18n.language]);
  console.log(cart);

  return (
    <article className={styles.container}>
      <Products
        styles={styles}
        loading={loading}
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
