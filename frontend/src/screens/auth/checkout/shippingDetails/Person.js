// components
import FormikControl from "../../../../formik/FormikControl";

function Person({ styles }) {
  return (
    <div key={1}>
      <FormikControl
        control="input"
        type="text"
        label="first_name"
        name="first_name"
        className={styles.input}
        placeholder="სახელი"
      />
      <FormikControl
        control="input"
        type="text"
        label="last_name"
        name="last_name"
        className={styles.input}
        placeholder="გვარი"
      />
      <FormikControl
        control="input"
        type="text"
        label="id"
        name="id"
        className={styles.input}
        placeholder="პირადი ნომერი"
      />
    </div>
  );
}

export default Person;
