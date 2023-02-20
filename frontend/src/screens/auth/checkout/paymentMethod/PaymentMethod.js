// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../../../store/actions/shippingActions";
import { createOrder } from "../../../../store/actions/orderActions";

// components
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Loader from "../../../../components/loader/Loader";
import { Formik, Form } from "formik";
import Payments from "./Payments";
// values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from "./styles.module.scss";

function PaymentMethod() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shipping = useSelector((state) => state.shipping);
  const { shipping: shippingFromStorage } = shipping;

  const Order = useSelector((state) => state.Order);
  const { error, success, loading, order } = Order;

  useEffect(() => {
    if (success) {
      dispatch({ type: "CLEAR_SHIPPING_ITEMS" });
      navigate(`/order/${order.Cart._id}`, { replace: true });
    }
  }, [success, dispatch, order.Cart._id, navigate]);

  function onSubmit(values) {
    let data = { ...values };

    // data transform
    data.first_name =
      shippingFromStorage?.first_name || shippingFromStorage?.company_name;
    data.last_name =
      shippingFromStorage?.last_name || shippingFromStorage?.company_type;
    data.personId = shippingFromStorage?.id || shippingFromStorage?.company_id;

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    dispatch(savePaymentMethod(data));
    dispatch(createOrder(data));
    console.log(data);
  }

  console.log(shippingFromStorage);
  console.log(order);
  return (
    <article className={styles.container}>
      <CheckoutSteps step1 step2 step3 />
      <section>
        <h1>გადახდის მეთოდები</h1>
        {error && <p className={styles.error}>{error}</p>}
        {loading ? (
          <Loader color="blueviolet" />
        ) : (
          <Formik
            initialValues={initialValues(shippingFromStorage)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Payments styles={styles} />
                  <button type="submit" className={styles.btn}>
                    გადახდა
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
