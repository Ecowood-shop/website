// formik
import FormikControl from "../../../../../components/formik/FormikControl";
import Date from "./Date";

function Inputs({ styles, formik, users, products, t }) {
  let customUsers =
    users?.length > 0
      ? users.map((user) => ({
          value: user.id,
          label:
            user.first_name +
            " " +
            user.last_name +
            ", " +
            user.email +
            ", ID : " +
            user.id,
        }))
      : {};
  let customProducts =
    products?.length > 0
      ? products.map((product) => ({
          value: product._id,
          label: product.name_geo + ", ID : " + product._id,
        }))
      : {};
  return (
    <>
      <div className={styles.selectContainer}>
        <FormikControl
          control="autocomplete"
          name="userId"
          options={customUsers}
          formik={formik}
          className={styles.inputCategory}
        />
      </div>
      <div className={styles.selectContainer}>
        <FormikControl
          control="autocomplete"
          name="productId"
          options={customProducts}
          formik={formik}
          className={styles.inputCategory}
        />
      </div>
      <FormikControl
        control="input"
        type="number"
        step={0.01}
        name="discountPercent"
        placeholder="enter percent..."
        className={styles.input}
      />{" "}
      <Date styles={styles} t={t} />
    </>
  );
}

export default Inputs;
