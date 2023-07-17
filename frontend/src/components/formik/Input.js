// Formik
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
// styles
import styles from "./styles/styles.module.scss";

function Input(props) {
  const { labeled, label, name, ...rest } = props;
  return (
    <div className={styles.Input}>
      {labeled && <label htmlFor={name}>{label}</label>}
      <Field
        id={name}
        name={name}
        {...rest}
        autoComplete="new-password"
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
