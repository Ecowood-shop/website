//components
import FormikControl from "../../../components/formik/FormikControl";

function Inputs(props) {
  return (
    <>
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        className={props.styles.input}
        placeholder={props.t("resetPassword.password")}
        required
      />
      <FormikControl
        control="input"
        type="password"
        label="confirm_password"
        name="confirm_password"
        className={props.styles.input}
        placeholder={props.t("resetPassword.confirm password")}
        required
      />
    </>
  );
}

export default Inputs;
