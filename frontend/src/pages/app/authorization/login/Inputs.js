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
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        placeholder={props.t("register.password")}
        className={props.styles.input}
        required
      />
    </section>
  );
}

export default Inputs;
