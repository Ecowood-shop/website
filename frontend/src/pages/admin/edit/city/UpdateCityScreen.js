// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getShippingPrice } from "../../../../toolkit/shipping/actions";
import { reset } from "../../../../toolkit/shipping/shippingPriceSlice";

// components
import { Formik, Form } from "formik";
// values
import { initialValues, validationSchema, onSubmit } from "./values";
// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import FormikControl from "../../../../components/formik/FormikControl";
// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function UpdateCityScreen() {
  const { t } = useTranslation(["admin"]);
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const shippingPriceSlice = useSelector((state) => state.shippingPrices);
  const { error, isLoading, shippingPrice, success } = shippingPriceSlice;

  useEffect(() => {
    success
      ? navigate("/admin/cities/")
      : dispatch(getShippingPrice({ id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success, id]);

  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/cities")}
        className={styles.button}
      >
        {t("global.back")}
      </button>
      {isLoading && <Loader color="darkmagenta" />}{" "}
      {error && <Message>{error}</Message>}
      {shippingPrice && (
        <Formik
          initialValues={initialValues(shippingPrice)}
          validationSchema={validationSchema}
          onSubmit={(e) => onSubmit(e, dispatch, id)}
        >
          {(formik) => {
            return (
              <section>
                <h1>{t("global.edit")}</h1>
                <Form>
                  <div>
                    <label>
                      {t("order.city")} ({t("global.english")})
                    </label>
                    <FormikControl
                      control="input"
                      type="text"
                      label="name_eng"
                      name="name_eng"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>{" "}
                  <div>
                    <label>
                      {t("order.city")} ({t("global.georgian")})
                    </label>
                    <FormikControl
                      control="input"
                      type="text"
                      label="location"
                      name="location"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>
                  <div>
                    <label>
                      {t("order.city")} ({t("global.russian")})
                    </label>{" "}
                    <FormikControl
                      control="input"
                      type="text"
                      label="name_rus"
                      name="name_rus"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>
                  <div>
                    <label>{t("order.limit")}</label>
                    <FormikControl
                      control="input"
                      type="text"
                      label="limit"
                      name="limit"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>
                  <div>
                    <label>ზედა ფასი</label>
                    <FormikControl
                      control="input"
                      type="text"
                      label="upperLimit"
                      name="upperLimit"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>
                  <div>
                    <label>ქვედა ფასი</label>{" "}
                    <FormikControl
                      control="input"
                      type="text"
                      label="lowerLimit"
                      name="lowerLimit"
                      className={styles.input}
                      placeholder="enter text..."
                    />
                  </div>
                  <button type="submit" className={styles.button}>
                    {t("global.submit")}
                  </button>
                </Form>
              </section>
            );
          }}
        </Formik>
      )}
    </article>
  );
}

export default UpdateCityScreen;
