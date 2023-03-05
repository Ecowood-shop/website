// formik
import FormikControl from "../../../../formik/FormikControl";
import Date from "./Date";

function Inputs({ styles, formik, users, products }) {
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
          control="autocomplete"
          name="userId"
          options={users}
          formik={formik}
          placeholder={"user"}
          className={styles.input}
        />
      </div>
      <div className={styles.selectContainer}>
        <FormikControl
          control="autocomplete"
          name="productId"
          options={products}
          formik={formik}
          placeholder={"product"}
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
