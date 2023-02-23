// components
import FormikControl from "../../../../../formik/FormikControl";

function Select({ styles, categories }) {
  const dropdownOptions = [{ key: "კატეგორია", value: ""}];
  if (categories) {
    categories.forEach((category) => {
      dropdownOptions.push({ key: category.name, value: category._id });
    });
  }

  return (
    <div className={styles.selectContainer}>
      <FormikControl
        control="select"
        name="category"
        className={styles.input}
        options={dropdownOptions}
      />
    </div>
  );
}

export default Select;
