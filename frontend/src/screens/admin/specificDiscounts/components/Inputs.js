// formik
import FormikControl from "../../../../formik/FormikControl";
import Date from "./Date";

function Inputs({ styles, formik }) {
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
      <h3>DISCOUNT</h3>
      <div className={styles.selectContainer}>
        <FormikControl
          control="select"
          name="userId"
          options={radioOptions}
          className={styles.input}
        />
      </div>
      <div className={styles.selectContainer}>
        <FormikControl
          control="select"
          name="productId"
          options={radioOptions}
          className={styles.input}
        />
      </div>
      <div className={styles.selectContainer}>
        <FormikControl
          control="input"
          type="number"
          step={0.01}
          name="discountPercent"
          placeholder="discount percent"
          className={styles.input}
        />{" "}
      </div>
      <Date styles={styles} />
    </>
  );
}

export default Inputs;
