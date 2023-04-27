//components
import FormikControl from "../../../../formik/FormikControl";

function Inputs(props) {
  return (
    <section>
      <FormikControl
        control="input"
        type="email"
        label="Email"
        name="email"
        className={props.styles.input}
        placeholder={props.t("register.email")}
        required
      />
    </section>
  );
}

export default Inputs;
