// components
import FormikControl from "../../../../components/formik/FormikControl";

function Data({ styles, shippingFromStorage }) {
  return (
    <>
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        className={styles.input}
        placeholder="+995 XXXXXXXXX"
      />

      {shippingFromStorage?.wants_delivery === "True" && (
        <FormikControl
          control="input"
          type="tel"
          label="address"
          name="address"
          className={styles.input}
          placeholder="მისამართი"
        />
      )}
    </>
  );
}

export default Data;
