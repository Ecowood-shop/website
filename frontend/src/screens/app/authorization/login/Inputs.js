
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
      placeholder="მეილი"
      required
    />
    <FormikControl
      control="input"
      type="password"
      label="password"
      name="password"
      placeholder="პაროლი"
      className={props.styles.input}
      required
    />
  </section>
  )
}

export default Inputs
