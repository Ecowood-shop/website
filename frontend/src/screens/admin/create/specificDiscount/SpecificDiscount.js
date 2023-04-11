// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

import {
  getProducts,
  getUsers,
  createDiscount,
} from "../../../../store/actions/discountActions";

// components
import { Formik, Form } from "formik";
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import Inputs from "./components/Inputs";
import Buttons from "./components/Buttons";

// values
import { initialValues, validationSchema, onSubmit } from "./values";

// styles
import styles from "./styles.module.scss";

function SpecificDiscount() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Discounts = useSelector((state) => state.discounts);
  const { loading, users, products, success, error } = Discounts;

  useEffect(() => {
    if (success) navigate("/admin/discounts/");
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch, navigate, success]);

  console.log(users, products);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/discounts/")}
        className={styles.button}
      >
        უკან
      </button>{" "}
      <section>
        <h1>DISCOUNT</h1>
        {loading && <Loader />}
        <div className={styles.error}>
          {error && <Message>{error}</Message>}
        </div>

        {users && products?.length > 0 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e, dispatch, createDiscount)}
          >
            {(formik) => {
              return (
                <Form className={styles.form}>
                  <Inputs
                    styles={styles}
                    formik={formik}
                    products={products}
                    users={users}
                  />

                  <Buttons styles={styles} dispatch={dispatch} />
                </Form>
              );
            }}
          </Formik>
        )}
      </section>
    </article>
  );
}

export default SpecificDiscount;
