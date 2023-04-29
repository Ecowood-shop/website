// REACT
import { Link } from "react-router-dom";

// FUNCTIONS
import useWindowDimensions from "../../functions/Window";

// OTHERS
import styles from "./checkoutSteps.module.scss";

// translate
import { useTranslation } from "react-i18next";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const { height, width } = useWindowDimensions();
  const { t } = useTranslation(["components"]);

  return (
    <nav className={styles.container}>
      <Link to="/profile" className={styles.active}>
        <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm148 0c0-6.627 5.373-12 12-12h48c11.046 0 20 8.954 20 20v228a8 8 0 008 8h76c6.627 0 12 5.373 12 12s-5.373 12-12 12H160c-6.627 0-12-5.373-12-12s5.373-12 12-12h76a8 8 0 008-8V148a8 8 0 00-8-8h-36c-6.627 0-12-5.373-12-12zm12-28c-15.464 0-28 12.536-28 28s12.536 28 28 28h28v200h-68c-15.464 0-28 12.536-28 28s12.536 28 28 28h192c15.464 0 28-12.536 28-28s-12.536-28-28-28h-68V136c0-19.882-16.118-36-36-36h-48z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1={64}
              y1={64}
              x2={448}
              y2={448}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF003D" />
              <stop offset={1} stopColor="#3D00EB" />
            </linearGradient>
          </defs>
        </svg>

        {width > 1000 &&      t("checkoutSteps.authorization")}
      </Link>
      <Link
        to="/checkout/shippingmethod"
        className={step1 ? styles.active : styles.disabled}
      >
        <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm120-28c-15.464 0-28 12.536-28 28s12.536 28 28 28h164v72H176c-24.301 0-44 19.699-44 44v96c0 24.301 19.699 44 44 44h176c15.464 0 28-12.536 28-28s-12.536-28-28-28H188v-72h148c24.301 0 44-19.699 44-44v-96c0-24.301-19.699-44-44-44H160zm-12 28c0-6.627 5.373-12 12-12h176c15.464 0 28 12.536 28 28v96c0 15.464-12.536 28-28 28H180a8 8 0 00-8 8v88a8 8 0 008 8h172c6.627 0 12 5.373 12 12s-5.373 12-12 12H176c-15.464 0-28-12.536-28-28v-96c0-15.464 12.536-28 28-28h156a8 8 0 008-8v-88a8 8 0 00-8-8H160c-6.627 0-12-5.373-12-12z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1={64}
              y1={64}
              x2={448}
              y2={448}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF003D" />
              <stop offset={1} stopColor="#3D00EB" />
            </linearGradient>
          </defs>
        </svg>
        {width > 1000 &&  t("checkoutSteps.shipping")}
      </Link>
      <Link
        to="/checkout/shippingdetails"
        className={step1 && step2 ? styles.active : styles.disabled}
      >
        {step1 && step2 ? (
          <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm120-28c-15.464 0-28 12.536-28 28s12.536 28 28 28h164v72H160c-15.464 0-28 12.536-28 28s12.536 28 28 28h164v72H160c-15.464 0-28 12.536-28 28s12.536 28 28 28h176c24.301 0 44-19.699 44-44V144c0-24.301-19.699-44-44-44H160zm-12 28c0-6.627 5.373-12 12-12h176c15.464 0 28 12.536 28 28v224c0 15.464-12.536 28-28 28H160c-6.627 0-12-5.373-12-12s5.373-12 12-12h172a8 8 0 008-8v-88a8 8 0 00-8-8H160c-6.627 0-12-5.373-12-12s5.373-12 12-12h172a8 8 0 008-8v-88a8 8 0 00-8-8H160c-6.627 0-12-5.373-12-12z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1={64}
                y1={64}
                x2={448}
                y2={448}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF003D" />
                <stop offset={1} stopColor="#3D00EB" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm120-28c-15.464 0-28 12.536-28 28s12.536 28 28 28h164v72H160c-15.464 0-28 12.536-28 28s12.536 28 28 28h164v72H160c-15.464 0-28 12.536-28 28s12.536 28 28 28h176c24.301 0 44-19.699 44-44V144c0-24.301-19.699-44-44-44H160zm-12 28c0-6.627 5.373-12 12-12h176c15.464 0 28 12.536 28 28v224c0 15.464-12.536 28-28 28H160c-6.627 0-12-5.373-12-12s5.373-12 12-12h172a8 8 0 008-8v-88a8 8 0 00-8-8H160c-6.627 0-12-5.373-12-12s5.373-12 12-12h172a8 8 0 008-8v-88a8 8 0 00-8-8H160c-6.627 0-12-5.373-12-12z"
              fill="#000"
            />
          </svg>
        )}
        {width > 1000 && t("checkoutSteps.shipping details")}
      </Link>
      <Link
        to="/checkout/paymentmethod"
        className={step1 && step2 && step3 ? styles.active : styles.disabled}
      >
        {step1 && step2 && step3 ? (
          <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm120-28c-15.464 0-28 12.536-28 28v112c0 24.301 19.699 44 44 44h148v100c0 15.464 12.536 28 28 28s28-12.536 28-28V128c0-15.464-12.536-28-28-28s-28 12.536-28 28v100H188V128c0-15.464-12.536-28-28-28zm-12 28c0-6.627 5.373-12 12-12s12 5.373 12 12v108a8 8 0 008 8h152a8 8 0 008-8V128c0-6.627 5.373-12 12-12s12 5.373 12 12v256c0 6.627-5.373 12-12 12s-12-5.373-12-12V276a8 8 0 00-8-8H176c-15.464 0-28-12.536-28-28V128z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1={64}
                y1={64}
                x2={448}
                y2={448}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF003D" />
                <stop offset={1} stopColor="#3D00EB" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg width={512} height={512} viewBox="0 0 512 512" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M128 24C70.562 24 24 70.562 24 128v256c0 57.438 46.562 104 104 104h256c57.438 0 104-46.562 104-104V128c0-57.438-46.562-104-104-104H128zM40 128c0-48.601 39.399-88 88-88h256c48.601 0 88 39.399 88 88v256c0 48.601-39.399 88-88 88H128c-48.601 0-88-39.399-88-88V128zm120-28c-15.464 0-28 12.536-28 28v112c0 24.301 19.699 44 44 44h148v100c0 15.464 12.536 28 28 28s28-12.536 28-28V128c0-15.464-12.536-28-28-28s-28 12.536-28 28v100H188V128c0-15.464-12.536-28-28-28zm-12 28c0-6.627 5.373-12 12-12s12 5.373 12 12v108a8 8 0 008 8h152a8 8 0 008-8V128c0-6.627 5.373-12 12-12s12 5.373 12 12v256c0 6.627-5.373 12-12 12s-12-5.373-12-12V276a8 8 0 00-8-8H176c-15.464 0-28-12.536-28-28V128z"
              fill="#000"
            />
          </svg>
        )}
        {width > 1000 && t("checkoutSteps.payment methods")}
      </Link>
    </nav>
  );
}

export default CheckoutSteps;
