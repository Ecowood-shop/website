// formik
import FormikControl from "../../../../../formik/FormikControl";

function Discount({ styles, formik, t }) {
  const radioOptions = [
    { key: t("product.pick a discount"), value: "" },
    {
      key: t("product.no discount"),
      value: "0",
    },
    {
      key: t("product.discount"),
      value: "1",
    },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.inputGroup}>
        {/* select discount */}
        <div>
          <div className={styles.selectContainer}>
            <label htmlFor="discount">{t("product.discount")}</label>
            <FormikControl
              control="select"
              name="discountType"
              options={radioOptions}
              className={styles.input}
            />
          </div>
        </div>
        {/* start date */}
        {String(formik.values.discountType) === "1" && (
          <div className={styles.dateContainer}>
            <label htmlFor="start_date">{t("product.start date")}</label>
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
          </div>
        )}
      </div>

      {/* create a Discount */}
      {String(formik.values.discountType) === "1" && (
        <>
          <div className={styles.inputGroup}>
            {/* discount percent */}
            <div>
              {" "}
              <label htmlFor="discountPercent">
                {t("product.discount percent")}
              </label>
              <FormikControl
                control="input"
                type="number"
                name="discountPercent"
                className={styles.input}
                placeholder="enter percent..."
              />
            </div>
            {/* end date */}
            <div className={styles.dateContainer}>
              <label htmlFor="end_Date">{t("product.end date")}</label>
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
          </div>
        </>
      )}
    </div>
  );
}

export default Discount;
