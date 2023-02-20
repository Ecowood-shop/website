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


function Cartus() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { cart, success, user, loadingUser: loading } = User;



  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, success]);
  console.log(cart);

  return (
    <article className={styles.container}>
      <Products
        styles={styles}
        loading={loading}
        cart={cart}
        dispatch={dispatch}
        user={user}
      />
      {cart && <Table styles={styles} cart={cart} />}
    </article>
  );
}

export default Cartus;
