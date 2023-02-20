// components
import FormikControl from "../../../../formik/FormikControl";

function Company({ styles }) {
  return (
    <div key={2}>
      <FormikControl
        control="input"
        type="text"
        label="company_name"
        name="company_name"
        className={styles.input}
        placeholder="ორგანიზაციის დასახელება"
      />
      <FormikControl
        control="input"
        type="text"
        label="company_type"
        name="company_type"
        className={styles.input}
        placeholder="ორგანიზაციის ფორმა შპს/სს/ინდ.მეწარმე"
      />
      <FormikControl
        control="input"
        type="text"
        label="company_id"
        name="company_id"
        className={styles.input}
        placeholder="საიდენტიფიკაციო კოდი"
      />
    </div>
  );
}

export default Company;
