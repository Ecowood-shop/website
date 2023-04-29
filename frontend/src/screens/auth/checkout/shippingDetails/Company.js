// components
import FormikControl from "../../../../formik/FormikControl";

function Company({ styles, t }) {
  return (
    <div key={2}>
      <FormikControl
        control="input"
        type="text"
        label="company_name"
        name="company_name"
        className={styles.input}
        placeholder={t("shipping details.company name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="company_type"
        name="company_type"
        className={styles.input}
        placeholder={t("shipping details.form of organization LLC/JSC/IE")}
      />
      <FormikControl
        control="input"
        type="text"
        label="company_id"
        name="company_id"
        className={styles.input}
        placeholder={t("shipping details.identification code")}
      />
    </div>
  );
}

export default Company;
