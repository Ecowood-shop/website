// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "../../../../toolkit/category/actions";
import { reset } from "../../../../toolkit/product/productSlice";

// components
import { Formik, Form } from "formik";
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import Discount from "./components/Discount";
// values
import { initialValues, validationSchema, onSubmit } from "./values";

// styles
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function Product() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["admin"]);
  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, success } = productSlice;

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories({ langauge: i18n.language }));
    if (success) navigate("/admin/products/");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success, i18n.language]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      <section>
        <h1>{t("product.create product")}</h1>
        {isLoading && <Loader />}
        {error && <Message>{error}</Message>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(e) => onSubmit(e, dispatch)}
        >
          {(formik) => {
            return (
              <Form className={styles.form}>
                <h2>{t("product.specification")}</h2>
                <Inputs styles={styles} categories={categories} t={t} />

                <h2>{t("product.discount")}</h2>
                <Discount styles={styles} formik={formik} t={t} />

                <h2>{t("product.details")}</h2>
                <Textarea styles={styles} t={t} />

                {/* submit button */}
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <div>
                      <button type="submit" className={styles.button}>
                        {t("global.submit")}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </article>
  );
}

export default Product;
