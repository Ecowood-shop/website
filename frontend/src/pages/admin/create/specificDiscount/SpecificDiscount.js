// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

import { createDiscount } from "../../../../toolkit/discounts/actions";
import { reset } from "../../../../toolkit/discounts/discountSlice";
import { getProducts } from "../../../../toolkit/discounts/discountProductSlice";
import { getUsers } from "../../../../toolkit/discounts/discountUserSlice";

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
// translate
import { useTranslation } from "react-i18next";

function SpecificDiscount() {
  const { t } = useTranslation(["admin"]);
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discountSlice = useSelector((state) => state.discounts);
  const { error, isLoading, success } = discountSlice;

  const { products } = useSelector((state) => state.discountProducts);
  const { users } = useSelector((state) => state.discountUsers);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success) navigate("/admin/discounts/");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success]);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/discounts/")}
        className={styles.button}
      >
        უკან
      </button>
      <section>
        <h1>{t("product.discount")}</h1>
        {isLoading && <Loader color="darkmagenta" />}
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
                    t={t}
                  />

                  <Buttons styles={styles} dispatch={dispatch} t={t} />
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
