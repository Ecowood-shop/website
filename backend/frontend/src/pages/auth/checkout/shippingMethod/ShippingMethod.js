// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingMethod } from "../../../../toolkit/shipping/shippingSlice";
import { getShippingPrices } from "../../../../toolkit/shipping/actions";
// components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Details from "./Details";
import { Formik, Form } from "formik";
import Delivery from "./Delivery";
import Office from "./Office";
import RadioContainer from "./RadioContainer";

// values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";

function ShippingMethod() {
  const { shipping } = useSelector((state) => state.shipping);
  const { shippingPrices } = useSelector((state) => state.shippingPrices);

  const { t, i18n } = useTranslation(["auth"]);

  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(values) {
    let data = { ...values };
    String(values.wants_delivery) === "True"
      ? (data._id = "")
      : (data.cityId = "");

    dispatch(saveShippingMethod(data));
    navigate("/checkout/shippingdetails", { replace: true });
  }

  useEffect(() => {
    dispatch(getShippingPrices({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  return (
    <article className={styles.container}>
      <CheckoutSteps step1 />
      <section>
        <Details styles={styles} t={t} />

        <Formik
          initialValues={initialValues(shipping)}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <RadioContainer styles={styles} t={t} />

                {formik.values.wants_delivery === "False" && (
                  <Office styles={styles} t={t} />
                )}

                {formik.values.wants_delivery === "True" && (
                  <Delivery styles={styles} prices={shippingPrices} t={t} />
                )}

                <button type="submit" className={styles.btn}>
                  {t("shipping details.shipping details")}
                </button>
              </Form>
            );
          }}
        </Formik>
      </section>
    </article>
  );
}

export default ShippingMethod;