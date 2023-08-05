// components
import FormikControl from "../../../../../components/formik/FormikControl";

function Select({ styles, categories, t }) {
  const dropdownOptions = [{ key: t("global.category"), value: "" }];
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
