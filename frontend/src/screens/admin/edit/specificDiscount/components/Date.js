// components
import FormikControl from "../../../../../formik/FormikControl";

function Date({ styles }) {
  return (
    <div className={styles.dateContainer}>
      <h3>Start Date</h3>
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
      <h3>End Date</h3>
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
