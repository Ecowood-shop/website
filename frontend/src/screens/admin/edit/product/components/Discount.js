// formik
import FormikControl from "../../../../../formik/FormikControl";
import Date from "./Date";

function Discount({ styles, formik }) {
  const radioOptions = [
    { key: "Pick a discount", value: "" },
    {
      key: "No discount",
      value: "0",
    },
    {
      key: "Discount",
      value: "1",
    },
  ];


  return (
    <>
      <div className={styles.selectContainer}>
        <FormikControl
          control="select"
          name="discountType"
          options={radioOptions}
          className={styles.input}
        />
      </div>

      {/* create a Discount */}
      {String(formik.values.discountType) === "1" && (
        <>
          <FormikControl
            control="input"
            type="number"
            step={0.01}
            name="discountPercent"
            className={styles.input}
            placeholder="discount percent"
          />
          <Date styles={styles} />
        </>
      )}
    </>
  );
}

export default Discount;
