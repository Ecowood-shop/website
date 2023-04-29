// components
import FormikControl from "../../../../formik/FormikControl";

function Customer({ styles, t }) {
  const radioOptions = [
    {
      key: "True",
      value: "True",
      label: (
        <>
          <label htmlFor="True">{t("shipping details.individual")}</label>
        </>
      ),
    },
    {
      key: "False",
      value: "False",
      label: (
        <>
          <label htmlFor="False">{t("shipping details.legal entity")}</label>
        </>
      ),
    },
  ];

  return (
    <div className={styles.radioContainer}>
      <FormikControl
        control="radio"
        name="physicPerson"
        options={radioOptions}
      />
    </div>
  );
}

export default Customer;
