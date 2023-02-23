// formik
import FormikControl from "../../../../../formik/FormikControl";
import Date from "./Date";

function Discount({ styles, discounts, formik }) {
  const radioOptions = [
    { key: "Pick a discount", value: "" },
    {
      key: "No discount",
      value: "0",
    },
    {
      key: "List discounts",
      value: "1",
    },
    {
      key: "Create discount",
      value: "2",
    },
  ];

  const dropdownOptions = [{ key: "Choose a discount", value: "" }];
  if (discounts) {
    discounts.forEach((discount) => {
      dropdownOptions.push({ key: discount.name, value: discount._id });
    });
  }

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

      {/* list Discounts */}
      {String(formik.values.discountType) === "1" && (
        <div className={styles.selectContainer}>
          <FormikControl
            control="select"
            name="discountId"
            className={styles.input}
            options={dropdownOptions}
          />
        </div>
      )}

      {/* create a Discount */}
      {String(formik.values.discountType) === "2" && (
        <FormikControl
          control="input"
          type="number"
          step={0.01}
          name="discountPercent"
          className={styles.input}
          placeholder="discount percent"
        />
      )}

      {/* list or create a Discount */}
      {(String(formik.values.discountType) === "1" ||
        String(formik.values.discountType) === "2") && <Date styles={styles} />}
    </>
  );
}

export default Discount;
