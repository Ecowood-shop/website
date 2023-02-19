// react
import { useEffect } from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../store/actions/userActions";
import USER from "../../../../store/constants/userConstants";

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

function Main({ product, iframe, youtube, variants, navigate, id }) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { error, loading, successCartAdd, user } = User;

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      dispatch(addToCart(product._id, values.color.id, values.quantity));
      actions.setSubmitting(false);
    }, 1000);
  };
  const onChange = () => {
    if (error) dispatch({ type: USER.CART_ERROR_RESET });
  };

  useEffect(() => {
    if (successCartAdd) navigate("/cart");
  }, [successCartAdd]);

  useEffect(() => {
    dispatch({ type: USER.CART_ERROR_RESET });
  }, []);

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
          <div className={styles.discount}>-10%</div>
          <Description product={product} />

          <Formik
            initialValues={initialValues(variants)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const { values, setFieldValue } = formik;
              return (
                <Form>
                  <Color
                    color={values["color"]}
                    variants={variants}
                    name={"color"}
                    setColor={(e) => {
                      setFieldValue("color", e);
                      onChange();
                    }}
                  />
                  <p className={styles.price}>
                    <b>ფასი:</b>
                    <i>15.00</i>
                    {product.price} ლ
                  </p>
                  <Quantity styles={styles} />
                  {error && <p className={styles.error}>{error}</p>}
                  {!user && (
                    <Link className={styles.error} to="/authorization">
                      Authorization is required
                    </Link>
                  )}
                  <Buttons
                    styles={styles}
                    product={product}
                    formik={formik}
                    user={user}
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
