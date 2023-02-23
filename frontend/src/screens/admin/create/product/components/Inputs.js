// components
import FormikControl from "../../../../../formik/FormikControl";

function Inputs({ styles }) {
  return (
    <>
      <FormikControl
        control="input"
        type="text"
        label="name_geo"
        name="name_geo"
        className={styles.input}
        placeholder="სახელი"
      />
      <FormikControl
        control="input"
        type="text"
        label="brand"
        name="brand"
        className={styles.input}
        placeholder="ბრენდი"
      />
      <FormikControl
        control="input"
        type="text"
        label="size"
        name="size"
        className={styles.input}
        placeholder="მოცულობა"
      />
      <FormikControl
        control="input"
        type="url"
        label="youtubeUrl"
        name="youtubeUrl"
        className={styles.input}
        placeholder="იუთუბი"
      />
      <FormikControl
        control="input"
        type="number"
        label="price"
        name="price"
        className={styles.input}
        step={0.01}
        placeholder="ფასი"
      />
      <FormikControl
        control="input"
        type="number"
        label="coverageLength"
        name="coverageLength"
        className={styles.input}
        placeholder="დაფარვა"
      />
    </>
  );
}

export default Inputs;
