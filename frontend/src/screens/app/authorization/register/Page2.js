//components
import FormikControl from "../../../../formik/FormikControl";

function Page2(props) {
  return (
    <>
      <FormikControl
        control="input"
        type="text"
        label="firstName"
        name="firstName"
        className={props.styles.input + " w3-animate-left"}
        placeholder="სახელი"
        required
      />
      <FormikControl
        control="input"
        type="text"
        label="lastName"
        name="lastName"
        className={props.styles.input + " w3-animate-left"}
        placeholder="გვარი"
        required
      />
      <FormikControl
        control="input"
        type="email"
        label="email"
        name="email"
        className={props.styles.input + " w3-animate-left"}
        placeholder="მეილი"
        required
      />
    </>
  );
}

export default Page2;
