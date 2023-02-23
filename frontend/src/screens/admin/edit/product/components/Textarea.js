// components
import FormikControl from "../../../../../formik/FormikControl";

function Textarea({ styles }) {
  return (
    <div className={styles.textContainer}>
      <FormikControl
        control="textarea"
        name="technicalRequirements"
        className={styles.textarea}
        placeholder="ტექნიკური მონაცემები"
      />
      <FormikControl
        control="textarea"
        name="instructionForUse"
        className={styles.textarea}
        placeholder="გამოყენების წესები"
      />
      <FormikControl
        control="textarea"
        name="safetyStandard"
        className={styles.textarea}
        placeholder="უსაფრთხოების სტანდარტი"
      />
    </div>
  );
}

export default Textarea;
