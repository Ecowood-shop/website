
//components
import FormikControl from "../../../formik/FormikControl";

function Inputs(props) {
  return (
    <>
    <FormikControl
      control="input"
      type="password"
      label="password"
      name="password"
      className={props.styles.input}
      placeholder="პაროლი"
      required
    />
      <FormikControl
      control="input"
      type="password"
      label="confirmPassword"
      name="confirmPassword"
      className={props.styles.input}
      placeholder="გაიმეორეთ პაროლი"
      required
    />
  </>
  )
}

export default Inputs
