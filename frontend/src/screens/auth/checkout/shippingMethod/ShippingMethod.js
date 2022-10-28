// REACT
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingDetails } from "../../../../store/actions/systemActions";

// COMPONENTS
import CheckoutSteps from "../../../../components/checkoutSteps/CheckoutSteps";
// OTHERS
import styles from "./styles.module.scss";

function ShippingMethod() {
  const { register, handleSubmit, watch } = useForm();

  const shipping = useSelector((state) => state.shipping);
  const { shipping: shippingFromStorage } = shipping;

  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchDelivery = watch(
    "delivery",
    shippingFromStorage?.delivery == "office" ? "office" : ""
  );

  function onSubmitButton(data) {
    if (data.delivery == "delivery" && data.office) {
      data.office = "";
    }
    console.log(data);
    dispatch(saveShippingDetails(data));
    navigate("/checkout/shippingdetails");
  }
  console.log(shippingFromStorage);

  return (
    <article className={styles.container}>
      <CheckoutSteps step1/>
      <section>
        <div className={styles.text}>
          <h1>მიწოდების მეთოდები</h1>

          <hr />
          <p>* მიწოდება მხოლოდ თბილისის მასშტაბით</p>
          <p>* თბილისის მასშტაბით მიწოდება მოხდება 2-4 სამუშაო დღეში</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitButton)}>
          <div className={styles.radioContainer}>
            <input
              {...register("delivery", { required: true })}
              type="radio"
              name="delivery"
              value="delivery"
              id="delivery"
              defaultChecked={
                shippingFromStorage?.delivery == "delivery" ? true : false
              }
            />
            <label htmlFor="delivery">
              <svg
                id="Icons"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <style>
                  {
                    ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
                  }
                </style>
                <path className="st0" d="M2 9L19 9 19 24 10 24" />
                <circle className="st0" cx={24} cy={24} r={2} />
                <circle className="st0" cx={8} cy={24} r={2} />
                <path
                  className="st0"
                  d="M19 24L19 13 25 13 29 18 29 24 26 24"
                />
                <path className="st0" d="M4 13L13 13" />
                <path className="st0" d="M2 17L11 17" />
                <path fill="none" d="M-288 -432H248V248H-288z" />
              </svg>
              ადგილზე მიტანა
            </label>
            <input
              {...register("delivery", { required: true })}
              type="radio"
              name="delivery"
              value="office"
              id="office"
              defaultChecked={
                shippingFromStorage?.delivery == "office" ? true : false
              }
            />
            <label htmlFor="office">
              <svg viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M21 19h2v2H1v-2h2V4a1 1 0 011-1h10a1 1 0 011 1v15h2V9h3a1 1 0 011 1v9zM7 11v2h4v-2H7zm0-4v2h4V7H7z" />
              </svg>
              ოფისიდან გატანა
            </label>
          </div>
          {watchDelivery == "office" && (
            <div className={styles.officeContainer}>
              <div className={styles.text}>
                <h2>აირჩიეთ ფილიალი</h2>
                <hr />
                <p>* სამუშაო საათები - ეკოვუდი 10:00-18:00 (ყოველდღე)</p>
                <p>
                  * სამუშაო საათები - ექსრპესს ფილიალი 10:00-18:00 (ყოველდღე)
                </p>
              </div>

              <div className={styles.radioContainer}>
                {" "}
                <input
                  {...register("office", { required: true })}
                  type="radio"
                  name="office"
                  value="ecowood"
                  id="ecowood"
                  defaultChecked={
                    shippingFromStorage?.office == "ecowood" ? true : false
                  }
                />
                <label htmlFor="ecowood">
                  <svg viewBox="0 0 64 64">
                    <g data-name="HOUSE">
                      <path d="M25.21 17v14H48L28.09 7.49 20.27 16h4a1 1 0 01.94 1z" />
                      <path d="M12.61 24H19.4V42H12.61z" />
                      <path d="M59.75 51v-1.19a3.6 3.6 0 002.86-3.52c0-.1-.84-10-3.61-10s-3.61 9.94-3.61 10a3.6 3.6 0 002.86 3.52V51h-9.77V33H34.91v18H33V33h-7.79v18h-1.94V18H5.82v33H0v2h64v-2zm-38.42 0h-1.94v-7h-6.78v7h-1.94V23a1 1 0 011-1h8.72a1 1 0 011 1z" />
                    </g>
                  </svg>
                  ეკოვუდი
                </label>
                <input
                  {...register("office", { required: true })}
                  type="radio"
                  name="office"
                  value="express"
                  id="express"
                  defaultChecked={
                    shippingFromStorage?.office == "express" ? true : false
                  }
                />
                <label htmlFor="express">
                  <svg
                    width={64}
                    height={64}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.94 10h-6.45a2 2 0 00-2 2v7.35a2 2 0 002 2h6.45a2 2 0 002-2V12a2 2 0 00-2-2zM24.94 26.32h-6.45a2 2 0 00-2 2v7.35a2 2 0 002 2h6.45a2 2 0 002-2v-7.35a2 2 0 00-2-2zM24.94 42.65h-6.45a2 2 0 00-2 2V52a2 2 0 002 2h6.45a2 2 0 002-2v-7.35a2 2 0 00-2-2z"
                      fill="#000"
                    />
                    <path
                      d="M60 58h-4.94V26.1a2 2 0 00-2-2H48V4a2 2 0 00-2-2H10.94a2 2 0 00-2 2v54H4a2 2 0 100 4h56a2 2 0 000-4zM30.4 26.1V58H12.94V6H44v18.1H32.4a2 2 0 00-2 2z"
                      fill="#000"
                    />
                  </svg>
                  ექსრპესს ფილიალი
                </label>
              </div>
            </div>
          )}
          <button type="submit" className={styles.btn}>
            მიწოდების დეტალები
          </button>
        </form>
      </section>
    </article>
  );
}

export default ShippingMethod;
