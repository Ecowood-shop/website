// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "../../../../store/actions/systemActions";

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
  const adminProduct = useSelector((state) => state.adminProduct);
  const { error, loading, createSuccess: success } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  useEffect(() => {
    dispatch(getCategories(i18n.language));
    if (success) navigate("/admin/products/");
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
        {loading && <Loader />}
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
