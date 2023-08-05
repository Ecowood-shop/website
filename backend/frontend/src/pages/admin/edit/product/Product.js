// react
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../toolkit/category/actions";
import { getProductAdmin } from "../../../../toolkit/product/actions";
import { reset } from "../../../../toolkit/product/productSlice";

// components
import { Formik, Form } from "formik";
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import Discount from "./components/Discount";
import Buttons from "./components/Buttons";

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
  const { i18n, t } = useTranslation(["admin"]);
  const { id } = useParams();

  const productSlice = useSelector((state) => state.products);
  const { error, isLoading, product, success } = productSlice;

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (success) {
      navigate("/admin/products/");
    } else {
      dispatch(getCategories({ language: i18n.language }));
      dispatch(getProductAdmin({ id: id }));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, navigate, i18n.language, id]);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {isLoading && <Loader />}

      <section>
        <Buttons styles={styles} id={id} navigate={navigate} t={t} />
        <h1> {t("product.edit product")}</h1>
        {error && <Message>{error}</Message>}
        {product?.products && (
          <Formik
            initialValues={initialValues(product.products)}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e, dispatch, id)}
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
        )}
      </section>
    </article>
  );
}

export default Product;
