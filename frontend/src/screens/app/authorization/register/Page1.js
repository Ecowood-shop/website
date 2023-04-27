//components
import FormikControl from "../../../../formik/FormikControl";

function Page1(props) {
  return (
    <>
      <FormikControl
      control="input"
      type="tel"
      label="phone"
      name="phone"
      className={props.styles.input + " w3-animate-right"}
      placeholder={props.t("register.phone")}
      required
    />
     <FormikControl
      control="input"
      type="password"
      label="password"
      name="password"
      className={props.styles.input + " w3-animate-right"}
      placeholder={props.t("register.password")}
      required
    />
     <FormikControl
      control="input"
      type="password"
      label="confirmPassword"
      name="confirmPassword"
      className={props.styles.input + " w3-animate-right"}
      placeholder={props.t("register.confirm password")}
      required
    />
    </>
  );
}

export default Page1;
