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
      placeholder="ტელეფონი"
      required
    />
     <FormikControl
      control="input"
      type="password"
      label="password"
      name="password"
      className={props.styles.input + " w3-animate-right"}
      placeholder="პაროლი"
      required
    />
     <FormikControl
      control="input"
      type="password"
      label="confirmPassword"
      name="confirmPassword"
      className={props.styles.input + " w3-animate-right"}
      placeholder="გაიმეორეთ პაროლი"
      required
    />
    </>
  );
}

export default Page1;
