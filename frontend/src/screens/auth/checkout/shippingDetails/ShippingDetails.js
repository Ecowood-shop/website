// REACT
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingDetails } from "../../../../store/actions/shippingActions";

// COMPONENTS
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
// OTHERS
import styles from "./styles.module.scss";

function ShippingDetails() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm();
  const shipping = useSelector((state) => state.shipping);
  const { shipping: shippingFromStorage } = shipping;

  const watchCustomer = watch(
    "customer",
    shippingFromStorage?.customer == "company" ? "company" : ""
  );

  useEffect(() => {
    if (!shippingFromStorage.delivery) {
      navigate("/checkout/shippingmethod");
    }
  }, [shippingFromStorage?.delivery]);

  function onSubmitButton(data) {
        for (const property in shippingFromStorage) {
          if (!data[property]) {
            data[property] = shippingFromStorage[property];
          }
        }
    console.log(data)
    if (data.customer !== "individual") {
      data.first_name = "";
      data.last_name = "";
      data.id = "";
    } else {
      data.company_name = "";
      data.company_type = "";
      data.company_id = "";
    }

    dispatch(saveShippingDetails(data));
    navigate("/checkout/paymentmethod");
  }

  console.log(shippingFromStorage);
  return (
    <article className={styles.container}>
      <CheckoutSteps step1 step2 />
      <section>
        <h1>მიწოდების დეტალები</h1>
        <form onSubmit={handleSubmit(onSubmitButton)}>
          <div className={styles.radioContainer}>
            <input
              {...register("customer", { required: true })}
              type="radio"
              name="customer"
              value="individual"
              id="individual"
              defaultChecked={
                shippingFromStorage?.customer == "individual" ? true : false
              }
            />
            <label htmlFor="individual">ფიზიკური პირი</label>
            <input
              {...register("customer", { required: true })}
              type="radio"
              name="customer"
              value="company"
              id="company"
              defaultChecked={
                shippingFromStorage?.customer == "company" ? true : false
              }
            />
            <label htmlFor="company">იურიდიული პირი</label>{" "}
          </div>
          <div className={styles.inputContainer}>
            {watchCustomer !== "company" ? (
              <div key={1}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="სახელი"
                  defaultValue={shippingFromStorage?.first_name}
                  {...register("first_name", { required: true })}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="გვარი"
                  defaultValue={shippingFromStorage?.last_name}
                  {...register("last_name", { required: true })}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="პირადი ნომერი"
                  defaultValue={shippingFromStorage?.last_name}
                  {...register("id", { required: true })}
                />
              </div>
            ) : (
              <div key={2}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="ორგანიზაციის დასახელება"
                  defaultValue={shippingFromStorage?.company_name}
                  {...register("company_name", { required: true })}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="ორგანიზაციის ფორმა შპს/სს/ინდ.მეწარმე"
                  defaultValue={shippingFromStorage?.company_type}
                  {...register("company_type", { required: true })}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="საიდენტიფიკაციო კოდი"
                  defaultValue={shippingFromStorage?.company_id}
                  {...register("company_id", { required: true })}
                />
              </div>
            )}

            <input
              type="tel"
              className={styles.input}
              placeholder="+995 XXXXXXXXX"
              defaultValue={shippingFromStorage?.phone}
              {...register("phone", { required: true })}
            />
            {shippingFromStorage?.delivery == "delivery" && (
              <input
                type="text"
                className={styles.input}
                placeholder="მისამართი"
                defaultValue={shippingFromStorage?.address}
                {...register("address", { required: true })}
              />
            )}

            <button type="submit" className={styles.btn}>
              გადახდის მეთოდები
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}

export default ShippingDetails;
