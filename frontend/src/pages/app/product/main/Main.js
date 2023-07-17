// react
import { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../toolkit/cart/actions";
import { reset } from "../../../../toolkit/cart/cartSlice";

//components
import SlideShow from "./SlideShow";
import Description from "./Description";
import Buttons from "./Buttons";
import Color from "./Color";
import Quantity from "./Quantity";
import { Formik, Form } from "formik";
// values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from ".././sections/scss/section1.module.scss";

function Main({ product, iframe, youtube, variants, navigate, id, t }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const cartSlice = useSelector((state) => state.cart);
  const { error, success } = cartSlice;

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(
        addToCart({
          id: product._id,
          formData: { variantID: values.color.id, qty: values.quantity },
        })
      );
      actions.setSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if (success) navigate("/cart");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, success]);

  return (
    <article className={styles.article}>
      <h2 className={styles.name}>{product.name_geo}</h2>
      <section className={styles.section1}>
        <SlideShow
          styles={styles}
          youtube={youtube}
          iframe={iframe}
          product={product}
        />
        <div className={styles.table}>
          {product?.discount &&
            parseFloat(product?.discount.percentage) > 0 && (
              <div className={styles.discount}>
                -{parseFloat(product.discount.percentage)}%
              </div>
            )}

          <Description product={product} t={t} styles={styles} />

          <Formik
            initialValues={initialValues(variants)}
            validationSchema={validationSchema(t)}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const { values, setFieldValue } = formik;
              return (
                <Form>
                  <Color
                    styles={styles}
                    color={values["color"]}
                    variants={variants}
                    name={"color"}
                    setColor={(e) => {
                      setFieldValue("color", e);
                    }}
                  />
                  <p className={styles.price}>
                    <b>{t("product.price")}:</b>
                    {product?.discount &&
                    parseFloat(product?.discount.percentage) > 0 ? (
                      <>
                        <i> {product.price}</i>
                        {(
                          parseFloat(product.price) -
                          (parseFloat(product.price) *
                            parseFloat(product.discount.percentage)) /
                            100
                        ).toFixed(2)}{" "}
                        ₾
                      </>
                    ) : (
                      <>{product.price} ₾ </>
                    )}
                  </p>
                  <Quantity styles={styles} t={t} />
                  {error && <p className={styles.error}>{error}</p>}
                  {!user && (
                    <Link className={styles.error} to="/authorization">
                      {t("product.authorization is required")}
                    </Link>
                  )}
                  <Buttons
                    styles={styles}
                    product={product}
                    formik={formik}
                    user={user}
                    t={t}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </article>
  );
}

export default Main;
