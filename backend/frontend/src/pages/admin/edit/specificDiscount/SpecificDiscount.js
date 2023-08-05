// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getDiscount,
  updateDiscount,
} from "../../../../toolkit/discounts/actions";
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

  const { id } = useParams();

  const discountSlice = useSelector((state) => state.discounts);
  const { error, isLoading, discount, success } = discountSlice;

  const { products } = useSelector((state) => state.discountProducts);
  const { users } = useSelector((state) => state.discountUsers);
  useEffect(() => {
    dispatch(getDiscount({ id: id }));
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch, id]);

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
        {t("global.back")}
      </button>
      <section>
        <h1>{t("product.discount")}</h1>
        {isLoading && <Loader color="darkmagenta" />}
        {error && <Message>{error}</Message>}{" "}
        {discount && users?.length > 0 && products?.length > 0 && (
          <Formik
            initialValues={initialValues(
              discount.user,
              discount.product,
              discount.percentage
            )}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e, id, dispatch, updateDiscount)}
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
