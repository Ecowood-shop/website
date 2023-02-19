// components
import FormikControl from "../../../../formik/FormikControl";

function Quantity(props) {
  return (
    <label className={props.styles.selectContainer}>
      <FormikControl
        control="input"
        type="number"
        label="quantity"
        name="quantity"
        className={props.styles.input}
        placeholder="quantity"
        required
      />
    </label>
  );
}

export default Quantity;
