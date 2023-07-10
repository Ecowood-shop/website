// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProducts,
  getUsers,
  getSpecificDiscount,
  updateDiscount,
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

// translate
import { useTranslation } from "react-i18next";

function SpecificDiscount() {
  const { t } = useTranslation(["admin"]);
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Discounts = useSelector((state) => state.discounts);
  const { loading, users, products, success } = Discounts;

  const specificDiscount = useSelector((state) => state.specificDiscount);
  const {
    error: discountError,
    loading: discountLoading,
    discount,
  } = specificDiscount;

  const { id } = useParams();
  useEffect(() => {
    if (success) navigate("/admin/discounts/");
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getSpecificDiscount(id));
  }, [dispatch, id, navigate, success]);

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
        {(discountLoading || loading) && <Loader />}
        {discountError && <Message>{discountError}</Message>}{" "}
        {discount && users && products?.length > 0 && (
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

                  <Buttons styles={styles} dispatch={dispatch}   t={t}/>
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
