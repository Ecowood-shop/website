// REACT
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingDetails } from "../../../../store/actions/shippingActions";

// components
import { Formik, Form } from "formik";
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
import Customer from "./Customer";
import Person from "./Person";
import Company from "./Company";
import Data from "./Data";
//values
import { initialValues, validationSchema } from "./Values";
// styles
import styles from "./styles.module.scss";

function ShippingDetails() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shipping = useSelector((state) => state.shipping);
  const { shipping: shippingFromStorage } = shipping;

  function onSubmit(values) {
    let data = { ...values };
    if (data.physicPerson !== "True") {
      data.first_name = "";
      data.last_name = "";
      data.id = "";
    } else {
      data.company_name = "";
      data.company_type = "";
      data.company_id = "";
    }
    data.address = String(values.wants_delivery) === "True" ? data.address : "";
    dispatch(saveShippingDetails(data));
    navigate("/checkout/paymentmethod");
    console.log(data);
  }
  return (
    <article className={styles.container}>
      <CheckoutSteps step1 step2 />
      <section>
        <h1>მიწოდების დეტალები</h1>
        <Formik
          initialValues={initialValues(shippingFromStorage)}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Customer styles={styles} />
                <div className={styles.inputContainer}>
                  {formik.values.physicPerson !== "False" ? (
                    <Person styles={styles} />
                  ) : (
                    <Company styles={styles} />
                  )}

                  <Data
                    styles={styles}
                    shippingFromStorage={shippingFromStorage}
                  />

                  <button type="submit" className={styles.btn}>
                    გადახდის მეთოდები
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </article>
  );
}

export default ShippingDetails;
