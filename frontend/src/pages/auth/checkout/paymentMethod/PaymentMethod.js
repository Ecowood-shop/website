// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../../../toolkit/shipping/shippingSlice";
import { createOrder } from "../../../../toolkit/orders/actions";
import { reset } from "../../../../toolkit/orders/orderSlice";
// components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Loader from "../../../../components/loader/Loader";
import { Formik, Form } from "formik";
import Payments from "./Payments";
// values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from "./styles.module.scss";

// translate
import { useTranslation } from "react-i18next";

function PaymentMethod() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(["auth"]);

  const { shipping } = useSelector((state) => state.shipping);

  const OrderSlice = useSelector((state) => state.orders);
  const { error, isLoading, success, order } = OrderSlice;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.Cart._id}`, { replace: true });
    }
    return () => {
      dispatch(reset());
    };
  }, [success, dispatch, order?.Cart._id, navigate]);

  function onSubmit(values) {
    let data = { ...values };

    // data transform
    data.first_name = shipping?.first_name || shipping?.company_name;
    data.last_name = shipping?.last_name || shipping?.company_type;
    data.personId = shipping?.id || shipping?.company_id;

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    dispatch(savePaymentMethod(data));
    dispatch(createOrder({ formData: data }));
  }

  return (
    <article className={styles.container}>
      <CheckoutSteps step1 step2 step3 />
      <section>
        <h1>{t("shipping details.payment methods")}</h1>
        {error && (
          <p className={styles.error}>
            {error?.data["detail"]
              ? error?.data["detail"]
              : "something want wrong :)"}
          </p>
        )}
        {isLoading ? (
          <Loader color="blueviolet" />
        ) : (
          <Formik
            initialValues={initialValues(shipping)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Payments styles={styles} />
                  <button type="submit" className={styles.btn}>
                    {t("global.pay")}
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </section>
    </article>
  );
}

export default PaymentMethod;
