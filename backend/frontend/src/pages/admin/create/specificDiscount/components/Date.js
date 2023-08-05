// components
import FormikControl from "../../../../../components/formik/FormikControl";

function Date({ styles, t }) {
  return (
    <div className={styles.dateContainer}>
      <h3>{t("product.start date")}</h3>
      <div className={styles.date}>
        <FormikControl
          control="date"
          className={styles.datePicker}
          name="start_date"
        />
        <FormikControl
          control="input"
          type="time"
          name="start_time"
          className={styles.input}
        />
      </div>
      <h3>{t("product.end date")}</h3>
      <div className={styles.date}>
        <FormikControl
          control="date"
          className={styles.datePicker}
          name="end_date"
        />
        <FormikControl
          control="input"
          type="time"
          name="end_time"
          className={styles.input}
        />
      </div>
    </div>
  );
}

export default Date;
