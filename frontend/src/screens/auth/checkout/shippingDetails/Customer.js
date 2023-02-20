// components
import FormikControl from "../../../../formik/FormikControl";

function Customer({ styles }) {
  const radioOptions = [
    {
      key: "True",
      value: "True",
      label: (
        <>
          <label htmlFor="True">ფიზიკური პირი</label>
        </>
      ),
    },
    {
      key: "False",
      value: "False",
      label: (
        <>
          <label htmlFor="False">იურიდიული პირი</label>
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
