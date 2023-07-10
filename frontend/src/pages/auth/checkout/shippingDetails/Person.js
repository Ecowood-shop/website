// components
import FormikControl from "../../../../formik/FormikControl";

function Person({ styles, t }) {
  return (
    <div key={1}>
      <FormikControl
        control="input"
        type="text"
        label="first_name"
        name="first_name"
        className={styles.input}
        placeholder={t("shipping details.first name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="last_name"
        name="last_name"
        className={styles.input}
        placeholder={t("shipping details.last name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="id"
        name="id"
        className={styles.input}
        placeholder={t("shipping details.personal No")}
      />
    </div>
  );
}

export default Person;
