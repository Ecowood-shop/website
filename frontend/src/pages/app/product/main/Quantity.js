// components
import FormikControl from "../../../../components/formik/FormikControl";

function Quantity(props) {
  return (
    <label className={props.styles.selectContainer}>
      <FormikControl
        control="input"
        type="number"
        label="quantity"
        name="quantity"
        className={props.styles.input}
        placeholder={props.t("product.quantity")}
        required
      />
    </label>
  );
}

export default Quantity;
