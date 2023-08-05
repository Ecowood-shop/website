//components
import FormikControl from "../../../../components/formik/FormikControl";

function Page2(props) {
  return (
    <>
      <FormikControl
        control="input"
        type="text"
        label="first_name"
        name="first_name"
        className={props.styles.input + " w3-animate-left"}
        placeholder={props.t("register.first name")}
        required
      />
      <FormikControl
        control="input"
        type="text"
        label="last_name"
        name="last_name"
        className={props.styles.input + " w3-animate-left"}
        placeholder={props.t("register.last name")}
        required
      />
      <FormikControl
        control="input"
        type="email"
        label="email"
        name="email"
        className={props.styles.input + " w3-animate-left"}
        placeholder={props.t("register.email")}
        required
      />
    </>
  );
}

export default Page2;
